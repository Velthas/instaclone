import { Route, Routes } from "react-router-dom";

import User from "../profile/User";
import FullPost from "../posts/fullpost/FullPost";
import Home from "../home/Home";
import Direct from "../dm/Direct";

type Props = {
  closeSidebar: (section?: string) => void;
  getUserData: (username: string) => void;
};

const Main = ({ closeSidebar, getUserData }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home closeSidebar={closeSidebar} />} />
      <Route
        path="profile/:username/*"
        element={<User refresh={getUserData} closeSidebar={closeSidebar} />}
      />
      <Route
        path="posts/:username/:postid"
        element={<FullPost closeSidebar={closeSidebar} />}
      />
      <Route path="direct/*" element={<Direct closeSidebar={closeSidebar} />} />
    </Routes>
  );
};

export default Main;
