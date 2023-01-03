import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import dots from "../../../../assets/icons/dots.svg";

const Header = ({ user, setSettings }) => {
  return (
    <Container>
      <User>
        <UserPhoto url={user ? user.pfp : ""} />
        <Bold>{user ? user.username : ""}</Bold>
        <span>•</span>
        <Button>Follow</Button>
      </User>
      <Dots src={dots} onClick={() => setSettings(true)} />
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

const User = styled.div`
  ${flexRowCenter};
  gap: 8px;
`;

const Bold = styled.p`
  font-weight: bold;
  color: #262626;
`;

const UserPhoto = styled.img`
  width: 32px;
  height 32px;
  border-radius: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`;

const Dots = styled.img`
  width: 15px;
  height: 15px;
`;

const Button = styled.button`
  font-weight: bold;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
`;

export default Header;
