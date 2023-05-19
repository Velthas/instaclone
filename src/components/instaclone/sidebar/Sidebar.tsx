import styled from "styled-components";
import Search from "./Search";
import NotificationsBox from "./notifications/Notifications";
import { Notifications } from "../../../utils/types";

type Props = {
  isOpen: boolean;
  content: "search" | "heart" | string;
  toggleSidebar: (section: string) => void;
  notifications: Notifications[];
};

const Sidebar = ({ isOpen, content, toggleSidebar, notifications }: Props) => {
  return (
    <Container isOpen={isOpen}>
      {content === "search" && <Search toggleSidebar={toggleSidebar} />}
      {content === "heart" && (
        <NotificationsBox
          notifications={notifications}
          toggleSidebar={toggleSidebar}
        />
      )}
    </Container>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
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
  ${({ isOpen }) => (isOpen ? "transform: translateX(80px);" : "")}

  @media(max-width: 750px) {
    transform: translateX(-1px);

    border-right: none;
    width: 100%;
    height: calc(100vh - 50px);
    transform: translateY(101%);
    ${({ isOpen }) => (isOpen ? "transform: translateY(0);" : "")}
  }
`;

export default Sidebar;
