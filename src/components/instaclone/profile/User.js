import React from "react";
import PropTypes from "prop-types";
import { useParams, Routes, Route } from "react-router-dom";
import { useProfile } from "../../../utils/hooks";

import EditProfile from "./EditProfile";
import Profile from "./Profile";

const User = ({ closeSidebar, refresh }) => {
  const {username} = useParams();
  const [user, posts, reloadInfo] = useProfile(username);

  return (
    <Routes>
      <Route path="/" element={<Profile closeSidebar={closeSidebar} user={user} posts={posts} />}/>
      <Route path="settings" element={<EditProfile closeSidebar={closeSidebar}  info={user} loadInfo={reloadInfo} refresh={refresh} />}/>
    </Routes>
  );
};

User.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default User;
