import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsEmojiSmile } from "react-icons/bs";
import { Chatroom } from "../../../../utils/types";

import { useEmojiPicker } from "../../../../utils/hooks";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

type Props = {
  sendMessage: () => void;
  active: Chatroom | null;
};

const Textbox = ({ sendMessage, active }: Props) => {
  const [value, setValue] = useState("");
  const [isEmojiPickerOpen, onEmojiClick, handleEmojiPickerClick] =
    useEmojiPicker(setValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <InputContainer>
      <InputWrapper>
        {isEmojiPickerOpen && active && (
          <EmojiPicker height={350} onEmojiClick={onEmojiClick as any} />
        )}
        <Icon onClick={handleEmojiPickerClick as any} />
        <Input
          autoComplete="off"
          maxLength={2200}
          type="text"
          id="add-message"
          placeholder="Write your message here..."
          value={value}
          onChange={handleChange}
        />
        <Send onClick={() => sendMessage()}>Send</Send>
      </InputWrapper>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;

  padding: 20px;
  width: 100%;
  height: 90px;
  ${flexRowCenter}
`;

const Icon = styled(BsEmojiSmile)`
  color: #8e8e8e;
  &:hover {
    color: #c7c7c7;
  }
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

  & > aside.EmojiPickerReact {
    bottom: 60px;
    @media (max-width: 350px) {
      width: 250px !important;
      z-index: 1;
    }
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

export default Textbox;
