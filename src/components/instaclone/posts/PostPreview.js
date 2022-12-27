import React, { useState } from "react";
import styled from "styled-components";
import comment from '../../../assets/icons/chat.png';
import heart from '../../../assets/icons/heart.svg';

const PostPreview = ({post}) => {
  const [showStat, setShowStat] = useState(false);
  
  return (
    <PostCard onMouseEnter={() => setShowStat(true)} onMouseLeave={() => setShowStat(false)}>
      <PostStats show={showStat}>
        <StatContainer>
          <ChatIcon src={comment}/>
          <StatPara>{post.comments.length}</StatPara>
        </StatContainer>
        <StatContainer>
          <HeartIcon src={heart}/>
          <StatPara>{post.likedby.length}</StatPara>
        </StatContainer>
      </PostStats>
      <PreviewImg src={post.photo} />
    </PostCard>
  )
}

const PostCard = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 8px;

  position: relative;
`;

const PostStats = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  display: ${({show}) => show ? 'flex' : 'none'};

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
  border-radius: 8px;
  transition: 0.3s ease-in;

  &:hover{
    filter: brightness(0.7);
  }
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(306deg) brightness(102%) contrast(105%);
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