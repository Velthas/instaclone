import React, { useEffect } from "react";
import Main from "./sections/Main";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "./sections/Nav";

const Instaclone = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) navigate('/auth');
  }, [user]);

  return (
    <Container>
      <Space />
      <Nav user={user} />
      <Main user={user} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Space = styled.div`
  width: 80px;
  flex-shrink: 0;
`

export default Instaclone;
