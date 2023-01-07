import React, { useState } from "react";
import { useComments } from "../../../utils/hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";
import comment from "../../../assets/icons/chat.png";
import heart from "../../../assets/icons/heart.svg";

const PostPreview = ({ post }) => {
  const [showStat, setShowStat] = useState(false);
  const [comments, addComment] = useComments(post);

  return (
    <Link to={'/posts/' + post.username + '/' + post.id}>
      <PostCard
        onMouseEnter={() => setShowStat(true)}
        onMouseLeave={() => setShowStat(false)}
      >
        <PostStats show={showStat}>
          <StatContainer>
            <ChatIcon src={comment} />
            <StatPara>{comments ? comments.length : ""}</StatPara>
          </StatContainer>
          <StatContainer>
            <HeartIcon src={heart} />
            <StatPara>{post.likedby.length}</StatPara>
          </StatContainer>
        </PostStats>
        <PreviewImg src={post.photo} />
      </PostCard>
    </Link>
  );
};

const PostCard = styled.div`
  max-width: 300px;
  max-height: 300px;

  position: relative;
  aspect-ratio: 1/1;
`;

const PostStats = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;

  display: ${({ show }) => (show ? "flex" : "none")};

  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StatContainer = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease-in;

  &:hover {
    filter: brightness(0.7);
  }
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(306deg) brightness(102%) contrast(105%);
`;

const ChatIcon = styled(HeartIcon)`
  width: 18px;
  height: 18px;
`;

const StatPara = styled.p`
  color: white;
  margin-left: 6px;
`;

export default PostPreview;
