import React, { useState } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { IconContext } from "react-icons";
import { flexColumnCenter, flexRowCenter } from "../../../styles/style";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";

import NewChatModal from "./NewChatModal";

const Direct = ({ user }) => {
  const [modal, setModal] = useState(false);

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 22 }}>
      <Container>
        {modal && <NewChatModal setModal={setModal} />}
        <MessagesContainer>
          <ChatlistContainer>
            <Header>
              <Username>
                {user ? user.displayName : ""}
                <BsChevronDown />
              </Username>
              <NewChatButton onClick={() => setModal(true)} />
            </Header>
            <Chatlist></Chatlist>
          </ChatlistContainer>
          <Routes>
            <Route path={"/"} element={<div></div>} />
            <Route
              path={":username"}
              element={<div>You are trying to chat with someone, huh</div>}
            />
          </Routes>
        </MessagesContainer>
      </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  min-width: calc(100vw - 80px);
  min-height: 100vh;
  padding: 5%;

  ${flexRowCenter}
`;

const MessagesContainer = styled.div`
  width: 100%;
  max-width: 930px;
  height: 100%;
  border 1px solid black;

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
