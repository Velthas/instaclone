import { Link } from "react-router-dom";
import { getCurrentUserUsername } from "../firebase/authentication";
import { format } from "date-fns";

const formatDate = (timestamp) => {
  let periods = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

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

const formatDateLong = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000) // To be used for detailed posts.
  return format(date, "MMMM d', 'yyyy"); // Returns date in this format (January 6, 2022)
}

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
  if(amount === 1) return `Likes: 1`;
  if(amount > 1) return `Likes: ${likedby.length}`;
  return '';
};

const likeDiscursiveFormat = (likedby, liked) => {
  const currentUser = getCurrentUserUsername(); 
  const amount = liked
    ? likedby.filter((user) => user !== currentUser).length + 1
    : likedby.filter((user) => user !== currentUser).length;
  if(amount === 1) return `Liked by 1 person`;
  if(amount > 1) return `Liked by ${likedby.length} people`;
  return 'Be the first to like this post!';
}

export { formatDate, formatDateLong, formatPostLikes, likeSimpleFormat, likeDiscursiveFormat};
