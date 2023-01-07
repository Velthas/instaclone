import React from "react";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";
import { BsPersonPlus, BsThreeDots } from "react-icons/bs";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ user, posts }) => {
  const currentUser = getCurrentUserUsername();
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
                <Button blue>Follow</Button>
                <Button>Message</Button>
                <IconButton>
                  <BsPersonPlus size={15} />
                </IconButton>
              </>
              :
              <Button onClick={() => navigate('settings')}>Edit Profile</Button>
              }
            </ButtonContainer>
            <BsThreeDots size={20} />
          </FirstRow>
          <StatsUl>
            <li>
              <span>{posts.length}</span> posts
            </li>
            <li>
              <span>{user ? user.followed.length : ""}</span> followers
            </li>
            <li>
              <span>{user ? user.follows.length : ""}</span> followed
            </li>
          </StatsUl>
          <div>
            <FullName>{user ? user.name : ""}</FullName>
            <Description>{user ? user.username : ""}</Description>
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

const Button = styled.button`
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${props => props.blue ? '#fff' : '#000'};
  background-color: ${ props => props.blue ? '#0095f6' : '#efefef' };
  &:hover {
    background-color: ${props => props.blue ? '#1877f2' : '#dbdbdb' }<
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
`

const InfoContainer = styled.div`
  width: 70%;
  ${flexRowCenter};
  align-items: flex-start;
  justify-content: flex-start;
  overflow-wrap: break-word;
`;


export default ProfileHeader
