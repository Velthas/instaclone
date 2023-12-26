import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUser } from "../../../../utils/hooks";
import { formatDateShort } from "../../../../utils/formatting";

import NotifPreview from "./NotifPreview";
import NotifFollow from "./NotifFollow";
import { Notifications } from "../../../../utils/types";

type Props = {
  notification: Notifications
  toggleSidebar: (section: string) => void
}

const Notification = ({ notification, toggleSidebar }: Props) => {
  const [user, updateUser] = useUser(notification.author);

  return (
    <Container>
      <FlexWrapper>
        <Link
          to={`profile/${notification.author}`}
          onClick={() => toggleSidebar("heart")}
        >
          <ProfilePicture url={user ? user.pfp : null} />
        </Link>
        <Body>
          <Username
            to={`profile/${notification.author}`}
            onClick={() => toggleSidebar("heart")}
          >
            {notification.author}
          </Username>
          {notification.type === "l" && " liked your post. "}
          {notification.type === "f" && " followed you. "}
          {notification.type === "c" && ` commented:\n "${notification.message}" `}
          {notification.type === "cl" && " liked your comment. "}
          <Date>{formatDateShort(notification.timestamp)}</Date>
        </Body>
      </FlexWrapper>
      {(notification.type === "c" ||
        notification.type === "l" ||
        notification.type === "cl") && (
        <NotifPreview
          toggleSidebar={toggleSidebar}
          postId={notification.postid!}
          poster={notification.poster!}
          
        />
      )}
      {notification.type === "f" && <NotifFollow user={user ? user : null} />}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;

  &:hover {
    background-color: #fafafa;
  }
`;

const ProfilePicture = styled.div<{url: string | null}>`
  background-image: url(${({ url }) => (url ? url : "")});
  background-position: center;
  background-size: cover;
  height: 44px;
  width: 44px;
  border-radius: 100%;
  flex-shrink: 0;
  margin-right: 8px;
`;

const Body = styled.span`
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;

const Username = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: 500;
`;

const Date = styled.span`
  color: #8e8e8e;
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 80%;
`;

export default Notification;
