import React from "react";
import { Route, Routes } from "react-router-dom";
import { signOutCurrentUser } from "../../../firebase/authentication";
import User from '../profile/User';
import FullPost from "../posts/FullPost";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<div onClick={signOutCurrentUser}> this is the homepage </div>} />
      <Route path="profile/:username/*" element={<User />} />
      <Route path="posts/:username/:postid" element={<FullPost />} />
    </Routes>
  )
}

export default Main;