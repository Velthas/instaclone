import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";

const GoLogin = () => {
  return (
    <Container>
      Already have an account?
      <StyledLink to="/auth">Log in</StyledLink>
    </Container>
  );
};

export default GoLogin;

const Container = styled.div`
  ${flexRowCenter};
  width: 350px;
  min-height: 50px;
  margin: 15px 0;
  border: 1px solid #dbdbdb;
  font-size: 1rem;
  margin-bottom: 36px;
`;

const StyledLink = styled(Link)`
  color: #4295f6;
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
`;
