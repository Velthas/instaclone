import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Notifications from "./Notifications";

const Sidebar = ({ active, content, setSidebar }) => {
  return (
    <Container active={active}>
      {content === "search" && <Search setSidebar={setSidebar} />}
      {content === "heart" && <Notifications setSidebar={setSidebar} />}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);

  width: 350px;
  height: 100vh;

  background-color: #fff;
  border-right: 1px solid #dfdfdf;
  transition: 0.3s ease-out;

  z-index: 1;
  ${({ active }) => (active ? "transform: translateX(80px);" : "")}
`;

export default Sidebar;
