import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { signOutCurrentUser } from "../../../../firebase/authentication";
import { flexRowCenter } from "../../../../styles/style";
import { BsPersonPlus } from "react-icons/bs";
import { createChatRoom, doesChatExist } from "../../../../firebase/firestore";

const HeaderButtons = ({ user, updateFollowed, followed }) => {
  const currentUser = getCurrentUserUsername();
  const navigate = useNavigate();

  // Handles opening dms from profile.
  const openChat = async () => {
    const chat = await doesChatExist(currentUser, user.username);
    if(!chat){
      const newChatId = await createChatRoom(currentUser, user.username);
      navigate(`/direct/${newChatId}`);
    } else navigate(`/direct/${chat.chatId}`);
  }

  return (
    <ButtonContainer>
      {user && currentUser !== user.username ? (
        <>
          <Button blue onClick={() => updateFollowed(!followed)}>
            {followed ? "Unfollow" : "Follow"}
          </Button>
          <Button onClick={openChat}>Message</Button>
          <IconButton>
            <BsPersonPlus size={15} />
          </IconButton>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("settings")}>Edit Profile</Button>
          <Button onClick={() => signOutCurrentUser()}>Log out</Button>
        </>
      )}
    </ButtonContainer>
  );
};

const Button = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => (props.blue ? "#fff" : "#000")};
  background-color: ${(props) => (props.blue ? "#0095f6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (props.blue ? "#1877f2" : "#dbdbdb")};
  }

  @media (max-width: 750px) {
    margin: 0 5px 0 0;
    font-size: 0.8rem;
  }
`;

const IconButton = styled(Button)`
  padding: 0;
  height: 35px;
  width: 32px;
`;

const ButtonContainer = styled.div`
  ${flexRowCenter}
  justify-content: flex-start;
`;

export default HeaderButtons;
