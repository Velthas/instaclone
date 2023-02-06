import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import {
  BsEmojiSmile, BsTelephone, BsCameraVideo, BsInfoCircle,
} from "react-icons/bs";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { addMessage, setupMessagesListener } from "../../../firebase/firestore";
import { flexColumnCenter, flexRowBetween, flexRowCenter } from "../../../styles/style";
import { formatMessage } from "../../../utils/formatting";
import Message from "./Message";

const Room = ({active}) => {
  console.log(active)
  const user = getCurrentUserUsername();
  const unsubscribe = useRef(null); // DB listener unsubscribe function will be stored here
  const { id } = useParams();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    unsubscribe.current = setupMessagesListener(id, setMessages); // Storing the unsubscribe function here
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [id]); // Only setup and kill listeners when the chatroom changes

  useEffect(() => {
    var objDiv = document.getElementById("message-box");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages])

  const sendMessage = () => {
    const messageBox = document.querySelector('#add-message')
    const message = messageBox.value;
    if(message.length > 2200 || message.length < 0) return;
    const formattedMessage = formatMessage(message);
    addMessage(user, active.username, id, formattedMessage);
    messageBox.value = '';

  }

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Container>
        <Header>
          <Username>{active.username}</Username>
          <Icons>
            <BsTelephone />
            <BsCameraVideo />
            <BsInfoCircle />
          </Icons>
        </Header>
        <MessagesContainer id={'message-box'}>
          {messages &&
            messages.map((message) => {
                return <Message message={message} />
            })}
        </MessagesContainer>
        <InputContainer>
          <InputWrapper>
            <BsEmojiSmile />
            <Input maxLength={2200} type="text" id='add-message' placeholder="Write your message here..." />
            <Send onClick={() => sendMessage()}>Send</Send>
          </InputWrapper>
        </InputContainer>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  max-height: 700px;
  width: 100%;
  ${flexColumnCenter}
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 5%;
  border-bottom: 1px solid #dfdfdf;

  ${flexRowBetween}
`;

const Username = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const Icons = styled.div`
  ${flexRowCenter};
  gap: 10px;
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  padding: 8px 20px;

  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

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

export default Room;
