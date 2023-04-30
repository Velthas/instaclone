import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLiked, useComments, useUser } from "../../../../utils/hooks";
import { flexColumnCenter } from "../../../../styles/style";
import { Post } from "../../../../utils/types";

import PostSettings from "../PostSettings";
import Icons from "../fullpost/Icons";
import Header from "./Header";
import Comments from "./Comments";
import Add from "./Add";

type Props = {
  post: Post;
  innerRef: (node: null | HTMLDivElement) => void;
};

const HomePost = ({ post, innerRef }: Props) => {
  const [settings, setSettings] = useState(false);
  const [liked, changeLiked] = useLiked(post);
  const [comments, insertComment] = useComments(post, `#a${post.id}`); // id must start with letter
  const [user, getUser] = useUser(post.username);
  const navigate = useNavigate();

  return (
    <Container ref={innerRef}>
      <PostSettings settings={settings} setSettings={setSettings} post={post} />
      <Header
        setSettings={setSettings}
        user={user}
        timestamp={post.timestamp}
      />
      <Picture
        onClick={() => navigate(`/posts/${post.username}/${post.id}`)}
        title="Post picture"
        url={!user ? "" : post.photo}
      />
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

  @media (max-width: 550px) {
    width: 95%;
  }
`;

const Picture = styled.div<{ url: string | "" }>`
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 3px;
  cursor: pointer;

  @media (max-width: 550px) {
    width: 100%;
    height: 400px;
  }
`;

export default HomePost;
