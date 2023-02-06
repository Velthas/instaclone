import React from "react";
import styled from "styled-components";
import { flexRowCenter, fadeIn } from "../../../styles/style";
import { BsPersonPlus, BsThreeDots } from "react-icons/bs";
import { getCurrentUserUsername, signOutCurrentUser } from "../../../firebase/authentication";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../../../utils/hooks";

const ProfileHeader = ({ user, posts }) => {
  const currentUser = getCurrentUserUsername();
  const [followed, updateFollowed] = useFollow(user ? user : null);
  let followers;
  if(user) followers = followed 
    ? user.followed.filter(usr => usr !== currentUser).length + 1
    : user.followed.filter(usr => usr !== currentUser).length
  const navigate = useNavigate();
  return (
    <Header>
      <PicWrapper>
        <ProfilePic url={user ? user.pfp : ""} />
      </PicWrapper>
      <InfoContainer>
        <div>
          <FirstRow>
            <div>
              <Username>{user ? user.username : ""}</Username>
            </div>
            <ButtonContainer>
              {user && currentUser !== user.username ?
              <>
                <Button blue onClick={() => updateFollowed(!followed)}>
                  {followed ? 'Unfollow' : 'Follow'}
                </Button>
                <Button>Message</Button>
                <IconButton>
                  <BsPersonPlus size={15} />
                </IconButton>
              </>
              :
              <>
                <Button onClick={() => navigate('settings')}>Edit Profile</Button>
                <Button onClick={() => signOutCurrentUser() }>Log out</Button>
              </>
              }
            </ButtonContainer>
            <BsThreeDots size={20} />
          </FirstRow>
          <StatsUl>
            <li>
              <StatEntry>{posts.length}</StatEntry> posts
            </li>
            <li>
              <StatEntry>
                {user ? followers : ""}
              </StatEntry> followers
            </li>
            <li>
              <StatEntry>{user ? user.follows.length : ""}</StatEntry> followed
            </li>
          </StatsUl>
          <div>
            <FullName>{user ? user.name : ""}</FullName>
            <Description>{user ? user.description : ""}</Description>
          </div>
        </div>
      </InfoContainer>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 44px;
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
`;

const PicWrapper = styled.div`
  height: 100%;
  width: 30%;
  margin-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FirstRow = styled.div`
  ${flexRowCenter};
  justify-content: flex-start;
  height: 50px;
  gap: 10px;
`;

const Username = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
`;

const StatEntry = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${props => props.blue ? '#fff' : '#000'};
  background-color: ${ props => props.blue ? '#0095f6' : '#efefef' };
  &:hover {
    background-color: ${props => props.blue ? '#1877f2' : '#dbdbdb' };
  }
`

const IconButton = styled(Button)`
  padding: 0;
  height: 35px;
  width: 32px;
`

const ButtonContainer = styled.div`
  ${flexRowCenter}
  justify-content: flex-start;
`

const StatsUl = styled.ul`
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 20px 0;
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
  ${flexRowCenter};
  align-items: flex-start;
  justify-content: flex-start;
  overflow-wrap: break-word;
`;


export default ProfileHeader
