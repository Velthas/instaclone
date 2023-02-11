import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";

import instalogo from "../../../assets/logo/instalogo.png"
import { BsHeartFill, BsHeart } from "react-icons/bs";

// This component only appears in mobile view
const UpperNav = ({active, markAllAsSeen, toggleSidebar}) => {
  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
    <Container>
      <InstaLogo src={instalogo} title="instalogo" />
      { active === "heart" 
        ? <BsHeartFill title="heart" />
        : <BsHeart title="heart" onClick={() => markAllAsSeen(toggleSidebar)} />
      }
    </Container>
    </IconContext.Provider>
  );
};

const Container = styled.div`
  display: none;
  height: 60px;
  width: 100%;
  padding: 0 16px;
  border-bottom: 1px solid #dfdfdf;

  position: fixed;
  background-color: #fff;
  z-index: 3;
  top: 0;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const InstaLogo = styled.img`
  height: 35px;
  width: 110px;
`;

export default UpperNav
