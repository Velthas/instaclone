import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";
import styled from "styled-components";
import { FirebaseUser } from "../../utils/types";

import Nav from "./sections/Nav";
import Main from "./sections/Main";

type Props = {
  user: FirebaseUser | null
};

const Instaclone = ({ user }: Props) => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); // Regulates sidebar display
  const [active, setActive] = useState("home"); // Determines which nav icon is marked as active
  const [userData, getUserData] = useUser(user ? user.displayName : null);

  // Triggers fetch when user info is finally loaded
  useEffect(() => {
    if (user !== null) getUserData(user.displayName);
  }, [user]);

  // Brings the user to authentication if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  // Used when click occurs on any place that isn't nav
  const closeSidebar = (section: string) => {
    if (sidebar === true) setSidebar(false);
    if (section && section !== active) setActive(section);
  };

  return (
    <Container>
      <Nav
        user={user}
        sidebar={sidebar}
        setSidebar={setSidebar}
        active={active}
        setActive={setActive}
        userData={userData}
      />
      <Main getUserData={getUserData} closeSidebar={closeSidebar} user={user} />
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
