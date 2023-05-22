import styled from "styled-components";
import { slideIn, slideOut } from "../../../styles/style";
import { BsChevronLeft, BsXLg } from "react-icons/bs";
import { flexColumnCenter } from "../../../styles/style";
import { useState, useRef } from "react";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { InstaUser } from "../../../utils/types";

import LikeCard from "../cards/LikeCard";

type Props = {
  user: InstaUser | null;
  followersModalOpen: "followers" | "following" | "";
  setFollowersModalOpen?: any;
};

const FollowersFollowingModal = ({
  setFollowersModalOpen,
  followersModalOpen,
  user,
}: Props) => {
  const currentUser = useRef(getCurrentUserUsername() as string);
  const [isListExiting, setIsListExiting] = useState(false);

  const playOutAnimation = () => {
    setIsListExiting(true);
    setTimeout(() => {
      setIsListExiting(false);
      setFollowersModalOpen("");
    }, 300);
  };

  if (!followersModalOpen) return null;
  return (
    <Backdrop>
      <Container isListExiting={isListExiting}>
        <TitleContainer>
          <BackIcon onClick={() => playOutAnimation()} />
          {user?.username}
          <CloseIcon onClick={() => setFollowersModalOpen("")} />
        </TitleContainer>
        <TabContainer>
          <TabButton
            onClick={() => setFollowersModalOpen("followers")}
            active={followersModalOpen === "followers"}
          >
            Follower
          </TabButton>
          <TabButton
            onClick={() => setFollowersModalOpen("following")}
            active={followersModalOpen === "following"}
          >
            Following
          </TabButton>
        </TabContainer>
        <UsersContainer>
          {followersModalOpen === "followers"
            ? user?.followed?.map((user) => {
                return (
                  <LikeCard
                    key={user}
                    suggestion={user}
                    currentUser={
                      currentUser.current ? currentUser.current : null
                    }
                  />
                );
              })
            : user?.follows?.map((user) => {
                return (
                  <LikeCard
                    key={user}
                    suggestion={user}
                    currentUser={
                      currentUser.current ? currentUser.current : null
                    }
                  />
                );
              })}
        </UsersContainer>
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: auto;
  height: 100%;
  z-index: 4;

  width: 100vw;
  height: calc(100vh - 50px);
  max-height: 100%;
  background-color: #000000c4;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 550px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
  }

  @media only screen and (max-height: 550px) and (max-width: 750px) and (orientation: landscape) {
    height: 100%;
  }

  @media only screen and (max-height: 550px) and (max-width: 550px) and (orientation: landscape) {
    top: 0;
    left: 0;
    height: calc(100vh - 50px);
    transform: none;
    align-items: center;
  }
`;

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

  @media (min-width: 550px) {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    width: min(80%, 400px);
    height: min(80%, 400px);
    border-radius: 12px;

    animation-name: none;
  }

  @media (min-width: 750px) {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    width: 400px;
    height: 400px;
    border-radius: 12px;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    height: calc(100vh - 50px);
  }
`;

const TitleContainer = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  height: 44px;
  text-align: center;
  font-weight: 500;
  color: black;
`;

const TabContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  text-align: center;

  border: none;
  background-color: #fff;
  border-bottom: ${({ active }) => (active ? "1px solid black" : "none")};
  font-weight: 500;

  &:hover {
    background-color: #f8f8f8;
  }

  height: 40px;
  padding: 8px;
`;

const UsersContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: calc(100% - 84px);
  padding: 8px;
  overflow-y: scroll;
`;

const BackIcon = styled(BsChevronLeft)`
  position: absolute;
  inset-inline-start: 16px;
  cursor: pointer;
  width: 24px;
  height: 24px;

  @media (min-width: 550px) {
    display: none;
  }
`;

const CloseIcon = styled(BsXLg)`
  display: none;
  position: absolute;
  inset-inline-end: 16px;
  cursor: pointer;
  width: 20px;
  height: 20px;

  @media (min-width: 550px) {
    display: block;
  }
`;

export default FollowersFollowingModal;
