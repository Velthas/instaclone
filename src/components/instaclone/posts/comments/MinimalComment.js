import React from "react";
import styled from "styled-components";

const MinimalComment = ({comment}) => {
  return (
    <div>
      <Username>{comment.author}</Username>
      <Comment>{comment.content}</Comment>
    </div>
  )
};

const Username = styled.p`
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  padding-right: 5px;
`
const Comment = styled.p`
  font-size: 0.9rem;
  color: black;
  display: inline;
`

export default MinimalComment;