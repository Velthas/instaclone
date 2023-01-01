import { useState, useEffect } from "react";
import { updateLikes, addComment } from "../firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getCurrentUserUsername } from "../firebase/authentication";
import uniqid from "uniqid";

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

// Used in post components to handle adding comments on front and backend.
// InsertComment is to be paired with the appropriate button/icon to 'send' comments.
// Selector of said input should be provided as argument along with the post info.
// For now, I use the post's id as an id selector for the input.
// This avoids mix-ups when multiple inputs are present on the same page.
const useComments = (post, inputSelector) => {
  const [comments, setComments] = useState(post.comments);
  const insertComment = () => {
    const content = document.querySelector(inputSelector).value;
    if (content.length === 0) return;
    if (content.length > 25) content.slice(1, 25);
    const timestamp = Timestamp.fromDate(new Date());
    const author = getCurrentUserUsername();
    const id = uniqid();
    const comment = { content, author, timestamp, id };
    addComment(`Users/${post.username}/Posts/${post.id}`, comment);
    setComments([comment].concat(comments));
  };
  return [comments, insertComment];
};

export { useLiked, useComments };
