import { db } from "./firebase-config";
import {
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  doc,
  collection,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { getCurrentUserUsername } from "./authentication";

const createUserBucket = (name, username) => {
  const defaultPfp =
    "https://firebasestorage.googleapis.com/v0/b/velstaclone.appspot.com/o/users%2Fdf%2Fpfp.jpg?alt=media&token=4a70d3ec-47bf-4971-a99b-c3d50cedd702";

  const userData = {
    name: name,
    username: username,
    description: `Hello, my name is ${name}`,
    pfp: defaultPfp,
    follows: ["damian"],
    followed: [],
  };
  const docRef = doc(db, "Users", username);
  setDoc(docRef, userData);
};

// Used in signup to avoid same-username clones
const doesUserExist = async (username) => {
  const userDocument = await getDoc(doc(db, "Users", username));
  if (userDocument.exists()) return true;
  return false;
};

const getUserInfo = async (username) => {
  const docRef = doc(db, "Users", username);
  const userDoc = await getDoc(docRef);
  const data = userDoc.data();
  return data;
};

const getPosts = async (username) => {
  const colRef = collection(db, "Users", username, "Posts");
  const q = query(colRef, orderBy("timestamp", "desc"));
  const posts = await getDocs(q);
  if (posts.empty) return [];
  else return posts.docs.map((doc) => doc.data());
};

//TODO: Change this in a more specific name, use this to change profile settings
const updateDocument = async (username, payload) => {
  const docRef = doc(db, "Users", username);
  await updateDoc(docRef, payload);
};

const getPostDocReference = async (username) => {
  const docRef = doc(collection(db, "Users", username, "Posts"));
  return docRef;
};

const getCommentDocReference = async (post) => {
  const docRef = doc(
    collection(db, "Users", post.username, "Posts", post.id, "Comments")
  );
  return docRef;
};

const createPost = async (ref, payload) => {
  await setDoc(ref, payload);
};

const getPostInfo = async (username, postId) => {
  const docRef = doc(db, "Users", username, "Posts", postId);
  const document = await getDoc(docRef);
  return document.data();
};

const getComments = async (username, postId) => {
  const colRef = collection(db, "Users", username, "Posts", postId, "Comments");
  const comments = await getDocs(colRef);
  if (comments.empty) return [];
  else
    return comments.docs
      .map((comment) => comment.data())
      .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
};

const updateLikes = async (path, username, liked) => {
  const docRef = doc(db, path);
  if (liked) updateDoc(docRef, { likedby: arrayUnion(username) });
  else updateDoc(docRef, { likedby: arrayRemove(username) });
};

const addComment = async (ref, comment) => {
  setDoc(ref, comment);
};

const deletePost = async (post) => {
  const docRef = doc(db, "Users", post.username, "Posts", post.id);
  await deleteDoc(docRef);
};

const updateFollow = async (followee, followed) => {
  const follower = getCurrentUserUsername();
  const followerRef = doc(db, "Users", follower);
  const followeeRef = doc(db, "Users", followee);
  if (followed) {
    updateDoc(followerRef, { follows: arrayUnion(followee) });
    updateDoc(followeeRef, { followed: arrayUnion(follower) });
  } else {
    // Both follower and followee profiles have to be updated
    updateDoc(followerRef, { follows: arrayRemove(followee) });
    updateDoc(followeeRef, { followed: arrayRemove(follower) });
  }
};

// Used when user writes something in the search bar
// Matches what's typed in the input with usernames stored in firestore
// Only works if prefix is exactly right
const searchForProfiles = async (userQuery) => {
  const usersRef = collection(db, "Users");
  const q = query(
    usersRef,
    where("username", ">=", userQuery),
    where("username", "<=", userQuery + "\uf8ff")
  );
  const results = await getDocs(q);
  if (results.empty) return [];
  return results.docs.map((doc) => doc.data());
};

// Used to get posts for the homepage.
// Load at each person followed by a user and draw 3 most recent posts.
// It's okay for now, but will need improvement in the future
const getHomepageContent = async (username) => {
  const userInfo = await getUserInfo(username);
  const followed = userInfo.follows; // This is an array of usernames.
  let posts = []; // This is where all the posts will be stored.
  for (let i = 0; i < followed.length; i++) {
    const postsRef = collection(db, "Users", followed[i], "Posts");
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(3));
    const documents = await getDocs(q);
    const info = documents.docs.map((doc) => doc.data());
    if (info) posts = posts.concat(info);
  }
  return posts;
};

const addNotification = (receiver, payload) => {
  const docRef = doc(collection(db, "Users", receiver, "Notifications"));
  payload.id = docRef.id; // Store reference to own doc id inside
  setDoc(docRef, payload); // Append it to the user's notification subcollection
};

const getNotifications = async (username, quantity) => {
  const notifRef = collection(db, "Users", username, "Notifications");
  const q = query(notifRef, orderBy("timestamp", "desc"), limit(quantity));
  const notificationDocs = await getDocs(q);
  const notifications = notificationDocs.docs.map((doc) => doc.data());
  if (notifications.length > 0) return notifications;
  else return [];
};

// Listens for recent notifications and filters them by timestamp
// The querylimit limits the amount of docs returned, for now it's hard set at 80
const setupNotifListener = (username, setNotif, queryLimit) => {
  const q = query(
    collection(db, "Users", username, "Notifications"),
    orderBy("timestamp", "desc"),
    limit(queryLimit)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    setNotif(data); // Each time there is a change, set the new data in state.
  });
  return unsubscribe; // We can use this to unsubscribe to the listener
};

// Sets all notifications as seen.
// Worth noting that batches have a 500 operations limit
// Might need to think of alternatives to avoid bugs in the long run.
const setNotificationsSeen = async (username) => {
  const batch = writeBatch(db); // We use batch here because they're faster than singular updates
  const q = query(
    collection(db, "Users", username, "Notifications"),
    where("seen", "==", false)
  );
  const result = await getDocs(q);
  result.docs.forEach((document) => {
    const docRef = doc(db, "Users", username, "Notifications", document.id);
    batch.update(docRef, { seen: true });
  });
  batch.commit();
};

// This is a general listener that listens for all of the user's chats
const setupAllChatsListener = (username, setRooms) => {
  const q = query(collection(db, "Users", username, "Dm")); // Get all the rooms.
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    setRooms(data); // Each time there is a change, set the new data in state.
  });
  return unsubscribe; // Will be used to unsubscribe to the listener
};

// This creates a listener for a specific chat room's messages.
const setupMessagesListener = (id, setMessages) => {
  const q = query(
    collection(db, "Chats", id, "Messages"), // Look into messages for that user
    orderBy("timestamp", "asc")
  ); // Order them by timestamp
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    setMessages(data);
  });
  return unsubscribe; // Will be used to unsubscribe to the listener
};

// Will use this function to create chat bucket & info on both profiles
const createChatRoom = async (author, receiver) => {
  const newChat = doc(collection(db, "Chats")); // Creates a unique doc ref to extract id from for chat
  await setDoc(newChat, { exists: true }); // Adds the chat to the chats collection. Exists prop prevents auto-deletion

  // We create a bucket in each user's dms docs
  // It will store chat id and last message to provide notifications
  const authorDocRef = doc(db, "Users", author, "Dm", receiver); // Sender;
  const receivDocRef = doc(db, "Users", receiver, "Dm", author); // Receiver;

  // This will create a bucket on both of the user profiles.
  // Most important here is chat id, that we need to listen to the right chatroom.
  setDoc(authorDocRef, {
    username: receiver,
    chatId: newChat.id,
    lastMessage: null,
  }); // Updates sender
  setDoc(receivDocRef, {
    username: author,
    chatId: newChat.id,
    lastMessage: null,
  }); // And receiver

  return newChat.id; // Returns the chat id;
};

// Function used to add messages on backend
const addMessage = async (author, receiver, chatId, payload) => {
  console.log(author, receiver, chatId, payload);
  // Get references to both author and receiver dm docs
  const authorDocRef = doc(db, "Users", author, "Dm", receiver); // Sender;
  const receivDocRef = doc(db, "Users", receiver, "Dm", author); // Receiver;

  // Add message to the chat
  const newMessageRef = doc(collection(db, "Chats", chatId, "Messages"));
  const { id } = newMessageRef;
  await setDoc(newMessageRef, { ...payload, id });

  // Store last message info on both sender and receiver's
  await updateDoc(authorDocRef, { lastMessage: { ...payload, id } });
  await updateDoc(receivDocRef, { lastMessage: { ...payload, id } });
};

export {
  createUserBucket,
  doesUserExist,
  getUserInfo,
  updateDocument,
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
  getNotifications,
  setupNotifListener,
  searchForProfiles,
  getHomepageContent,
  setNotificationsSeen,
  createChatRoom,
  setupAllChatsListener,
  setupMessagesListener,
  addMessage,
};
