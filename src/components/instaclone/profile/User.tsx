import { useParams, Routes, Route } from "react-router-dom";
import { useProfile } from "../../../utils/hooks";

import EditProfile from "./EditProfile";
import Profile from "./Profile";

type Props = {
  closeSidebar: (section?: string) => void
  refresh: (username: string) => void
}

const User = ({ closeSidebar, refresh }: Props) => {
  const {username} = useParams();
  const [user, posts, reloadInfo] = useProfile(username ? username : null);

  return (
    <Routes>
      <Route path="/" element={<Profile closeSidebar={closeSidebar} user={user} posts={posts} />}/>
      <Route path="settings" element={<EditProfile closeSidebar={closeSidebar}  info={user} loadInfo={reloadInfo} refresh={refresh} />}/>
    </Routes>
  );
};

export default User;
