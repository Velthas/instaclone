import { db } from "./firebase-config";
import * as fs from "firebase/firestore";
import { getCurrentUserUsername } from "./authentication";
import {
  Chatroom,
  ChatMessage,
  Notifications,
  Post,
  ProfilePayload,
  Comments,
  InstaUser,
  PostInfo,
} from "../utils/types";

// Used to create a document for new user in database
const createUserBucket = (name: string, username: string) => {
  const defaultPfp =
    "https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpfp.jpg?alt=media&token=4a70d3ec-47bf-4971-a99b-c3d50cedd702";

  const userData = {
    name: name,
    username: username,
    description: `Hello, my name is ${name}`,
    pfp: defaultPfp,
    follows: [
      "thegonkbrigade",
      "panampalmer",
      "thealvarez",
      "riverpd",
      "arasakaoverall",
    ],
    followed: [],
  };

  const docRef = fs.doc(db, "Users", username);
  fs.setDoc(docRef, userData);

  userData.follows.forEach((person) => {
    // Adds new account to the follower list of default accounts
    const personFollowed = fs.doc(db, "Users", person);
    fs.updateDoc(personFollowed, {
      followed: fs.arrayUnion(userData.username),
    });
  });
};

// Used in signup to avoid same-username clones
const doesUserExist = async (username: string) => {
  const userDocument = await fs.getDoc(fs.doc(db, "Users", username));
  if (userDocument.exists()) return true;
  return false;
};

// Gets pfp/bio/follows/followed info of an user
const getUserInfo = async (username: string) => {
  const docRef = fs.doc(db, "Users", username);
  const userDoc = await fs.getDoc(docRef);
  const data = userDoc.data() as InstaUser;
  return data;
};

// Given their username, gets all the posts from an user
const getPosts = async (username: string) => {
  const colRef = fs.collection(db, "Users", username, "Posts");
  const q = fs.query(colRef, fs.orderBy("timestamp", "desc"));
  const posts = await fs.getDocs(q);
  if (posts.empty) return [];
  else return posts.docs.map((doc) => doc.data()) as Post[];
};

// Used to update the profile info on an user
const updateProfile = async (username: string, payload: ProfilePayload) => {
  const docRef = fs.doc(db, "Users", username);
  await fs.updateDoc(docRef, payload);
};

// Getting a post doc reference early gives access to the id
// meaning it can be stored in the payload, as it's useful info.
const getPostDocReference = async (username: string) => {
  const docRef = fs.doc(fs.collection(db, "Users", username, "Posts"));
  return docRef;
};

// Needs this to insert comment id on database payload.
const getCommentDocReference = async (post: Post | PostInfo) => {
  const docRef = fs.doc(
    fs.collection(db, "Users", post.username, "Posts", post.id, "Comments")
  );
  return docRef;
};

// Adds post to the database
const createPost = async (ref: fs.DocumentReference, payload: Post) => {
  await fs.setDoc(ref, payload);
};

// Fetches info about a post in database
const getPostInfo = async (username: string, postId: string) => {
  const docRef = fs.doc(db, "Users", username, "Posts", postId);
  const document = await fs.getDoc(docRef);
  return document.data() as Post;
};

// Returns an array with all the comments of a given post sorted by timestamp
const getComments = async (username: string, postId: string) => {
  const colRef = fs.collection(
    db,
    "Users",
    username,
    "Posts",
    postId,
    "Comments"
  );
  const comments = await fs.getDocs(colRef);
  if (comments.empty) return [];
  else {
    return comments.docs
      .map((comment) => comment.data())
      .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds) as Comments[];
  }
};

// Used to update comment/post likes
const updateLikes = async (path: string, username: string, liked: boolean) => {
  const docRef = fs.doc(db, path);
  if (liked) fs.updateDoc(docRef, { likedby: fs.arrayUnion(username) });
  else fs.updateDoc(docRef, { likedby: fs.arrayRemove(username) });
};

const addComment = async (ref: fs.DocumentReference, comment: Comments) => {
  fs.setDoc(ref, comment);
};

const deletePost = async (post: Post) => {
  const docRef = fs.doc(db, "Users", post.username, "Posts", post.id);
  await fs.deleteDoc(docRef);
};

// Follow and unfollow requires two writes, to both user profiles
const updateFollow = async (followee: string, followed: boolean) => {
  // Potentially null but auth listener redirects to auth when variable is null, so ok
  const follower = getCurrentUserUsername() as string;
  const followerRef = fs.doc(db, "Users", follower);
  const followeeRef = fs.doc(db, "Users", followee);
  if (followed) {
    fs.updateDoc(followerRef, { follows: fs.arrayUnion(followee) });
    fs.updateDoc(followeeRef, { followed: fs.arrayUnion(follower) });
  } else {
    // Both follower and followee profiles have to be updated
    fs.updateDoc(followerRef, { follows: fs.arrayRemove(followee) });
    fs.updateDoc(followeeRef, { followed: fs.arrayRemove(follower) });
  }
};

// Used when user writes something in the search bar
// Matches what's typed in the input with usernames
// Only works if prefix is exactly right
const searchForProfiles = async (userQuery: string) => {
  const usersRef = fs.collection(db, "Users");
  const q = fs.query(
    usersRef,
    fs.where("username", ">=", userQuery),
    fs.where("username", "<=", userQuery + "\uf8ff")
  );
  const results = await fs.getDocs(q);
  if (results.empty) return [];
  return results.docs.map((doc) => doc.data()) as InstaUser[];
};

// Look at each person followed by user and draw 4 most recent posts.
// Works for now, but needs adjustment in the future.
const getHomepageContent = async (username: string) => {
  const userInfo = await getUserInfo(username);
  if (!userInfo) return;
  const followed = [...userInfo.follows, username]; // This is an array of usernames.
  let posts: Post[] = [];
  for (let i = 0; i < followed.length; i++) {
    const postsRef = fs.collection(db, "Users", followed[i], "Posts");
    const q = fs.query(postsRef, fs.orderBy("timestamp", "desc"), fs.limit(4));
    const documents = await fs.getDocs(q);
    const info = documents.docs.map((doc) => doc.data()) as Post[];
    if (info) posts = posts.concat(info);
  }
  return posts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // Most recent at the top
};

const addNotification = (receiver: string, payload: Notifications) => {
  const docRef = fs.doc(fs.collection(db, "Users", receiver, "Notifications"));
  payload.id = docRef.id; // Store reference to own doc id inside
  fs.setDoc(docRef, payload); // Append it to the user's notification subcollection
};

// Listens for recent notifications and filters them by timestamp
// Querylimits limits the amount, for now hard set at 80
const setupNotifListener = (
  username: string,
  setNotif: (notif: Notifications[]) => void,
  queryLimit: number
) => {
  const q = fs.query(
    fs.collection(db, "Users", username, "Notifications"),
    fs.orderBy("timestamp", "desc"),
    fs.limit(queryLimit)
  );
  const unsubscribe = fs.onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data()) as Notifications[];
    setNotif(data);
  });
  return unsubscribe; // Listener unsub function
};

// Sets all notifications currently unseen as seen.
// Worth noting that batches have a 500 operations limit
// will require an alternative to run in the long run.
const setNotificationsSeen = async (username: string) => {
  const batch = fs.writeBatch(db); // We use batch here because they're faster than singular updates
  const q = fs.query(
    fs.collection(db, "Users", username, "Notifications"),
    fs.where("seen", "==", false)
  );
  const result = await fs.getDocs(q);
  result.docs.forEach((document) => {
    const docRef = fs.doc(db, "Users", username, "Notifications", document.id);
    batch.update(docRef, { seen: true });
  });
  batch.commit();
};

// General listener monitoring all of user's chats
const setupAllChatsListener = (
  username: string,
  setRooms: (rooms: Chatroom[]) => void
) => {
  const q = fs.query(fs.collection(db, "Users", username, "Dm")); // Get all rooms
  const unsubscribe = fs.onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data()) as Chatroom[];
    setRooms(data); // On new change, update rooms.
  });
  return unsubscribe; // Function to unsubscribe to listener
};

// Listens to a specific chat's messages when it's open.
const setupMessagesListener = (
  id: string,
  setMessages: (messages: ChatMessage[]) => void
) => {
  const q = fs.query(
    fs.collection(db, "Chats", id, "Messages"),
    fs.orderBy("timestamp", "asc") // Order by timestamp
  );
  const unsubscribe = fs.onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data()) as ChatMessage[];
    setMessages(data); // Updates messages of room component
  });
  return unsubscribe; // Call this later to kill the listener
};

// Used when user tries to open chat from profile
// checks if chat already exists and returns a bool.
const doesChatExist = async (currentUser: string, receiver: string) => {
  const chatRef = fs.doc(db, "Users", currentUser, "Dm", receiver);
  const chatDoc = await fs.getDoc(chatRef);
  if (chatDoc.exists()) return chatDoc.data();
  return false;
};

// Will use this function to create chat bucket & info on both profiles
const createChatRoom = async (author: string, receiver: string) => {
  const newChat = fs.doc(fs.collection(db, "Chats")); // Create doc to extract id from
  await fs.setDoc(newChat, { exists: true }); // Exists prop prevents autodeletion for empty chats

  // We create a bucket in each user's dms docs
  // It will store chat id and last message to provide notifications
  const authorDocRef = fs.doc(db, "Users", author, "Dm", receiver); // Sender;
  const receivDocRef = fs.doc(db, "Users", receiver, "Dm", author); // Receiver;

  // This will create a bucket on both of the user profiles.
  // Most important here is chat id, that we need to listen to the right chatroom.
  fs.setDoc(authorDocRef, {
    username: receiver,
    chatId: newChat.id,
    lastMessage: null,
  }); // Updates sender
  fs.setDoc(receivDocRef, {
    username: author,
    chatId: newChat.id,
    lastMessage: null,
  }); // And receiver

  return newChat.id; // Returns the chat id;
};

// Function used to add messages on backend
const addMessage = async (
  author: string,
  receiver: string,
  chatId: string,
  payload: ChatMessage
) => {
  // Get references to both author and receiver dm docs
  const authorDocRef = fs.doc(db, "Users", author, "Dm", receiver); // Sender;
  const receivDocRef = fs.doc(db, "Users", receiver, "Dm", author); // Receiver;

  // Add message to the chat
  const newMessageRef = fs.doc(fs.collection(db, "Chats", chatId, "Messages"));
  const { id } = newMessageRef;
  await fs.setDoc(newMessageRef, { ...payload, id });

  // Store last message info on both sender and receiver's
  await fs.updateDoc(authorDocRef, {
    lastMessage: { ...payload, id, seen: true },
  });
  await fs.updateDoc(receivDocRef, {
    lastMessage: { ...payload, id, seen: false },
  });
};

// Marks chat as read when viewing new messages
const markChatAsSeen = async (
  viewer: string,
  sender: string,
  lastMessage: ChatMessage
) => {
  const { seen, ...rest } = lastMessage;
  const authorDocRef = fs.doc(db, "Users", viewer, "Dm", sender);
  await fs.updateDoc(authorDocRef, { lastMessage: { ...rest, seen: true } });
};

export {
  createUserBucket,
  doesUserExist,
  getUserInfo,
  updateProfile,
  getPostDocReference,
  getCommentDocReference,
  getPosts,
  getComments,
  createPost,
  getPostInfo,
  deletePost,
  updateLikes,
  updateFollow,
  addComment,
  addNotification,
  setupNotifListener,
  searchForProfiles,
  getHomepageContent,
  setNotificationsSeen,
  doesChatExist,
  createChatRoom,
  setupAllChatsListener,
  setupMessagesListener,
  addMessage,
  markChatAsSeen,
};
