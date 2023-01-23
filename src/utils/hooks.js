import { useState, useEffect } from "react";
import {
  updateLikes,
  addComment,
  getPostInfo,
  getComments,
  getUserInfo,
  getPosts,
  getCommentDocReference,
  updateFollow,
  searchForProfiles,
  addNotification,
  setupNotifListener,
} from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";
import { formatNotification } from "./formatting";

// Used in post components to provide user feedback about
// liking posts, as well as updating things on the backend.
// can be used independently when fed complete post info
const useLiked = (post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(post.likedby.indexOf(currentUser) !== -1);

  const changeLiked = (liked) => {
    if(!liked) { // Only append a notification if the user is liking a post
      const likeNotification = formatNotification('l', post.id);
      addNotification(post.username, likeNotification);
    }
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked);
    setLiked(!liked);
  };

  return [liked, changeLiked];
};

// Works the same as the one above, but for comments on posts.
// Comment likes are only shown when the full post is opened.
const useCommentsLiked = (comment, post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(comment.likedby.indexOf(currentUser) !== -1);

  const changeLiked = (liked) => {
    if(!liked) { // Only append a notification if the user is liking a comment
      const clNotification = formatNotification('cl', post.id, post.username, comment.content, comment.id);
      addNotification(comment.author, clNotification);
    }
    updateLikes(`Users/${post.username}/Posts/${post.id}/Comments/${comment.id}`, currentUser, !liked);
    setLiked(!liked);
  };
  return [liked, changeLiked];
};

// Used in post components to handle adding comments on front and backend.
// InsertComment is to be paired with the appropriate button/icon to 'send' comments.
// Selector of said input should be provided as argument along with the post info.
// For now, I use the post's id as an id selector for the input.
// This avoids mix-ups when multiple inputs are present on the same page.
// Comments are a subcollection of post, and thus need to be fetched independently from it.
const useComments = (post, inputSelector) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    const getPostComments = async (username, postid) => {
      const commentdocs = await getComments(username, postid);
      setComments(commentdocs);
    };
    getPostComments(post.username, post.id);
  }, []);

  const insertComment = async () => {
    const input = document.querySelector(inputSelector)
    const content = input.value;
    if (content.length === 0 || content.length > 2200) return;
    const commentRef = await getCommentDocReference(post);
    const timestamp = Timestamp.fromDate(new Date());
    const author = getCurrentUserUsername();
    const id = commentRef.id;
    const likedby = [];
    const comment = { content, author, timestamp, id, likedby };
    const commentNotification = formatNotification('c', post.id, post.username, content, id);
    addNotification(post.username, commentNotification); // Send a notification to the post's author
    addComment(commentRef, comment); // Add doc to the db for permanent storage
    setComments([comment].concat(comments)); // Make change apparent on front-end
    input.value = ''; // Reset the text field
  };

  return [comments, insertComment];
};

// Fetches info about post, poster and determines if post has been liked.
// Used in full post components where post data is not already provided.
const usePost = (username, postId) => {
  const currentUser = getCurrentUserUsername();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const postData = await getPostInfo(username, postId);
      const userData = await getUserInfo(username);
      setPost(postData);
      setUser(userData);
      setLiked(postData.likedby.indexOf(currentUser) !== -1);
    };
    getPost();
  }, [username, postId]);

  // Used to change the liked status of a post
  const changeLiked = (liked) => {
    if(!liked) { // Only append a notification if the user is liking a post
      const likeNotification = formatNotification('l', postId, username)
      addNotification(post.username, likeNotification)
    }
    // This updates notifications on the backend using the username and postid
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked);
    setLiked(!liked); // liked state is used to display changes on the front-end
  };

  return [post, user, liked, changeLiked];
};

// Using this hook to fetch user information and update it when needed using updateUser.
// Using it in comments/notifications when only pfp and username is needed.
const useUser = (username) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(username) getUser();
  }, []);

  const getUser = async () => {
    const userData = await getUserInfo(username);
    setUser(userData);
  };

  return [user, getUser];
};

const useFollow = (user) => {
  const currentUser = getCurrentUserUsername();
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if(user) setFollowed(user.followed.indexOf(currentUser) !== -1);
  }, [user]); // When user info is loaded make sure to update the default false value

  const updateFollowed = (followed) => {
    if(user) {
      updateFollow(user.username, followed); // Updates on the backend
      if(followed) { // Only send a notification if the user is following 
        const followNotification = formatNotification('f');
        addNotification(user.username, followNotification);
      }
      setFollowed(followed); // Triggers change on the frontend
    }
  }
  return [followed, updateFollowed]
};

// This hook is used to handle search queries.
// As of now, it will give back only profiles whose username's prefix matches the query
// So if I search for 'te', and an account named 'test' exists, it will appear on screen.
// Just the same, if there is a profile named 'footest', it would not appear under the same query
const useSearch = () => {
  const [query, setQuery] = useState(false);
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    const searchProfiles = async () => {
      if(query) { 
        const result = await searchForProfiles(query);
        setProfiles(result);
      }
    } 
    searchProfiles();
  }, [query])
  return [profiles, setQuery];
}

// This hook is used inside of profiles where we need user info and posts.
const useProfile = (username) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const loadAllInfo = async () => {
      const userInfo = await getUserInfo(username);
      const postInfo = await getPosts(username);
      setUser(userInfo);
      setPosts(postInfo);
    }
    loadAllInfo();
  }, [username]);

  const reloadInfo = async () => {
    const userInfo = await getUserInfo(username);
    setUser({...userInfo});
  }
  return [user, posts, reloadInfo]
}

// This hook handles notifications for the logged user.
// A listener looks for changes in the notification collection and adds them as they come in
// I limit the entries by using the limit state variable, default is 20.
// Notifications are sorted by state so new ones will always be at the top of the list.
// Each time increaseLimit is called, this 'roof' is extended by 5. 
const useNotifications = (username) => {
  const [notifications, setNotifications] = useState([]); // We set data we get from the db in state.
  const [limit, setLimit] = useState(20); // This is used to regulate how many notifications are shown.
  useEffect(() => {
    let unsubscribe;
    const setup = () => { 
      const unsubscribe = setupNotifListener(username, setNotifications, setLimit);
      return unsubscribe; // This will be used to stop the listener when component unmounts
    }
    if(username) unsubscribe = setup(); // Only set up the listener once we receive user username

    return () => { if(username) unsubscribe(); } // Destroy listener when component unmounts
  }, [username]); // When current user is loaded, triggers first fetch and turn on listener

  const increaseLimit = () => {
    setLimit(limit + 5);
  };

  return [notifications, increaseLimit]
}

export { 
  useLiked,
  useCommentsLiked,
  useComments,
  usePost,
  useUser,
  useFollow,
  useSearch,
  useProfile,
  useNotifications
 };
