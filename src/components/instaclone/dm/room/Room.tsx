import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import {
  addMessage,
  setupMessagesListener,
} from "../../../../firebase/firestore";
import { flexColumnCenter } from "../../../../styles/style";
import { formatMessage } from "../../../../utils/formatting";
import { ChatMessage, Chatroom } from "../../../../utils/types";

import Message from "../Message";
import RoomHeader from "./RoomHeader";
import Textbox from "./Textbox";

type Props = {
  active: Chatroom | null;
  setActive: (room: Chatroom | null) => void;
  setNewRoom: (room: Chatroom | null) => void;
  newRoom: Chatroom | null;
  rooms: Chatroom[] | null;
};

const Room = ({ active, setActive, setNewRoom, newRoom, rooms }: Props) => {
  const user = getCurrentUserUsername() as string;
  const unsubscribe = useRef<null | (() => void)>(null); // Stores function to unsubscribe from db listener
  const navigate = useNavigate();
  const [messages, setMessages] = useState<null | ChatMessage[]>(null);
  const { id } = useParams(); // Id of the chat

  // Handles subscribing to chat on db for message updates
  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    if (id) unsubscribe.current = setupMessagesListener(id, setMessages);
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [id]);

  // Handles scrolling to bottom of chat when messages are loaded
  useEffect(() => {
    var objDiv = document.getElementById("message-box");
    if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  // Handles setting correct chat as active when ID changes
  useEffect(() => {
    if (
      rooms &&
      active &&
      rooms.some(
        (room) =>
          room.chatId === id &&
          (room.chatId === active.chatId ||
            (newRoom && newRoom.chatId === room.chatId))
      )
    )
      return;
    else if (rooms) {
      const activeRoom = rooms.filter((room) => room.chatId === id)[0];
      if (!activeRoom) return;
      const payload = {
        username: activeRoom.username,
        chatId: activeRoom.chatId,
      };
      if (!activeRoom.lastMessage) setNewRoom(payload);
      setActive(payload);
    }
  }, [rooms, id]);

  // Handles sending message to backend
  const sendMessage = () => {
    const messageBox = document.querySelector<HTMLInputElement>("#add-message");
    if (!messageBox) return;
    const message = messageBox.value;
    if (message.length > 2200 || message.length < 0) return;
    const formattedMessage = formatMessage(message);
    if (user && active && id && formattedMessage.author)
      addMessage(user, active.username, id, formattedMessage);
    messageBox.value = "";
  };

  // Sends message when user presses enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") sendMessage();
  };

  // Used to backtrack to chat selection in mobile view
  const backToChatSelection = () => {
    navigate(-1);
    setActive(null);
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: "24" }}>
      <Container onKeyPress={(e) => handleKeyPress(e)}>
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
