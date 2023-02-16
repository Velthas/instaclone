import React from "react";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";
import { formatDateShort } from "../../../utils/formatting";
import { useUser } from "../../../utils/hooks";

const ChatEntry = ({ room, active, openChat }) => {
  const [user, updateUser] = useUser(room.username);
  return (
    <Container onClick={() => openChat(room.chatId, room.username)} active={ active ? active.id === room.chatId : false} id={room.chatId}>
      <Image url={user ? user.pfp : ""} />
      <Info>
        <Username>{room.username}</Username>
        <LastMessage>
          {room.lastMessage &&
            room.lastMessage.content.slice(0, 5) + "..." 
            + " · " +
            formatDateShort(room.lastMessage.timestamp)}
        </LastMessage>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  ${flexRowCenter}
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 8px 20px;
  cursor: pointer;
  background-color: ${({active}) => active ? '#efefef' : '#fff' };
`;

const Image = styled.div`
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
`

const Username = styled.span`
  font-weight: 400;
  font-size: 1rem;
`;

const LastMessage = styled.span`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

export default ChatEntry;
