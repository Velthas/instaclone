import React from "react";
import styled from "styled-components";

const MinimalComment = ({comment}) => {
  return (
    <Container>
      <Username>{comment.author}</Username>
      <Comment>{comment.content}</Comment>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Username = styled.p`
  font-size: 1rem;
  font-weight: bold;
`
const Comment = styled.p`
  font-size: 0.9rem;
  color: black;
`

export default MinimalComment;