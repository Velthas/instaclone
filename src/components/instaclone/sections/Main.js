import React from "react";
import { Route, Routes } from "react-router-dom";
import { signOutCurrentUser } from "../../../firebase/authentication";
import Profile from '../profile/Profile'

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<div onClick={signOutCurrentUser}> this is the homepage </div>} />
      <Route path="profile/:username" element={<Profile />} />
      <Route path="posts/:postid" element={<div> this is a post page </div>} />
    </Routes>
  )
}

export default Main;