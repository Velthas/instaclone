import { useState, useEffect, useRef } from "react";
import * as fs from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";
import { formatNotification } from "./formatting";
import * as tp from '../utils/types';

// Handles 'liked' status of a post, allowing for liking and unliking.
const useLiked = (post: tp.Post) => {
  const currentUser = getCurrentUserUsername() as string;
  const isLiked = currentUser ? post.likedby.indexOf(currentUser) !== -1 : false;
  const [liked, setLiked] = useState(isLiked);

  const changeLiked = (liked: boolean) => {
    if(!liked && currentUser !== post.username) { // Append notif. only if not liking own post
      const likeNotification = formatNotification('l', post.id, post.username);
      if(likeNotification) fs.addNotification(post.username, likeNotification);
    }
    fs.updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked);
    setLiked(!liked);
  };

  return [liked, changeLiked];
};

// Handles likes on comments, allowing liking and unliking posts.
const useCommentsLiked = (comment: tp.Comments, post: tp.Post) => {
  const currentUser = getCurrentUserUsername() as string;
  const isLiked = currentUser ? comment.likedby.indexOf(currentUser) !== -1 : false;
  const [liked, setLiked] = useState(isLiked);

  const changeLiked = (liked: boolean) => {
    if(!liked && currentUser !== comment.author) { // Send notif. only if not liking own comments
      const clNotification = formatNotification('cl', post.id, post.username, comment.content, comment.id);
      if(clNotification) fs.addNotification(comment.author, clNotification);
    }
    fs.updateLikes(`Users/${post.username}/Posts/${post.id}/Comments/${comment.id}`, currentUser, !liked);
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
const useComments = (post: tp.Post, inputSelector: string) => {
  const [comments, setComments] = useState<tp.Comments[] | null>(null);
  useEffect(() => {
    const getPostComments = async (username: string, postid: string) => {
      const commentdocs = await fs.getComments(username, postid);
      setComments(commentdocs);
    };
    getPostComments(post.username, post.id);
  }, [post]);

  const insertComment = async () => {
    const input = document.querySelector<HTMLInputElement>(inputSelector);
    if(!input) return;
    const content = input.value;
    if (content.length === 0 || content.length > 2200) return;
    const commentRef = await fs.getCommentDocReference(post); // Need this to extract ID
    const id = commentRef.id; // I store this ID in my payload.
    const timestamp = Timestamp.now();
    let author = getCurrentUserUsername();
    const likedby: string[] = [];
    const comment = { content, author, timestamp, id, likedby } as tp.Comments;
    const commentNotification = formatNotification('c', post.id, post.username, content, id);
    if(post.username !== author && commentNotification) // Only send a notification if commenting other's posts
      fs.addNotification(post.username, commentNotification);
    fs.addComment(commentRef, comment); // Add doc to the db for permanent storage
    if(comments) setComments([comment].concat(comments)); // Updates the front-end
  };

  return [comments, insertComment];
};

// Fetches info about post, poster and determines if post has been liked.
// Used in full post components where post data is not already provided.
const usePost = (username: string, postId: string) => {
  const currentUser = getCurrentUserUsername() as string;
  const [post, setPost] = useState<tp.Post | null>(null);
  const [user, setUser] = useState<tp.InstaUser | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  useEffect(() => {
    const getPost = async () => {
      const postData = await fs.getPostInfo(username, postId);
      const userData = await fs.getUserInfo(username);
      setPost(postData);
      setUser(userData);
      setLiked(postData.likedby.indexOf(currentUser) !== -1);
    };
    getPost();
  }, [username, postId]);

  // Used to change the liked status of a post
  const changeLiked = (liked: boolean) => {
    if(post && !liked && currentUser !== post.username) { // Only add notif. if not liking own post
      const likeNotification = formatNotification('l', postId, username);
      if(likeNotification) fs.addNotification(post.username, likeNotification);
    }
    if(post) fs.updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked); // Backend update
    setLiked(!liked); // Makes the change evident on front-end.
  };

  return [post, user, liked, changeLiked];
};

// Fetch user information and update it when needed using updateUser.
// Using it in comments/notifications/search when only pfp and username is needed.
const useUser = (username: string | null): [tp.InstaUser | null, (username: string) => void] => {
  const [user, setUser] = useState<tp.InstaUser | null>(null);
  useEffect(() => {
    if(username) getUser(username);
  }, []);

  const getUser = async (username: string): Promise<void> => {
    const userData = await fs.getUserInfo(username);
    if(userData) setUser(userData);
  };

  return [user, getUser];
};

const useFollow = (user: tp.InstaUser | null) => {
  const currentUser = getCurrentUserUsername() as string;
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if(user) setFollowed(user.followed.indexOf(currentUser) !== -1);
  }, [user]); // When user info is loaded make sure to update the default false value

  const updateFollowed = (followed: boolean) => {
    if(user) {
      fs.updateFollow(user.username, followed); // Updates on the backend
      if(followed) { // Only send a notification if the user is following 
        const followNotification = formatNotification('f');
        if(followNotification) fs.addNotification(user.username, followNotification);
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
const useSearch = (): [profiles: [] | tp.InstaUser[], setQuery: (query: string) => void] => {
  const [query, setQuery] = useState<string>("");
  const [profiles, setProfiles] = useState<[] | tp.InstaUser[]>([])
  useEffect(() => {
    const searchProfiles = async () => {
      if(query) { 
        const result = await fs.searchForProfiles(query);
        setProfiles(result);
      }
    } 
    searchProfiles();
  }, [query])
  return [profiles, setQuery];
}

// Used inside of profiles where we need user info and posts.
const useProfile = (username: string) => {
  const [user, setUser] = useState<null | tp.InstaUser>(null);
  const [posts, setPosts] = useState<[] | tp.Post[]>([]);
  useEffect(() => {
    const loadAllInfo = async () => {
      const userInfo = await fs.getUserInfo(username);
      const postInfo = await fs.getPosts(username);
      setUser(userInfo);
      setPosts(postInfo);
    }
    loadAllInfo();
  }, [username]);

  const reloadInfo = async () => {
    const userInfo = await fs.getUserInfo(username);
    setUser({...userInfo});
  }
  return [user, posts, reloadInfo]
}

// This hook handles notifications for the logged user.
// As new notifications come in they get updated on the front-end.
// Notifications are sorted by timestamp so new ones will always be at the top of the list.
const useNotifications = (username: string) => {
  const [notifications, setNotifications] = useState<[] | tp.Notifications[]>([]); // Houses data fetched from backend
  const [limit, setLimit] = useState(80); // Regulates how many notifications are shown
  const listener = useRef<null | (() => void)>(null); // Store db listener unsubscription function
  useEffect(() => {
    const setup = () =>  fs.setupNotifListener(username, setNotifications, limit);
    if(username) listener.current = setup(); // Creates the listener
  
    return () => { if(username && listener.current) listener.current() }
  }, [username]);

  // Increases the limit of notifications downloaded on db
  const increaseLimit = () => {
    if(listener.current) listener.current();
    listener.current = fs.setupNotifListener(username, setNotifications, limit + 5);
    setLimit(limit + 5);
  };

  // Makes a batched update to notifications, marking all as seen.
  const markAllAsSeen = (toggleSidebar: (active: string) => void) => { 
    if(notifications.length > 0 && notifications[0].seen === false) fs.setNotificationsSeen(username);
    toggleSidebar('heart');
  };
  
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
