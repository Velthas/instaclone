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
} from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";

// Used in post components to provide user feedback about
// liking posts, as well as updating things on the backend.
// can be used independently when fed complete post info
const useLiked = (post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(post.likedby.indexOf(currentUser) !== -1);
  useEffect(() => {
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, liked); // Backend update
  }, [liked]);
  return [liked, setLiked];
};

// Works the same as the one above, but for comments on posts.
// Comment likes are only shown when the full post is opened.
const useCommentsLiked = (comment, post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(comment.likedby.indexOf(currentUser) !== -1);
  useEffect(() => {
    updateLikes(`Users/${post.username}/Posts/${post.id}/Comments/${comment.id}`, currentUser, liked);
  }, [liked]);
  return [liked, setLiked];
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
    if (content.length === 0) return;
    if (content.length > 25) content.slice(1, 25);
    const commentRef = await getCommentDocReference(post);
    const timestamp = Timestamp.fromDate(new Date());
    const author = getCurrentUserUsername();
    const id = commentRef.id;
    const likedby = [];
    const comment = { content, author, timestamp, id, likedby };
    addComment(commentRef, comment);
    setComments([comment].concat(comments));
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
  }, []);

  const changeLiked = (liked) => {
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, !liked);
    setLiked(!liked);
  };

  return [post, user, liked, changeLiked];
};

// Using this hook to fetch user information and update it when needed using updateUser.
// Using it in comments when profile picture has to be displayed.
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
      updateFollow(user.username, followed);
      setFollowed(followed);
    }
  }
  
  return [followed, updateFollowed]
};

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

export { useLiked, useCommentsLiked, useComments, usePost, useUser, useFollow, useSearch, useProfile };
