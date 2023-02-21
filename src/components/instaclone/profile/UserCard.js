import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();

  // Closes the sidebar when card is clicked
  const handleClick = () => {
    navigate("./profile/" + user.username);
    toggleSidebar("search");
  };

  return (
    <Container onClick={handleClick}>
      <Picture url={user.pfp} />
      <div>
        <Username>{user.username}</Username>
        <Name>{user.name}</Name>
      </div>
    </Container>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 60;
  padding: 16px 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &hover: {
    background-color: #fafafa;
  }
`;

const Picture = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 44px;
  width: 44px;
  border-radius: 100%;
  border: 1px solid #dfdfdf;
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const Name = styled.div`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

export default UserCard;
