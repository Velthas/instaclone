import { Route, Routes } from "react-router-dom";
import { FirebaseUser } from "../../../utils/types";

import User from '../profile/User';
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";
import Direct from "../dm/Direct";

type Props = {
  user: FirebaseUser
  closeSidebar: (section?: string) => void
  getUserData: (username: string) => void
}

const Main = ({ user, closeSidebar, getUserData }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home closeSidebar={closeSidebar} user={user}/>} />
      <Route path="profile/:username/*" element={<User refresh={getUserData} closeSidebar={closeSidebar} />} />
      <Route path="posts/:username/:postid" element={<FullPost closeSidebar={closeSidebar} />} />
      <Route path="direct/*" element={<Direct closeSidebar={closeSidebar} user={user} />} />
    </Routes>
  );
};

export default Main;
