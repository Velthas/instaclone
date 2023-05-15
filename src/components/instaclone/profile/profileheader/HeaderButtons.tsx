import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { signOutCurrentUser } from "../../../../firebase/authentication";
import { flexRowCenter } from "../../../../styles/style";
import { BsPersonPlus } from "react-icons/bs";
import { createChatRoom, doesChatExist } from "../../../../firebase/firestore";
import miniload from "../../../../assets/icons/miniload.gif"
import { InstaUser } from "../../../../utils/types";

type Props = {
  user: InstaUser | null,
  updateFollowed: (followed: boolean) => void,
  followed: boolean,
}

const HeaderButtons = ({ user, updateFollowed, followed }: Props) => {
  const currentUser = getCurrentUserUsername() as string;
  const navigate = useNavigate();
  const [isOpeningChat, setIsOpeningChat] = useState(false);

  // Handles opening dms from profile.
  const openChat = async () => {
    if (!user) return
    setIsOpeningChat(true);
    const chat = await doesChatExist(currentUser, user.username);
    if (!chat) {
      const newChatId = await createChatRoom(currentUser, user.username);
      navigate(`/direct/${newChatId}`);
    } else navigate(`/direct/${chat.chatId}`);
    setIsOpeningChat(false);
  };

  return (
    <ButtonContainer>
      {user && currentUser !== user.username ? (
        <>
          <Button blue onClick={() => updateFollowed(!followed)}>
            {followed ? "Unfollow" : "Follow"}
          </Button>
          <Button disabled={isOpeningChat} onClick={openChat}>
            {isOpeningChat ? <LoadingImg src={miniload} alt="loading" /> : 'Message'}
          </Button>
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

const Button = styled.button<{blue?: boolean}>`
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

const LoadingImg = styled.img`
  height: 17px;
  width: 18px;
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
