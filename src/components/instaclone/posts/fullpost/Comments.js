import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ExtendedComment from "../comments/ExtendedComment";
import Description from "./Description";

const Comments = ({ comments, postInfo, post, user }) => {
  return (
    <Container>
      <Description post={post} user={user} />
      {comments &&
        comments.map((comment) => (
          <ExtendedComment post={postInfo} key={comment.id} comment={comment} />
        ))}
    </Container>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  postInfo: PropTypes.object.isRequired,
  post: PropTypes.object,
  user: PropTypes.object,
};

const Container = styled.div`
  width: 100%;
  height: 70%;
  border-bottom: 1px solid #dfdfdf;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 750px) {
    min-height: 250px;
    height: auto;
    max-height: 500px;
  }
`;

export default Comments;
