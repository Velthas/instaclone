import { Link } from "react-router-dom";
import { getCurrentUserUsername } from "../firebase/authentication";
import { format } from "date-fns";

let periods = {
  year: 365 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

const formatDate = (timestamp) => {
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

const formatDateDiscursive = (timestamp) => {
  const dateMs = timestamp.seconds * 1000;
  const diff = new Date() - dateMs;

  switch (true) {
    case diff > periods.year:
      const years = Math.floor(diff / periods.year)
      return years > 1 ? years + ' years ago' : '1 year ago'
    case diff > periods.month:
      const months = Math.floor(diff > periods.month)
      return months > 1 ? months + ' months ago' : '1 month ago'
    case diff > periods.week:
      const weeks = Math.floor(diff / periods.week)
      return weeks > 1 ? weeks + ' weeks ago' : '1 week ago'
    case diff > periods.day:
      const days = Math.floor(diff / periods.day)
      return days > 1 ? days + ' days ago' : '1 day ago'
    case diff > periods.hour:
      const hours = Math.floor(diff / periods.hour)
      return hours > 1 ? hours + ' hours ago' : '1 hour ago'
    case diff > periods.minute:
      const minute = Math.floor(diff / periods.minute)
      return minute > 1 ? minute + ' minutes ago' : '1 minute ago'
    default:
      return "Now";
  }
}

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
  if(amount > 1) return `Liked by ${amount} people`;
  return 'Be the first to like this post!';
}

export { formatDate, formatDateDiscursive, formatDateLong, formatPostLikes, likeSimpleFormat, likeDiscursiveFormat};
