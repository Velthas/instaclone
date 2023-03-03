import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatDateShort } from "../../../../utils/formatting";

const Header = ({ user, timestamp, setSettings }) => {
  return (
    <Container>
      <StyledLink to={user ? `/profile/${user.username}` : ""}>
        <User>
          <UserPhoto title="author profile picture" url={user ? user.pfp : ""}/>
          <Bold>{user ? user.username : ""}</Bold>
          <Date>• {formatDateShort(timestamp)}</Date>
        </User>
      </StyledLink>
      <Dots title="settings" onClick={() => setSettings(true)} />
    </Container>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  timestamp: PropTypes.object,
  setSettings: PropTypes.func.isRequired,
}

const Container = styled.div`
  ${flexRowBetween}
  height: 50px;
  width: 100%;
  padding: 5px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
`;

const User = styled.div`
  ${flexRowCenter};
  height: 100%;
  gap: 8px;
  font-size: 0.9rem;
`;

const Bold = styled.span`
  font-weight: 500;
  color: #262626;
`;

const Date = styled.span`
  color: #8e8e8e;
`;

const UserPhoto = styled.div`
  width: 32px;
  height 32px;
  border-radius: 100%;
  border: 1px solid #dbdbdb;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`;

const Dots = styled(BsThreeDotsVertical)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: black;
  &:hover {
    color: gray;
  }
`;

export default Header;
