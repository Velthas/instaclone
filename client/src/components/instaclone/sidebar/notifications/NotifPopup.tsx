import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { BsPersonFill, BsHeartFill } from "react-icons/bs";
import { IoChatbubble } from "react-icons/io5";
import { Notifications } from "../../../../utils/types";

type Props = {
  notifications: Notifications[];
};

const NotifPopup = ({ notifications }: Props) => {
  const interval = useRef<undefined | NodeJS.Timeout>(); // Stores timeout ref
  const [display, setDisplay] = useState(false);

  // Makes popup appear for 3 seconds when new notifications arrive.
  useEffect(() => {
    if (interval.current) clearTimeout(interval.current);
    if (display === false && areNewNotifications()) setDisplay(true);
    interval.current = setTimeout(() => {
      setDisplay(false);
    }, 3000);
  }, [notifications]);

  const getUnseenByType = useCallback(
    (notifs: Notifications[]) =>
      notifs.reduce(
        (
          acc: { likes: number; follows: number; comments: number },
          notif: Notifications
        ) => {
          if (notif.seen === true) return acc;
          if (notif?.type === "l" || notif?.type === "cl") acc.likes += 1;
          if (notif?.type === "f") acc.follows += 1;
          if (notif?.type === "c") acc.comments += 1;
          return acc;
        },
        { likes: 0, follows: 0, comments: 0 }
      ),
    []
  );

  const { likes, follows, comments } = getUnseenByType(notifications);
  const areNewNotifications = () => likes + follows + comments > 0;

  return (
    <>
      {display && areNewNotifications() && (
        <Container>
          {comments > 0 && (
            <Section>
              <ChatIcon />
              <span>{comments}</span>
            </Section>
          )}
          {likes > 0 && (
            <Section>
              <LikeIcon />
              <span>{likes}</span>
            </Section>
          )}
          {follows > 0 && (
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

const Container = styled.div`
  position: absolute;
  right: -125px;
  top: 0;
  background-color: #fe004b;
  color: #fff;

  display: flex;
  justify-content: space-around:
  align-items: center;
  padding: 8px;
  border-radius: 3px;
  gap: 8px;
  cursor: pointer;

  &::after {
    position: absolute;
    left: -9px;
    top: 7px;
    content: "";
    clip-path: polygon(0 50%, 50% 100%, 50% 0);
    background-color: #fe004b;
    height: 24px;
    width: 24px;
    z-index: 1;
  }

  @media(max-width: 750px) {
    width: min-content;
    top: 55px;
    right: 0;

    &::after {
      transform: rotate(90deg);
      top: -10px;
      right: 0px;
      left: auto;
    }
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

export default NotifPopup;
