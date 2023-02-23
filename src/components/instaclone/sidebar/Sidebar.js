import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

Sidebar.propTypes = {
  active: PropTypes.string,
  content: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  notifications: PropTypes.array,
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
  transition: 0.5s ease;

  z-index: -1;
  ${({ active }) => (active ? "transform: translateX(80px);" : "")}

  @media(max-width: 750px) {
    top: auto;
    left: auto;
    bottom: 0;

    border-right: none;
    width: 100%;
    height: calc(100vh - 50px);
    transform: translateY(100%);
    ${({ active }) => (active ? "transform: translateY(-50px);" : "")}
  }
`;

export default Sidebar;
