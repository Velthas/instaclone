import React from "react";
import styled from "styled-components";
import { flexColumnCenter } from "../../../../styles/style";
import {
  likeDiscursiveFormat,
  formatDateDiscursive,
} from "../../../../utils/formatting";
import { Link } from "react-router-dom";
import MinimalComment from "../comments/MinimalComment";
import Description from "./Description";

const Comments = ({ post, comments, liked }) => {
  const description = { author: post.username, content: post.description };
  return (
    <CommentSection>
      <LikeCount>
        {(post.likedby.length !== 0 || liked === true) &&
          likeDiscursiveFormat(post.likedby, liked)}
      </LikeCount>
      <Description description={description} />
      {comments && comments.length > 2 && (
        <ViewMoreCommentsPara>
          <StyledLink to={`/posts/${post.username}/${post.id}`}>
            {"Show all " + comments.length + " comments"}
          </StyledLink>
        </ViewMoreCommentsPara>
      )}
      <CommentsContainer>
        {comments &&
          comments
            .slice(0, 2)
            .map((comment) => (
              <MinimalComment post={post} key={comment.id} comment={comment} />
            ))}
      </CommentsContainer>
      <Date>{formatDateDiscursive(post.timestamp)}</Date>
    </CommentSection>
  );
};

const CommentSection = styled.div`
  padding: 0px 5% 10px 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #e6e6e6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #959595;
`;

const ViewMoreCommentsPara = styled.p`
  font-size: 0.9rem;
  color: #959595;
  cursor: pointer;
`;

const LikeCount = styled.p`
  font-size: 1rem;
  color: #262626;
  font-weight: 500;
`;

const CommentsContainer = styled.div`
  ${flexColumnCenter}
  align-items: flex-start;
  gap: 2px;
`;

const Date = styled.div`
  color: #959595;
  text-transform: uppercase;
  font-size: 0.7rem;
  margin: 5px 0;
`;

export default Comments;
