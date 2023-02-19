import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { flexRowBetween, flexRowCenter } from "../../../styles/style";

const UserCardChat = ({ user, toggleSelected, selected }) => {
  return (
    <Container onClick={() => toggleSelected(user.username)}>
      <CardInfo>
        <Picture url={user.pfp} />
        <div>
          <Username>{user.username}</Username>
          <Name>{user.name}</Name>
        </div>
      </CardInfo>
      {selected === user.username ? <Checked /> : <BsCircle />}
    </Container>
  );
};

UserCardChat.propTypes = {
  user: PropTypes.object.isRequired,
  toggleSelected: PropTypes.func.isRequired,
  selected: PropTypes.any,
};

const Container = styled.div`
  width: 100%;
  height: 60;
  padding: 16px 5%;
  ${flexRowBetween}
  gap: 5px;
  cursor: pointer;

  &hover: {
    background-color: #fafafa;
  }
`;

const CardInfo = styled.div`
  ${flexRowCenter}
  justify-content: flex-start;
  gap: 10px;
`;

const Picture = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 44px;
  width: 44px;
  border-radius: 100%;
  border: 1px solid #dfdfdf;
  flex-shrink: 0;
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const Name = styled.div`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

const Checked = styled(BsCheckCircleFill)`
  color: #0095f6;
`;

export default UserCardChat;
