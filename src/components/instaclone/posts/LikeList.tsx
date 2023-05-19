import styled from "styled-components";
import { slideIn, slideOut } from "../../../styles/style";
import { BsChevronLeft } from "react-icons/bs";

import LikeCard from "../cards/LikeCard";
import { flexColumnCenter } from "../../../styles/style";
import { useState, useRef } from "react";
import { getCurrentUserUsername } from "../../../firebase/authentication";

type Props = {
  userList: string[];
  showLikes: boolean;
  setShowLikes: any;
};

const LikeList = ({ userList, showLikes, setShowLikes }: Props) => {
  const currentUser = useRef(getCurrentUserUsername() as string);
  const [isListExiting, setIsListExiting] = useState(false);

  const playOutAnimation = () => {
    setIsListExiting(true);
    setTimeout(() => {
      setIsListExiting(false);
      setShowLikes(false);
    }, 300);
  };

  if (!showLikes) return null;
  return (
    <Container isListExiting={isListExiting}>
      <TitleContainer>
        <BackIcon onClick={() => playOutAnimation()} />
        {"Likes"}
      </TitleContainer>
      <UsersContainer>
        {userList.map((user) => {
          return (
            <LikeCard
              key={user}
              suggestion={user}
              currentUser={currentUser.current ? currentUser.current : null}
            />
          );
        })}
      </UsersContainer>
    </Container>
  );
};

const Container = styled.div<{ isListExiting: boolean }>`
  position: fixed;
  z-index: 2;
  top: 0;

  height: calc(100vh - 50px);
  width: 100vw;
  background-color: white;

  animation-name: ${({ isListExiting }) =>
    isListExiting ? slideOut : slideIn};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  height: 44px;
  text-align: center;
  font-weight: 500;
  color: black;
  border-bottom: 1px solid #dfdfdf;
`;

const UsersContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  padding: 8px;
  overflow-y: auto;
`;

const BackIcon = styled(BsChevronLeft)`
  position: absolute;
  inset-inline-start: 16px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

export default LikeList;
