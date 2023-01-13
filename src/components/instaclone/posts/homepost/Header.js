import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ user, setSettings }) => {
  return (
    <Container>
      <StyledLink to={user ? `/profile/${user.username}` : ''}>
        <User>
          <UserPhoto title="author profile picture" url={user ? user.pfp : ""} />
          <Bold>{user ? user.username : ""}</Bold>
        </User>
      </StyledLink>
      <Dots title="settings" onClick={() => setSettings(true)} />
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #efefef;
  padding: 5px 5%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const User = styled.div`
  ${flexRowCenter};
  gap: 8px;
`;

const Bold = styled.p`
  font-weight: 500;
  color: #262626;
`;

const UserPhoto = styled.img`
  width: 32px;
  height 32px;
  border-radius: 100%;
  border: 1px solid #dbdbdb;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`;

const Dots = styled(BsThreeDots)`
  width: 18px;
  height: 18px;
  color: black;
  &:hover {
    color: gray;
  }
`;

export default Header;