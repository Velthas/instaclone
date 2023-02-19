import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useCommentsLiked } from "../../../../utils/hooks";
import { flexRowBetween } from "../../../../styles/style";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const MinimalComment = ({ comment, post }) => {
  const [liked, changeLiked] = useCommentsLiked(comment, post);

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
      {liked 
        ? <LikedHeart title="Unlike comment" onClick={() => changeLiked(liked)} />
        : <EmptyHeart title="Like comment" onClick={() => changeLiked(liked)} />
      }
    </Container>
  );
};

MinimalComment.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
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
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const Comment = styled.p`
  color: black;
  display: inline;
  word-break: break-word;
`;

const Icon = `
  cursor: pointer;
  width: 12px;
  height: 12px;
  align-self: center;
`;

const EmptyHeart = styled(BsHeart)`
  ${Icon}
  color: #262626;
`;

const LikedHeart = styled(BsHeartFill)`
  ${Icon}
  color: crimson;
`;

export default MinimalComment;
