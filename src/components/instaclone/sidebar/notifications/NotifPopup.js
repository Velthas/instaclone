import React from "react";
import styled from "styled-components";
import { BsPersonFill, BsHeartFill } from "react-icons/bs";
import { IoChatbubble } from "react-icons/io5";

const NotifPopup = ({ notifications }) => {
  // Returns the number of unseen notification by type
  const getUnseenByType = (notitype) =>
    notifications.filter(
      (notif) => notif.type === notitype && notif.seen === false
    ).length;

  const likes = getUnseenByType("l") + getUnseenByType("cl");
  const follows = getUnseenByType("f");
  const comments = getUnseenByType("c");

  // This functions returns true if there is at least 1 new notification
  const areNewNotifications = () => likes + follows + comments > 0;

  return (
    <>
      {areNewNotifications() && (
        <Container>
          {comments && (
            <Section>
              <ChatIcon />
              <span>{comments}</span>
            </Section>
          )}
          {likes && (
            <Section>
              <LikeIcon />
              <span>{likes}</span>
            </Section>
          )}
          {follows && (
            <Section>
              <FollowIcon />
              <span>{follows}</span>
            </Section>
          )}
        </Container>
      )}
    </>
  );
};

export default NotifPopup;

const Container = styled.div`
  position: absolute;
  left: 40px;
  top: -8px;
  background-color: #fe004b;
  color: #fff;

  display: flex;
  justify-content: space-around:
  align-items: center;
  padding: 8px;
  border-radius: 3px;
  gap: 8px;


  &::after {
    position: absolute;
    left: -9px;
    top: 7px;
    content: "";
    clip-path: polygon(0 50%, 50% 100%, 50% 0);
    background-color: #fe004b;
    height: 24px;
    width: 24px;
    z-index: -1;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;


const NotificationIcon = `
  height: 17px;
  width: 17px;
  color: #fff;
`;

const LikeIcon = styled(BsHeartFill)`
  ${NotificationIcon}
  height: 14px;
  width: 14px;
`;

const FollowIcon = styled(BsPersonFill)`
  ${NotificationIcon}
`;

const ChatIcon = styled(IoChatbubble)`
  ${NotificationIcon}
`;
