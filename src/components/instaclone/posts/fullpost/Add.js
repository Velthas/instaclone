import React from "react";
import styled from "styled-components";
import { flexRowBetween } from "../../../../styles/style";
import { BsEmojiSmile } from "react-icons/bs";

const Add = ({ postInfo, insertComment }) => {
  return (
    <Container>
      <Icon />
      <CommentBox
        type="text"
        id={"a" + postInfo.id}
        maxLength={150}
        placeholder="Add your comment..."
      />
      <Button onClick={() => insertComment()}>Publish</Button>
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  height: 10%;
  width: 100%;
  padding: 0 5%;
`;

const Button = styled.button`
  font-weight: bold;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
    &:hover{
    color: #00376b;
  }
`;

const Icon = styled(BsEmojiSmile)`
  height: 24px;
  width: 24px;
  color: #262626;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: gray;
  }
`;

const CommentBox = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  width: 70%;
  background-color: transparent;
`;

export default Add;
