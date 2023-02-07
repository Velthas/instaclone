import React, { useEffect, useState } from "react";
import Main from "./sections/Main";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "./sections/Nav";

const Instaclone = ({ user }) => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); // Regulates sidebar display
  const [active, setActive] = useState("home"); // Determines which nav icon is marked as active

  const closeSidebar = (section) => { // This is used to close sidebar when click on main occurs
    if(sidebar === true) setSidebar(false); // Closes the sidebar
    if(section && section !== active) setActive(section) // Sets appropriate section as active if needed
  };

  useEffect(() => {
    if (!user) navigate("/auth"); // Brings the user to authentication if not logged in
  }, [user]);

  return (
    <Container>
      <Nav
        user={user}
        sidebar={sidebar}
        setSidebar={setSidebar}
        active={active}
        setActive={setActive}
      />
      <Main closeSidebar={closeSidebar} user={user} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Instaclone;
