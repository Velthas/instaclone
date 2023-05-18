import { Route, Routes } from "react-router-dom";
import { Chatroom, FirebaseUser } from "../../../utils/types";

import User from '../profile/User';
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";
import Direct from "../dm/Direct";

type Props = {
  user: FirebaseUser
  rooms: null | Chatroom[]
  closeSidebar: (section?: string) => void
  getUserData: (username: string) => void
}

const Main = ({ user, closeSidebar, getUserData, rooms }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home closeSidebar={closeSidebar} user={user}/>} />
      <Route path="profile/:username/*" element={<User refresh={getUserData} closeSidebar={closeSidebar} />} />
      <Route path="posts/:username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
      <Route path="direct/*" element={<Direct rooms={rooms} closeSidebar={closeSidebar} user={user} />} />
    </Routes>
  );
};

export default Main;
