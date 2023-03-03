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
  setNotificationsSeen,
} from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";
import { formatNotification } from "./formatting";

// Handles 'liked' status of a post, allowing for liking and unliking.
const useLiked = (post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(post.likedby.indexOf(currentUser) !== -1);

  const changeLiked = (liked) => {
    if(!liked && currentUser !== post.username) { // Append notif. only if not liking own post
      const likeNotification = formatNotification('l', post.id, post.username);
      addNotification(post.username, likeNotification);
    }
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked);
    setLiked(!liked);
  };

  return [liked, changeLiked];
};

// Handles likes on comments, allowing liking and unliking posts.
const useCommentsLiked = (comment, post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(comment.likedby.indexOf(currentUser) !== -1);

  const changeLiked = (liked) => {
    if(!liked && currentUser !== comment.author) { // Send notif. only if not liking own comments
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
  }, [post]);

  const insertComment = async () => {
    const input = document.querySelector(inputSelector);
    const content = input.value;
    if (content.length === 0 || content.length > 2200) return;
    const commentRef = await getCommentDocReference(post); // Need this to extract ID
    const id = commentRef.id; // I store this ID in my payload.
    const timestamp = Timestamp.now();
    const author = getCurrentUserUsername();
    const likedby = [];
    const comment = { content, author, timestamp, id, likedby };
    const commentNotification = formatNotification('c', post.id, post.username, content, id);
    if(post.username !== author) // Only send a notification if commenting other's posts
      addNotification(post.username, commentNotification);
    addComment(commentRef, comment); // Add doc to the db for permanent storage
    setComments([comment].concat(comments)); // Updates the front-end
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
    if(!liked && currentUser !== post.username) { // Only add notif. if not liking own post
      const likeNotification = formatNotification('l', postId, username);
      addNotification(post.username, likeNotification);
    }
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked); // Backend update
    setLiked(!liked); // Makes the change evident on front-end.
  };

  return [post, user, liked, changeLiked];
};

// Fetch user information and update it when needed using updateUser.
// Using it in comments/notifications/search when only pfp and username is needed.
const useUser = (username) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(username) getUser(username);
  }, []);

  const getUser = async (username) => {
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

// Used to handle search queries.
// As of now, it will give back only profiles whose username's prefix matches the query
// so if I search for 'te', and an account named 'test' exists, it will appear on screen.
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

// Used inside of profiles where we need user info and posts.
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
// As new notifications come in they get updated on the front-end.
// Notifications are sorted by timestamp so new ones will always be at the top of the list.
const useNotifications = (username) => {
  const [notifications, setNotifications] = useState([]); // Houses data fetched from backend
  const [limit, setLimit] = useState(80); // Regulates how many notifications are shown
  const listener = useState(null); // Store db listener unsubscription function
  useEffect(() => {
    const setup = () =>  setupNotifListener(username, setNotifications, limit);
    if(username) listener.current = setup(); // Creates the listener
  
    return () => { if(username && listener.current) listener.current() }
  }, [username]);

  // Increases the limit of notifications downloaded on db
  const increaseLimit = () => {
    if(listener.current) listener.current();
    listener.current = setupNotifListener(username, setNotifications, limit + 5);
    setLimit(limit + 5);
  }

  // Makes a batched update to notifications, marking all as seen.
  const markAllAsSeen = (toggleSidebar) => { 
    if(notifications.length > 0 && notifications[0].seen === false) setNotificationsSeen(username);
    toggleSidebar('heart');
  }
  
  return [notifications, markAllAsSeen]
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
