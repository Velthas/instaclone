import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setupAllChatsListener } from "../../../firebase/firestore";
import { IconContext } from "react-icons";
import { flexColumnCenter, flexRowCenter } from "../../../styles/style";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import { createChatRoom } from "../../../firebase/firestore";

import NewChatModal from "./NewChatModal";
import ChatEntry from "./ChatEntry";
import Room from "./room/Room";
import { getCurrentUserUsername } from "../../../firebase/authentication";

const Direct = ({ user, closeSidebar }) => {
  const currentUser = getCurrentUserUsername();
  const unsubscribe = useRef(null);
  const [modal, setModal] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [newRoom, setNewRoom] = useState(null); // Will be used when user tries to open a new chatroom
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    unsubscribe.current = setupAllChatsListener(user.displayName, setRooms);
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [user]);

  const createRoom = async (username) => {
    // Used to tell if rooms exists but has no messages.
    const [room] = rooms ? rooms.filter((room) => room.username === username) : [null]

    if (room && room.lastMessage)
      //If the room exists and is displayed, click on the div and do nothing else
      document.querySelector(`#${room.chatId}`).click();
    else if (room && !room.lastMessage) {
      // If the room exists but is not displayed (no messages), make it appear and open the room
      openChatRoom(room.chatId, room.username); // If there is a chat room with no messages, open it
      setNewRoom(room); // The NewRoom will be displayed even if there are no messages.
    } else {
      // If the room doesn't exist we must create it
      const chatId = await createChatRoom(currentUser, username); // Will create buckets on both users and chat room
      const newChat = { username, chatId }; // We add this manually to our front-end state.
      setNewRoom(newChat); // This will make the new room appear on the page
      openChatRoom(chatId, username); // Sets the room as active and sends user to the appropriate route
    }
    setModal(false); // Close the modal
  };

  const openChatRoom = (id, username) => {
    setActive({id, username}); // Will make it so the chat is highlighted
    navigate(`${id}`); // Redirects to the appropriate route
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 22 }}>
      <Container onClick={() => closeSidebar("message")}>
        {modal && <NewChatModal createRoom={createRoom} setModal={setModal} />}
        <MessagesContainer>
          <ChatlistContainer>
            <Header>
              <Username>
                {user ? user.displayName : ""}
                <BsChevronDown />
              </Username>
              <NewChatButton onClick={() => setModal(true)} />
            </Header>
            <Chatlist>
              {newRoom && 
                  <ChatEntry
                    key={newRoom.chatId}
                    room={newRoom}
                    active={active}
                    openChat={openChatRoom}
                  />
                }
              {rooms &&
                rooms
                  .filter(room => room.lastMessage !== null)
                  .filter(room => newRoom ? newRoom.username !== room.username : true)
                  .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)
                  .map((room) => (
                  <ChatEntry
                    key={room.username}
                    room={room}
                    active={active}
                    openChat={openChatRoom}
                  />
                ))}
            </Chatlist>
          </ChatlistContainer>
          <Routes>
            <Route path={"/"} element={<div></div>} />
            <Route path={":id"} element={<Room active={active} />} />
          </Routes>
        </MessagesContainer>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 5%;

  ${flexRowCenter}
`;

const MessagesContainer = styled.div`
  width: 100%;
  max-width: 930px;
  height: 100%;
  border 1px solid #dbdbdb;

  display: flex;
  flex-align: stretch;
  justify-content: stretch;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 5%;
  border-bottom: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;

  ${flexRowCenter};
  justify-content: flex-end;
`;

const ChatlistContainer = styled.div`
  width: 40%;
  height: 100%;

  ${flexColumnCenter};
`;

const Chatlist = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #dfdfdf;

  ${flexColumnCenter};
`;

const Username = styled.div`
  ${flexRowCenter}
  height: 100%;
  width: 80%;
  gap: 5px;
  font-size: 1.1rem;
  font-weight: 500;
`;

const NewChatButton = styled(HiOutlinePencilSquare)`
  margin-left: 20px;
`;

export default Direct;
