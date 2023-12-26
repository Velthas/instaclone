import styled from "styled-components";
import { flexColumnCenter } from "../../../../styles/style";
import { fadeIn } from "../../../../styles/style";
import { Notifications } from "../../../../utils/types";

import Notification from "./Notification";
import MobileHeader from "../MobileHeader";

type Props = {
  notifications: Notifications[],
  toggleSidebar: (section: string) => void,
};

const NotificationsBox = ({ notifications, toggleSidebar }: Props) => {
  return (
    <Container>
      <MobileHeader
        toggleSidebar={toggleSidebar}
        section="notifications"
        icon="heart"
      />
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
  padding: 24px 16px;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;

  @media (max-width: 750px) {
    padding: 0 0 24px 0;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  padding-left: 10px;
  color: #262626;

  @media (max-width: 750px) {
    display: none;
  }
`;

export default NotificationsBox;
