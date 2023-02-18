import React, { useState } from "react";
import { useComments } from "../../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { fadeIn } from "../../../styles/style";
import styled from "styled-components";
import { IoHeart, IoChatbubbleSharp } from "react-icons/io5";

const PostPreview = ({ post }) => {
  const [showStat, setShowStat] = useState(false);
  const [comments, addComment] = useComments(post);
  const navigate = useNavigate();

  return (
    <PostCard
      onClick={() => navigate("/posts/" + post.username + "/" + post.id)}
      onMouseEnter={() => setShowStat(true)}
      onMouseLeave={() => setShowStat(false)}
    >
      <PostStats show={showStat}>
        <StatContainer>
          <HeartIcon />
          <StatPara>{post.likedby.length}</StatPara>
        </StatContainer>
        <StatContainer>
          <ChatIcon />
          <StatPara>{comments ? comments.length : ""}</StatPara>
        </StatContainer>
      </PostStats>
      <PreviewImg src={post.photo} />
    </PostCard>
  );
};

const PostCard = styled.div`
  max-width: 300px;
  max-height: 300px;

  position: relative;
  aspect-ratio: 1/1;
  cursor: pointer;

  @media (max-width: 750px) {
    margin-top: -4px;
  }
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

  @media (max-width: 550px) {
    flex-direction: column;
  }
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

  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;
`;

const HeartIcon = styled(IoHeart)`
  width: 26px;
  height: 26px;
  color: white;
`;

const ChatIcon = styled(IoChatbubbleSharp)`
  width: 22px;
  height: 22px;
  color: white;
`;

const StatPara = styled.p`
  color: white;
  margin-left: 6px;
`;

export default PostPreview;
