import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";

import User from '../profile/User';
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";
import Direct from "../dm/Direct";

const Main = ({ user, closeSidebar, getUserData }) => {
  return (
    <Routes>
      <Route path="/" element={<Home closeSidebar={closeSidebar} user={user}/>} />
      <Route path="profile/:username/*" element={<User refresh={getUserData} closeSidebar={closeSidebar} />} />
      <Route path="posts/:username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
      <Route path="direct/*" element={<Direct closeSidebar={closeSidebar} user={user} />} />
    </Routes>
  );
};

Main.propTypes = {
  user: PropTypes.object,
  closeSidebar: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
};

export default Main;
