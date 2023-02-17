import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { addMessage, setupMessagesListener } from "../../../../firebase/firestore";
import { flexColumnCenter } from "../../../../styles/style";
import { formatMessage } from "../../../../utils/formatting";
import Message from "../Message";
import RoomHeader from "./RoomHeader";
import Textbox from "./Textbox";

const Room = ({active, setActive, rooms}) => {
  const user = getCurrentUserUsername();
  const unsubscribe = useRef(null); // Db listener unsubscribe function will be stored here
  const navigate = useNavigate();
  const { id } = useParams(); // This is the ID the chat is stored with on the db
  const [messages, setMessages] = useState(null);

  // Handles subscribing to db for messages updates
  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    unsubscribe.current = setupMessagesListener(id, setMessages); // Storing the unsubscribe function here
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [id]); // Only setup and kill listeners when the chatroom changes

  // Handles scrolling to bottom of chat when messages are loaded
  useEffect(() => {
    var objDiv = document.getElementById("message-box");
    objDiv.scrollTop = objDiv.scrollHeight; 
  }, [messages]);

  // Handles setting correct chat as active when ID changes
  useEffect(() => {
    // If current id matches active chat, do nothing
    if (rooms && active && rooms.some((room) => room.chatId === id && room.chatId === active.id)) return;
    else if(rooms) { // If not, set the appropriate chat as active
      const activeRoom = rooms.filter((room) => room.chatId === id)[0];
      const payload = {username: activeRoom.username, id: activeRoom.chatId}
      setActive(payload);
    }
  }, [rooms, id])

  const sendMessage = () => {
    const messageBox = document.querySelector('#add-message');
    const message = messageBox.value;
    if(message.length > 2200 || message.length < 0) return;
    const formattedMessage = formatMessage(message);
    addMessage(user, active.username, id, formattedMessage);
    messageBox.value = '';
  }

  const backToChatSelection = () => {
    navigate(-1);
    setActive(null);
  }

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Container>
        <RoomHeader backToChatSelection={backToChatSelection} active={active} />
        <MessagesContainer id={'message-box'}>
          {messages &&
            messages.map((message) => {
                return <Message key={message.id} message={message} user={user}/>
            })}
        </MessagesContainer>
        <Textbox sendMessage={sendMessage}/>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  ${flexColumnCenter}
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: -webkit-fill-available;
  padding: 8px 20px;

  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Room;
