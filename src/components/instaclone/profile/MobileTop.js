import React from "react";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { BsGearWide } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";

const MobileTop = ({ user }) => {
  const currentUser = getCurrentUserUsername();
  const navigate = useNavigate();

  return (
    <Container>
      {(user && currentUser === user.username) 
        ? <Gear onClick={() => navigate('settings')} />
        : <Back onClick={() => navigate(-1)} />
      }
      <Heading>{user ? user.username : ""}</Heading>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media (max-width: 750px) {
    height: 44px;
    padding: 0 16px;
    border-bottom: 1px solid #dfdfdf;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Icon = `
  height: 24px;
  width: 24px;
  color: #262626;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`

const Back = styled(BsChevronLeft)`
  ${Icon}
`;

const Gear = styled(BsGearWide)`
  ${Icon}
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 500;

  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  height: 100%;
  width: 100%;
`;

export default MobileTop;
