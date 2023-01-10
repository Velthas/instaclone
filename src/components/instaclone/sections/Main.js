import React from "react";
import { Route, Routes } from "react-router-dom";
import User from '../profile/User';
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";

const Main = ({user}) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user}/>} />
      <Route path="profile/:username/*" element={<User />} />
      <Route path="posts/:username/:postid" element={<FullPost />} />
    </Routes>
  )
}

export default Main;