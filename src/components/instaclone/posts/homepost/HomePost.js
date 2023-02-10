import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLiked, useComments, useUser } from "../../../../utils/hooks";
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
  const [user, getUser] = useUser(post.username);

  return (
    <Container>
      <PostSettings settings={settings} setSettings={setSettings} post={post} />
      <Header setSettings={setSettings} user={user} timestamp={post.timestamp} />
      <Link to={`/posts/${post.username}/${post.id}`}>
        <Picture title="Post picture" url={!user ? "" : post.photo} />
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
  border-bottom: 1px solid #dbdbdb;
  position: relative;
  font-size: 0.9rem;
`;

const Picture = styled.div`
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  width: 469px;
  height: 470px;
  border-radius: 3px;
`;

export default HomePost;
