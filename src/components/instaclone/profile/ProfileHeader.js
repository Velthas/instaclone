import React from "react";
import styled from "styled-components";
import { flexRowCenter, fadeIn } from "../../../styles/style";
import { BsThreeDots } from "react-icons/bs";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { useFollow } from "../../../utils/hooks";

import Stats from "./profileheader/Stats";
import MobileStats from "./profileheader/MobileStats";
import HeaderButtons from "./profileheader/HeaderButtons";

const ProfileHeader = ({ user, posts }) => {
  const currentUser = getCurrentUserUsername();
  const [followed, updateFollowed] = useFollow(user ? user : null);
  let followers;
  if(user) followers = followed 
    ? user.followed.filter(usr => usr !== currentUser).length + 1
    : user.followed.filter(usr => usr !== currentUser).length

  return (
    <>
      <Header>
        <PicWrapper>
          <ProfilePic url={user ? user.pfp : ""} />
        </PicWrapper>
        <InfoContainer>
          <FirstRow>
            <Username>{user ? user.username : ""}</Username>
            <HeaderButtons user={user} followed={followed} updateFollowed={updateFollowed} />
            <Dots />
          </FirstRow>
          <Stats followers={followers} user={user} length={posts ? posts.length : 0}/>
          <UserInfo>
            <FullName>{user ? user.name : ""}</FullName>
            <Description>{user ? user.description : ""}</Description>
          </UserInfo>
        </InfoContainer>
      </Header>
      <UserInfoMobile>
            <FullName>{user ? user.name : ""}</FullName>
            <Description>{user ? user.description : ""}</Description>
      </UserInfoMobile>
      <MobileStats followers={followers} user={user} length={posts ? posts.length : 0} />
    </>
  );
};

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 44px;

  @media (max-width: 750px) {
    margin-bottom: 20px;
    justify-content: flex-start;
    gap: 20px;
    padding: 0 8px;
  }
`;

const ProfilePic = styled.div`
  position: relative;
  background-image: url(${({ url }) => (url ? url : '')};);
  background-position: center;
  background-size: cover;
  height: 150px;
  width: 150px;
  border-radius: 100%;

  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;

  @media (max-width: 750px) {
    height: 85px;
    width: 85px;
  }
`;

const PicWrapper = styled.div`
  height: 100%;
  width: 30%;
  margin-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    margin: 0;
    justify-content: flex-start;
    width: min-content;
  }
`;

const FirstRow = styled.div`
  ${flexRowCenter};
  justify-content: flex-start;
  height: 50px;
  gap: 10px;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
  }
`;

const Username = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
`;

const Dots = styled(BsThreeDots)`
@media (max-width: 750px) {
  display: none;
}
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    display: none;
  }
`;

const UserInfoMobile = styled.div`
  display: none;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding: 0 8px;
  }
`

const FullName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`

const Description = styled.p`
  line-height: 1.3;
  white-space: pre-wrap;
`

const InfoContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-wrap: break-word;
`;


export default ProfileHeader
