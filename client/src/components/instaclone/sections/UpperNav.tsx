import styled from "styled-components";
import { IconContext } from "react-icons";

import instalogo from "../../../assets/logo/instalogo.png";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Route, Routes } from "react-router-dom";
import NotifPopup from "../sidebar/notifications/NotifPopup";
import { flexRowCenter } from "../../../styles/style";
import { Notifications } from "../../../utils/types";

type Props = {
  markAllAsSeen: (toggleSidebar: (section: string) => void) => void;
  toggleSidebar: (section: string) => void;
  active: string;
  notifications: Notifications[];
};

// This component only appears in mobile view on the homepage
// Serves as an extension of the navbar (has notifications)
const UpperNav = ({
  markAllAsSeen,
  toggleSidebar,
  active,
  notifications,
}: Props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IconContext.Provider
            value={{ style: { cursor: "pointer" }, size: "24" }}
          >
            <Container>
              <InstaLogo src={instalogo} title="instalogo" />
              <HeartContainer notif={notifications}>
                <NotifPopup notifications={notifications} />
                {active === "heart" ? (
                  <BsHeartFill
                    title="heart"
                    onClick={() => toggleSidebar("heart")}
                  />
                ) : (
                  <BsHeart
                    title="heart"
                    onClick={() => markAllAsSeen(toggleSidebar)}
                  />
                )}
              </HeartContainer>
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
  z-index: 2;
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

const HeartContainer = styled.div<{ notif: Notifications[] }>`
  position: relative;
  ${flexRowCenter}

  &::after {
    ${({ notif }) => (notif.length > 0 && !notif[0].seen ? "content: '';" : "")}
    position: absolute;
    top: -2px;
    right: -5px;
    border: 2px solid #fff;
    border-radius: 100%;
    height: 10px;
    width: 10px;

    background-color: #fe004b;
  }
`;

export default UpperNav;
