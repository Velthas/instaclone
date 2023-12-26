import { useState } from "react";
import { useChatRooms, useUser } from "../../utils/hooks";
import styled from "styled-components";
import { FirebaseUser } from "../../utils/types";

import Nav from "./sections/Nav";
import Main from "./sections/Main";
import { UserProvider } from "../context/UserProvider";

type Props = {
  user: FirebaseUser | null;
};

const Instaclone = ({ user }: Props) => {
  const [sidebar, setSidebar] = useState(false); // Regulates sidebar display
  const [active, setActive] = useState<string>("home"); // Determines which nav icon is marked as active
  const [userData, getUserData] = useUser(user ? user.displayName : null);

  // Used when click occurs on any place that isn't nav
  const closeSidebar = (section?: string) => {
    if (sidebar === true) setSidebar(false);
    if (section && section !== active) setActive(section);
  };

  return (
    <Container>
      <UserProvider user={user}>
        <Nav
          sidebar={sidebar}
          setSidebar={setSidebar}
          active={active}
          setActive={setActive}
          userData={userData}
        />
        <Main getUserData={getUserData} closeSidebar={closeSidebar} />
      </UserProvider>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export default Instaclone;
