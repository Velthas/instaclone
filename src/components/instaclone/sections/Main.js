import React from "react";
import { Route, Routes } from "react-router-dom";
import { signOutCurrentUser } from "../../../firebase/authentication";
import User from '../profile/User'

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<div onClick={signOutCurrentUser}> this is the homepage </div>} />
      <Route path="profile/:username/*" element={<User />} />
      <Route path="posts/:postid" element={<div> this is a post page </div>} />
    </Routes>
  )
}

export default Main;