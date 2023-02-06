import React from "react";
import styled from "styled-components";
import { flexColumnCenter } from "../../../../styles/style";
import { fadeIn } from "../../../../styles/style";
import Notification from "./Notification";

const Notifications = ({ notifications, toggleSidebar }) => {
  return (
    <Container>
      <Heading>Notifications</Heading>
      <div>
        {notifications &&
          notifications.map((notif) => {
            return (
              <Notification
                key={notif.id}
                toggleSidebar={toggleSidebar}
                notification={notif}
              />
            );
          })}
      </div>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  ${flexColumnCenter};
  align-items: initial;
  justify-content: flex-start;
  gap: 24px;
  padding: 24px 0;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  padding-left: 10px;
`;

export default Notifications;
