import React from "react";
import { useParams, Routes, Route } from "react-router-dom";
import { useProfile } from "../../../utils/hooks";
import EditProfile from "./EditProfile";
import Profile from "./Profile";

const User = ({closeSidebar}) => {
  const {username} = useParams();
  const [user, posts, reloadInfo] = useProfile(username);

  return (
    <Routes>
      <Route path="/" element={<Profile closeSidebar={closeSidebar} user={user} posts={posts} />}/>
      <Route path="settings" element={<EditProfile closeSidebar={closeSidebar}  info={user} loadInfo={reloadInfo} />}/>
    </Routes>
  )
}

export default User;