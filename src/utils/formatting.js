import { Link } from "react-router-dom";
import { getCurrentUserUsername } from "../firebase/authentication";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

let periods = {
  year: 365 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

// Returns date formatted in a short fashion depending on the biggest unit of time available
// like so: 1 d, 2 w, 3 m, 5 y.
const formatDateShort = (timestamp) => {
  const dateMs = timestamp.seconds * 1000;
  const diff = new Date() - dateMs;

  switch (true) {
    case diff > periods.year:
      return Math.floor(diff / periods.year) + " y";
    case diff > periods.month:
      return Math.floor(diff / periods.month) + " m";
    case diff > periods.week:
      return Math.floor(diff / periods.week) + " w";
    case diff > periods.day:
      return Math.floor(diff / periods.day) + " d";
    case diff > periods.hour:
      return Math.floor(diff / periods.hour) + " h";
    case diff > periods.minute:
      return Math.floor(diff / periods.minute) + " m";
    default:
      return "Now";
  }
};

// Formats distance from given timestamp to now in a discursive fashion
// If timestamp dates back to a week ago, it would return '1 week ago'
const formatDateDiscursive = (timestamp) => {
  const dateMs = timestamp.seconds * 1000;
  const diff = new Date() - dateMs;

  switch (true) {
    case diff > periods.year:
      const years = Math.floor(diff / periods.year);
      return years > 1 ? years + " years ago" : "1 year ago";
    case diff > periods.month:
      const months = Math.floor(diff > periods.month);
      return months > 1 ? months + " months ago" : "1 month ago";
    case diff > periods.week:
      const weeks = Math.floor(diff / periods.week);
      return weeks > 1 ? weeks + " weeks ago" : "1 week ago";
    case diff > periods.day:
      const days = Math.floor(diff / periods.day);
      return days > 1 ? days + " days ago" : "1 day ago";
    case diff > periods.hour:
      const hours = Math.floor(diff / periods.hour);
      return hours > 1 ? hours + " hours ago" : "1 hour ago";
    case diff > periods.minute:
      const minute = Math.floor(diff / periods.minute);
      return minute > 1 ? minute + " minutes ago" : "1 minute ago";
    default:
      return "Now";
  }
};

const formatDateLong = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // To be used for detailed posts.
  return format(date, "MMMM d', 'yyyy"); // Returns date in this format (January 6, 2022)
};

const formatPostLikes = (likedby) => {
  switch (true) {
    case likedby.length > 1:
      return `Liked by ${(
        <Link to={"/users/" + likedby[0]}>{likedby[0]}</Link>
      )} and ${likedby.length - 1} others`;
    case likedby.length === 1:
      return `Liked by ${(
        <Link to={"/users/" + likedby[0]}>{likedby[0]}</Link>
      )}`;
  }
};

// To get the accurate count based on 'liked' state variable
// we need to first remove the current user from the likedby array.
// If we don't, a single user liking a post would count as two (array.length + 1 due to liked).
// This also enables us to refresh the front end without fetching from the backend
const likeSimpleFormat = (likedby, liked) => {
  const currentUser = getCurrentUserUsername();
  const amount = liked
    ? likedby.filter((user) => user !== currentUser).length + 1
    : likedby.filter((user) => user !== currentUser).length;
  if (amount === 1) return `Likes: 1`;
  if (amount > 1) return `Likes: ${likedby.length}`;
  return "";
};

const likeDiscursiveFormat = (likedby, liked) => {
  const currentUser = getCurrentUserUsername();
  const amount = liked
    ? likedby.filter((user) => user !== currentUser).length + 1
    : likedby.filter((user) => user !== currentUser).length;
  if (amount === 1) return `Liked by 1 person`;
  if (amount > 1) return `Liked by ${amount} people`;
  return "Be the first to like this post!";
};

// Depending on what type of notification it is, format and return appropriate payload
// Payload will then be sent over to the db and inserted as a new document.
const formatNotification = (type, postid, poster, message, commentid) => {
  const timestamp = Timestamp.now() // Get a timestamp for each notification
  const seen = false; // All notifications are unseen by default
  const author = getCurrentUserUsername(); // Author of notifications is always the user
  switch (true) {
    case (type === 'l'):
      const likeNotification = {type, author, poster, timestamp, postid, seen};
      return likeNotification;
    case (type === 'f'):
      const followNotification = {type, author, timestamp, seen};
      return followNotification;
    case (type === 'c'):
      const commentNotification = {type, author, poster, timestamp, postid, message, commentid, seen};
      return commentNotification;
    case (type === 'cl'): 
    const commentLikeNotification = {type, author, timestamp, postid, message, commentid, poster, seen};
    return commentLikeNotification;
  }
};

// Packages up a message before shipping to backend
const formatMessage = (message) => {
  const timestamp = Timestamp.now();
  const author = getCurrentUserUsername();
  const content = message;
  return {content, author, timestamp} // Is only missing id assigned in firestore function.
}

export {
  formatDateShort,
  formatDateDiscursive,
  formatDateLong,
  formatPostLikes,
  likeSimpleFormat,
  likeDiscursiveFormat,
  formatNotification,
  formatMessage
};
