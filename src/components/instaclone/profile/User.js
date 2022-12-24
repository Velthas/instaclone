import React, { useEffect, useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import { getUserInfo, getPosts } from "../../../firebase/firestore";
import EditProfile from "./EditProfile";
import Profile from "./Profile";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  let {username} = useParams();
  useEffect(() => {
    const loadAllInfo = async () => {
      const userInfo = await getUserInfo(username);
      const postInfo = await getPosts(username);
      setInfo(userInfo);
      setPosts(postInfo);
      setLoading(false);
    }
    loadAllInfo();
  }, []);

  const loadProfileInfo = async () => {
    setLoading(true);
    const userInfo = await getUserInfo(username);
    setInfo({...userInfo});
    setLoading(false);
  }

  return (
    <Routes>
      <Route path="/" element={<Profile loading={loading} info={info} posts={posts} />}/>
      <Route path="settings" element={<EditProfile loading={loading} info={info} loadInfo={loadProfileInfo} />}/>
    </Routes>
  )
}

export default User;