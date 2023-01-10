import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../../../firebase/firestore";
import { useLiked, useComments } from "../../../../utils/hooks";
import { flexColumnCenter } from "../../../../styles/style";

import PostSettings from "../PostSettings";
import Icons from "../fullpost/Icons";
import Header from "./Header";
import Comments from "./Comments";
import Add from "./Add";

const HomePost = ({ post }) => {
  const [settings, setSettings] = useState(false);
  const [liked, changeLiked] = useLiked(post);
  const [comments, insertComment] = useComments(post, `#a${post.id}`); // Ensure it starts with a letter
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getPosterInfo = async () => {
      const username = post.username;
      const info = await getUserInfo(username);
      setUser(info);
    };
    getPosterInfo();
  }, []);

  return (
    <Container>
      <PostSettings settings={settings} setSettings={setSettings} post={post} />
      <Header setSettings={setSettings} user={user} />
      <Link to={`/posts/${post.username}/${post.id}`}>
        <Picture url={!user ? "" : post.photo} />
      </Link>
      <Icons liked={liked} changeLiked={changeLiked} />
      <Comments post={post} comments={comments} liked={liked} />
      <Add insertComment={insertComment} post={post} />
    </Container>
  );
};

const Container = styled.div`
  ${flexColumnCenter}
  width: 470px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  position: relative;
`;

const Picture = styled.div`
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  width: 469px;
  height: 470px;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
`;

export default HomePost;
