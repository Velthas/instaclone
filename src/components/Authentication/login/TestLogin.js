import React from "react";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";
import { loginTestUser } from "../../../firebase/authentication";
import { redirect } from "react-router-dom";

const TestLogin = () => {
  const handleClick = () => {
    loginTestUser();
    redirect("/");
  };

  return (
    <Container>
      Want to poke around?
      <Url onClick={handleClick}>Use a test account</Url>
    </Container>
  );
};

export default TestLogin;

const Container = styled.div`
  ${flexRowCenter};
  width: 350px;
  min-height: 50px;
  margin: 0 0 15px 0;
  border: 1px solid #dbdbdb;
  font-size: 0.9rem;

  @media (max-width: 550px) {
    width: 80%;
  }

  @media (max-width: 350px) {
    width: 90%;
    flex-direction: column;
  }
`;

const Url = styled.a`
  cursor: pointer;
  color: #4295f6;
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
`;
