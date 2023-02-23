import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Nav from "./sections/Nav";
import Main from "./sections/Main";

const Instaclone = ({ user }) => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); // Regulates sidebar display
  const [active, setActive] = useState("home"); // Determines which nav icon is marked as active

  // Brings the user to authentication if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  // Used when click occurs on any place that isn't nav
  const closeSidebar = (section) => {
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
      />
      <Main closeSidebar={closeSidebar} user={user} />
    </Container>
  );
};

Instaclone.propTypes = {
  user: PropTypes.object,
};

const Container = styled.div`
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export default Instaclone;
