import React from "react";
import styled from "styled-components";
import { BsEmojiSmile } from "react-icons/bs";
import { flexRowBetween } from "../../../../styles/style";

const Add = ({ post, insertComment }) => {
  return (
    <AddComment>
      <Icon />
      <Input
        placeholder="Add your comment here..."
        type="text"
        id={`a${post.id}`}
      />
      <Send onClick={insertComment}>Publish</Send>
    </AddComment>
  );
};

const AddComment = styled.div`
  ${flexRowBetween}
  width: 90%;
  height: 50px;
  padding: 20px 0 5% 0;
`;

const Icon = styled(BsEmojiSmile)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const Input = styled.input`
  height: 32px;
  border: none;
  padding: 5px;
  width: -webkit-fill-available;
  width: -moz-available;
  outline: none;
  font-size: 0.9rem;
  &::placeholder {
  }
`;

const Send = styled.button`
  font-weight: 500;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #00376b;
  }
`;

export default Add;
