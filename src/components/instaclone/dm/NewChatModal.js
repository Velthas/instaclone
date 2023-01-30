import React, { useState } from "react";
import styled from "styled-components";

import { IoMdClose } from "react-icons/io";
import { flexColumnCenter, flexRowBetween, flexRowCenter } from "../../../styles/style";
import { useSearch } from "../../../utils/hooks";
import UserCardChat from "./UserCardChat";

const NewChatModal = ({ setModal, createRoom }) => {
  const [profiles, setQuery] = useSearch(); // Handles search queries to the backend
  const [selected, setSelected] = useState(null); // Use this to store username of selected user

  const toggleSelected = (username) => {
    if(selected === username) setSelected(null);
    else setSelected(username);
  }

  return (
    <Backdrop>
      <Container>
        <Header>
          <IoMdClose
            onClick={() => setModal(false)}
            size={24}
            title="close form"
          />
          <Heading>New Message</Heading>
          <Continue onClick={() => createRoom(selected)}>Continue</Continue>
        </Header>
        <Search>
          <To>To:</To>
          <Searchbar
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            id="search-chat"
            placeholder="Search..."
          />
        </Search>
        <Profiles>
          {profiles &&
            profiles.map((profile) => {
              return (
                <UserCardChat
                  key={profile.id}
                  user={profile}
                  selected={selected}
                  toggleSelected={toggleSelected}
                />
              );
            })}
        </Profiles>
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;

  width: 100vw;
  height: 100vh;
  background-color: #00000091;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  border-radius: 8px;
  height: 550px;
  width: 440px;
  ${flexColumnCenter}
  background-color: #fff;
`;

const Header = styled.div`
  width: 100%;
  height: 7%;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 5%;

  ${flexRowBetween};
`;

const Heading = styled.h1`
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;

const Continue = styled.button`
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

const Search = styled.div`
  width: 100%;
  height: 10%;
  ${flexRowCenter};
  justify-content: flex-start;
  border-bottom: 1px solid #dfdfdf;
  padding: 0 5%;
`;

const Searchbar = styled.input`
  margin-left: 15px;
  padding: 4px 12px;
  border: none;
  width: 300px;
  height: 30px;
  outline: none;
  color: #262626;

  &::placeholder {
    color: #dfdfdf;
  }
`;

const To = styled.h4`
  padding: 4px 0px;
  font-size: 1rem;
  font-weight: 500;
  color: #262626;
`

const Profiles = styled.div`
  width: 100%;
  height: 83%;
  ${flexColumnCenter};
`;

export default NewChatModal;
