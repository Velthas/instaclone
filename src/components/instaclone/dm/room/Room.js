import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { addMessage, setupMessagesListener} from "../../../../firebase/firestore";
import { flexColumnCenter } from "../../../../styles/style";
import { formatMessage } from "../../../../utils/formatting";

import Message from "../Message";
import RoomHeader from "./RoomHeader";
import Textbox from "./Textbox";

const Room = ({ active, setActive, setNewRoom, newRoom, rooms }) => {
  const user = getCurrentUserUsername();
  const unsubscribe = useRef(null); // Stores function to unsubscribe from db listener
  const navigate = useNavigate();
  const [messages, setMessages] = useState(null);
  const { id } = useParams(); // Id of the chat

  // Handles subscribing to chat on db for message updates
  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    unsubscribe.current = setupMessagesListener(id, setMessages);
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [id]);

  // Handles scrolling to bottom of chat when messages are loaded
  useEffect(() => {
    var objDiv = document.getElementById("message-box");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  // Handles setting correct chat as active when ID changes
  useEffect(() => {
    if (rooms && active && rooms.some((room) => (room.chatId === id && (room.chatId === active.chatId || newRoom.chatId === room.chatId))))
      return;
    else if (rooms) {
      const activeRoom = rooms.filter((room) => room.chatId === id)[0];
      const payload = { username: activeRoom.username, chatId: activeRoom.chatId };
      if(!activeRoom.lastMessage) setNewRoom(payload);
      setActive(payload);
    }
  }, [rooms, id]);

  // Handles sending message to backend
  const sendMessage = () => {
    const messageBox = document.querySelector("#add-message");
    const message = messageBox.value;
    if (message.length > 2200 || message.length < 0) return;
    const formattedMessage = formatMessage(message);
    addMessage(user, active.username, id, formattedMessage);
    messageBox.value = "";
  };

  // Used to backtrack to chat selection in mobile view
  const backToChatSelection = () => {
    navigate(-1);
    setActive(null);
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Container>
        <RoomHeader backToChatSelection={backToChatSelection} active={active} />
        <MessagesContainer id={"message-box"}>
          {messages &&
            messages.map((message) => {
              return <Message key={message.id} message={message} user={user} />;
            })}
        </MessagesContainer>
        <Textbox sendMessage={sendMessage} />
      </Container>
    </IconContext.Provider>
  );
};

Room.propTypes = {
  active: PropTypes.any, 
  setActive: PropTypes.func.isRequired,
  setNewRoom: PropTypes.func.isRequired,
  newRoom: PropTypes.any,
  rooms: PropTypes.any,
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
