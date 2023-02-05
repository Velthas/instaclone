import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";

const Register = () => {
  return (
    <Container>
      Don't have an account?
      <StyledLink to="/auth/signup">Sign up</StyledLink>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  ${flexRowCenter};
  width: 350px;
  min-height: 50px;
  margin: 15px 0;
  border: 1px solid #dbdbdb;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  color: #4295f6;
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
`;
