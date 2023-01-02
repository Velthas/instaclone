import { useState, useEffect } from "react";
import {
  updateLikes,
  addComment,
  getPostInfo,
  getComments,
  getUserInfo,
  getCommentDocReference,
} from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";

// Used in post components to provide user instant feedback about
// liking posts, as well as updating things on the backend.
const useLiked = (post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(
    post.likedby.indexOf(getCurrentUserUsername()) !== -1
  );
  useEffect(() => {
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, liked); // Backend update
  }, [liked]);
  return [liked, setLiked];
};

const useCommentsLiked = (comment, post) => {
  const currentUser = getCurrentUserUsername();
  const [liked, setLiked] = useState(
    comment.likedby.indexOf(getCurrentUserUsername()) !== -1
  );
  useEffect(() => {
    updateLikes(`Users/${post.username}/Posts/${post.id}`, currentUser, liked); // Backend update
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
    }
    getPostComments(post.username, post.id);
  }, []);
  const insertComment = async () => {
    const content = document.querySelector(inputSelector).value;
    if (content.length === 0) return;
    if (content.length > 25) content.slice(1, 25);
    const commentRef = await getCommentDocReference(post);
    console.log(commentRef);
    const timestamp = Timestamp.fromDate(new Date());
    const author = getCurrentUserUsername();
    const id = commentRef.id;
    const likedby = [];
    const comment = { content, author, timestamp, id, likedby };
    addComment(commentRef, comment);
    setComments([comment].concat(comments));
  };
  return [comments, insertComment];
};

// Fetches all data about a post and its poster and sets both in state.
// Used in post components where we need info about both the post and poster.
const usePost = (username, postId) => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      const postData = await getPostInfo(username, postId);
      const userData = await getUserInfo(username);
      setPost(postData);
      setUser(userData);
    };
    getPost();
  }, []);
  return [post, user];
};

// Using this hook to fetch user information and update it when needed using updateUser.
// Could be also used to fetch user data for a profile
const useUser = (username) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const updateUser = () => getUser(); // Fetches the data again if needed.

  const getUser = async () => {
    const userData = await getUserInfo(username);
    setUser(userData);
  };

  return [user, updateUser];
};

export { useLiked, useComments, usePost, useUser };
