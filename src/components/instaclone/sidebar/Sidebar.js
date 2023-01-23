import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Notifications from "./notifications/Notifications";

const Sidebar = ({ active, content, toggleSidebar, notifications }) => {
  return (
    <Container active={active}>
      {content === "search" && <Search toggleSidebar={toggleSidebar} />}
      {content === "heart" && (
        <Notifications
          notifications={notifications}
          toggleSidebar={toggleSidebar}
        />
      )}
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
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #fff;
  border-right: 1px solid #dfdfdf;
  transition: 0.3s ease-out;

  z-index: -1;
  ${({ active }) => (active ? "transform: translateX(80px);" : "")}
`;

export default Sidebar;
