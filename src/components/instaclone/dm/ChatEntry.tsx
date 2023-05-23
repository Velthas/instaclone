import styled, { css } from "styled-components";
import { flexRowCenter, ping } from "../../../styles/style";
import { formatDateShort } from "../../../utils/formatting";
import { useUser } from "../../../utils/hooks";
import { Chatroom } from "../../../utils/types";
import { useEffect } from "react";
import { markChatAsSeen } from "../../../firebase/firestore";
import { getCurrentUserUsername } from "../../../firebase/authentication";

type Props = {
  room: Chatroom;
  active: Chatroom | null;
  openChat: (chatId: string, username: string) => void;
};

const ChatEntry = ({ room, active, openChat }: Props) => {
  const [user, updateUser] = useUser(room.username);
  const currentUser = getCurrentUserUsername();

  // Marks chat 
  useEffect(() => {
    if (active?.chatId === room.chatId && room.lastMessage?.seen === false) {
      if (!currentUser) return;
      markChatAsSeen(currentUser, room.username, room.lastMessage);
    }
  }, [active]);

  return (
    <Container
      onClick={() => openChat(room.chatId, room.username)}
      active={active ? active.chatId === room.chatId : false}
      id={'a' + room.chatId}
      lastMessage={room.lastMessage as any}
    >
      <Image url={user ? user.pfp : ""} />
      <Info>
        <Username>{room.username}</Username>
        <LastMessage>
          {room.lastMessage &&
            room.lastMessage.content.slice(0, 15) +
              (room.lastMessage.content.length > 15 ? "..." : "") +
              " · " +
              formatDateShort(room.lastMessage.timestamp)}
        </LastMessage>
      </Info>
    </Container>
  );
};

const Container = styled.div<{
  active: string | boolean;
  lastMessage?: { seen?: boolean } | null;
}>`
  position: relative;
  ${flexRowCenter}
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 8px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#efefef" : "#fff")};

  ${({ active, lastMessage }) =>
    !active && lastMessage?.seen === false
      ? css`
          &:after {
            content: "";
            position: absolute;
            inset-inline-start: 8px;

            height: 8px;
            width: 8px;
            border-radius: 50%;
            background-color: #fe004b;
          }

          &:before {
            content: "";
            position: absolute;
            inset-inline-start: 8px;

            width: 8px;
            height: 8px;
            background-color: #fe004b;
            border-radius: 50%;
            opacity: 0.75;

            animation-name: ${ping};
            animation-duration: 1s;
            transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
            animation-iteration-count: infinite;
          }
        `
      : ""}
`;

const Image = styled.div<{ url: null | string }>`
  height: 56px;
  width: 56px;
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  border-radius: 100%;
  border: 1px solid #dfdfdf;
`;

const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Username = styled.span`
  font-weight: 400;
  font-size: 1rem;
`;

const LastMessage = styled.span`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

export default ChatEntry;
