import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { addMessage, setupMessagesListener } from "../../../../firebase/firestore";
import { flexColumnCenter } from "../../../../styles/style";
import { formatMessage } from "../../../../utils/formatting";
import Message from "../Message";
import RoomHeader from "./RoomHeader";
import Textbox from "./Textbox";

const Room = ({active}) => {
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
    var objDiv = document.getElementById("message-box"); // Scrolls to end of chatbox
    objDiv.scrollTop = objDiv.scrollHeight; // That way users can resume where they left off
  }, [messages]);

  const sendMessage = () => {
    const messageBox = document.querySelector('#add-message');
    const message = messageBox.value;
    if(message.length > 2200 || message.length < 0) return;
    const formattedMessage = formatMessage(message);
    addMessage(user, active.username, id, formattedMessage);
    messageBox.value = '';
  }

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Container>
        <RoomHeader active={active} />
        <MessagesContainer id={'message-box'}>
          {messages &&
            messages.map((message) => {
                return <Message key={message.id} message={message} />
            })}
        </MessagesContainer>
        <Textbox sendMessage={sendMessage}/>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  max-height: 700px;
  width: 100%;
  ${flexColumnCenter}
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

export default Room;
