import React from "react";
import styled from "styled-components";
import { useCommentsLiked } from "../../../../utils/hooks";
import { flexRowBetween } from "../../../../styles/style";
import { Link } from "react-router-dom";

import heart from "../../../../assets/icons/heart.svg";
import fillheart from "../../../../assets/icons/fillheart.svg";

const MinimalComment = ({ comment, post }) => {
  const [liked, setLiked] = useCommentsLiked(comment, post);
  return (
    <Container>
      <div>
        <StyledLink to={`/profile/${comment.author}`}>
          <Username>{comment.author}</Username>
        </StyledLink>
        <Comment>
          {comment.content.length > 25
            ? comment.content.slice(0, 25) + "..."
            : comment.content}
        </Comment>
      </div>
      <LikeIcon
        liked={liked}
        onClick={() => setLiked(!liked)}
        src={liked ? fillheart : heart}
        alt="like comment"
      />
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
`;

const Username = styled.p`
  font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const Comment = styled.p`
  font-size: 0.9rem;
  color: black;
  display: inline;
  word-break: break-word;
`;

const LikeIcon = styled.img`
  width: 12px;
  height: 12px;
  align-self: center;
  ${({ liked }) => {
    return liked
      ? "filter: invert(50%) sepia(87%) saturate(5070%) hue-rotate(332deg) brightness(99%) contrast(85%)"
      : "";
  }};
`;

export default MinimalComment;
