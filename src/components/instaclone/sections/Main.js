import React from "react";
import { Route, Routes } from "react-router-dom";
import User from '../profile/User';
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";
import Direct from "../dm/Direct";

const Main = ({user, closeSidebar}) => {
  return (
    <Routes>
      <Route path="/" element={<Home closeSidebar={closeSidebar} user={user}/>} />
      <Route path="profile/:username/*" element={<User closeSidebar={closeSidebar} />} />
      <Route path="posts/:username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
      <Route path="direct/*" element={<Direct user={user} closeSidebar={closeSidebar} />} />
    </Routes>
  )
}

export default Main;