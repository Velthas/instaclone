import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";

import instalogo from "../../../assets/logo/instalogo.png"
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Route, Routes } from "react-router-dom";

// This component only appears in mobile view on the homepage
// Serves as an extension of the navbar (has notifications)
const UpperNav = ({markAllAsSeen, toggleSidebar, active}) => {
  return (
    <Routes>
      <Route path="/" element=
        {
          <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
            <Container>
              <InstaLogo src={instalogo} title="instalogo" />
              { active === "heart" 
                ? <BsHeartFill title="heart" onClick={() => toggleSidebar("heart")} />
                : <BsHeart title="heart" onClick={() => markAllAsSeen(toggleSidebar)} />
              }
            </Container>
          </IconContext.Provider>
        } 
      />
    </Routes>
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
  width: 110px;
`;

export default UpperNav
