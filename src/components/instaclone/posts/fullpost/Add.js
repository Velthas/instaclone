import React, { useState } from "react";
import styled from "styled-components";
import { flexRowBetween } from "../../../../styles/style";
import { BsEmojiSmile } from "react-icons/bs";

const Add = ({ postInfo, insertComment }) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  return (
    <Container>
      <Icon />
      <CommentBox
        onChange={(e) => handleChange(e)}
        value={value}
        autoComplete="off"
        type="text"
        id={"a" + postInfo.id}
        maxLength={150}
        placeholder="Add your comment..."
      />
      <Button value={value} onClick={() => insertComment()}>Publish</Button>
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  height: 10%;
  width: 100%;
  padding: 0 5%;

  @media (max-width: 750px) {
    padding: 0;
    height: 50px;
  }
`;

const Button = styled.button`
  display: ${(props) => props.value.length > 0 ? 'block' : 'none'};
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
  min-width: 22px;
  min-height: 22px;
  color: #8e8e8e;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: #e7e7e7;
  }
`;

const CommentBox = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  width: -webkit-fill-available;
  width: -moz-available;
  background-color: transparent;
`;

export default Add;
