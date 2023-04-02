import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setupAllChatsListener } from "../../../firebase/firestore";
import { IconContext } from "react-icons";
import { flexColumnCenter, flexRowCenter } from "../../../styles/style";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import { createChatRoom } from "../../../firebase/firestore";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { FirebaseUser, Chatroom } from "../../../utils/types";

import NewChatModal from "./NewChatModal";
import ChatEntry from "./ChatEntry";
import Room from "./room/Room";

type Props = {
  user: FirebaseUser
  closeSidebar: (active: string) => void 
}

const Direct = ({ user, closeSidebar }: Props) => {
  const currentUser = getCurrentUserUsername() as string;
  const unsubscribe = useRef<null | (() => void)>(null); // Will hold unsubscribe database listener function
  const [modal, setModal] = useState(false); // Regulates 'new chat' modal appearance.
  const [rooms, setRooms] = useState<null | Chatroom[]>(null); // Array of chatroom objects
  const [newRoom, setNewRoom] = useState<null | Chatroom>(null); // Stores empty empty/new chatrooms
  const [active, setActive] = useState<null | Chatroom>(null); // Causes selected chat to be highlighted
  const navigate = useNavigate();

  // Sets message section as active on navbar
  useEffect(() => {
    closeSidebar("message");
  }, []);

  // Attaches listener to listen for chat updates
  useEffect(() => {
    if (unsubscribe.current) unsubscribe.current();
    unsubscribe.current = setupAllChatsListener(user.displayName, setRooms);
    return () => {
      if (unsubscribe.current) unsubscribe.current();
    };
  }, [user]);

  // Handles creation of a new room when selected via the modal
  // If the room exist and has at least one message, simply open it
  // Else if the room exists but has no messages, set it as NewRoom to make it appear
  // Otherwise, if room does not exist at all, create one, then open it.
  const createRoom = async (username: string) => {
    const [room] = rooms ? rooms.filter((room) => room.username === username) : [null];

    if (room && room.lastMessage) {
      const chatDiv = document.querySelector<HTMLElement>(`#${room.chatId}`)
      if(chatDiv) chatDiv.click();
    } else if (room && !room.lastMessage) {
      openChatRoom(room.chatId, room.username);
      setNewRoom(room); // NewRoom is displayed unconditionally
    } else {
      const chatId = await createChatRoom(currentUser, username); 
      const newChat = { username, chatId }; 
      setNewRoom(newChat); 
      openChatRoom(chatId, username); 
    }
    setModal(false); // Close the modal
  };

  const openChatRoom = (id: string, username: string) => {
    setActive({chatId: id, username});
    navigate(`${id}`); // Will make the chatroom component appear, loading messages
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: '22' }}>
      <Container onClick={() => closeSidebar("message")}>
        {modal && <NewChatModal createRoom={createRoom} setModal={setModal} />}
        <MessagesContainer>
          <ChatlistContainer active={active}>
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
                  .sort((a, b) => b.lastMessage!.timestamp.seconds - a.lastMessage!.timestamp.seconds)
                  .map((room) => (
                  <ChatEntry
                    key={room.chatId}
                    room={room}
                    active={active}
                    openChat={openChatRoom}
                  />
                ))}
            </Chatlist>
          </ChatlistContainer>
          <Routes>
            <Route path={"/"} element={<EmptyChatroom></EmptyChatroom>} />
            <Route path={":id"} element={<Room rooms={rooms} setNewRoom={setNewRoom} newRoom={newRoom} setActive={setActive} active={active} />} />
          </Routes>
        </MessagesContainer>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5%;

  ${flexRowCenter}

  @media (max-width: 750px) {
    height: calc(100vh - 50px);
    margin-bottom: 50px;
  }
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
  flex-shrink: 0;
  justify-content: flex-end;

  @media (max-width: 750px) {
    border-right: none;
  }
`;

const ChatlistContainer = styled.div<{active: Chatroom | null}>`
  width: 40%;
  height: 100%;

  ${flexColumnCenter};

  @media (max-width: 750px) {
    width: 100%;
    display: ${({active}) => active ? 'none' : 'flex'};
    border: none;
  }
`;

const Chatlist = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #dfdfdf;

  ${flexColumnCenter};
  overflow: auto;

  @media (max-width: 750px) {
    border-right: none;
  }
`;

const EmptyChatroom = styled.div`
  width: 60%;
  height: 100%;

  @media (max-width: 750px) {
    width: 0%;
  }
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
