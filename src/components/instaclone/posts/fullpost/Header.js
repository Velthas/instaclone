import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ user, setSettings, followed, updateFollowed }) => {
  return (
    <Container>
      <User>
        <Link>
          <UserPhoto title="profile picture" url={user ? user.pfp : ""} />
        </Link>
        <StyledLink>
          <Username>{user ? user.username : ""}</Username>
        </StyledLink>
        <span>•</span>
        <Button onClick={() => updateFollowed(!followed)}>
          {followed ? "Unfollow" : "Follow"}
        </Button>
      </User>
      <Dots title="settings" onClick={() => setSettings(true)} />
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  width: 100%;
  padding: 0px 5%;
  height: 10%;
  border-bottom: 1px solid #efefef;
  padding: 0px 5%;
`;

const StyledLink = styled(Link)`
  color: #262626;
  text-decoration: none;
`

const User = styled.div`
  ${flexRowCenter};
  gap: 8px;
`;

const Username = styled.p`
  font-weight: 500;
  color: #262626;
`;

const UserPhoto = styled.div`
  width: 32px;
  height 32px;
  border-radius: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`;

const Dots = styled(BsThreeDots)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: black;
  &:hover {
    color: gray;
  }
`;
const Button = styled.button`
  font-weight: bold;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #00376b;
  }
`;

export default Header;
