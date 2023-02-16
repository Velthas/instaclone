import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsEmojiSmile } from "react-icons/bs";

const Textbox = ({ sendMessage }) => {
  return (
    <InputContainer>
      <InputWrapper>
        <BsEmojiSmile />
        <Input
          autoComplete="off"
          maxLength={2200}
          type="text"
          id="add-message"
          placeholder="Write your message here..."
        />
        <Send onClick={() => sendMessage()}>Send</Send>
      </InputWrapper>
    </InputContainer>
  );
};

export default Textbox;

const InputContainer = styled.div`
  padding: 20px;
  width: 100%;
  height: 90px;
  ${flexRowCenter}
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 8px 16px;
  width: 80%;
  height: 30px;

  @media (max-width: 550px) {
    &::placeholder {
      font-size: 0.7rem;
    }
  }
`;

const InputWrapper = styled.div`
  ${flexRowBetween};
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  padding: 8px 20px;
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
