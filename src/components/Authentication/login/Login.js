import React, { useState } from "react";
import styled from "styled-components";
import { flexColumnCenter, flexRowCenter } from "../../../styles/style";

import instalogo from "../../../assets/logo/instalogo.png";
import Phone from "./Phone";
import LoginForm from "../../forms/LoginForm";
import Facebook from "./Facebook";
import Register from "./Register";
import TestLogin from "./TestLogin";

const Login = () => {
  const [error, setError] = useState(null);
  const displayError = (msg) => setError(msg);

  return (
    <Container>
      <Phone />
      <MainWrapper>
        <FormContainer>
          <Logo src={instalogo} alt="Instagram Logo" />
          <LoginForm displayError={displayError} />
          <Facebook />
          <ForgotPass>Forgot your password?</ForgotPass>
          {error && <Error>{error}</Error>}
        </FormContainer>
        <Register />
        <TestLogin />
      </MainWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  ${flexRowCenter};
  gap: 20px;

  @media (max-width: 750px) {
    flex-direction: column;
  }

  @media (max-width: 350px) {
    font-size: 0.8rem;
  }
`;

const Logo = styled.img`
  width: 175px;
  height: 60px;

  margin-bottom: 36px;
`;

const FormContainer = styled.div`
  width: 350px;
  padding: 36px;
  border: 1px solid #dbdbdb;
  ${flexColumnCenter}

  @media (max-width: 550px) {
    width: 80%;
  }

  @media (max-width: 350px) {
    width: 90%;
  }
`;

const MainWrapper = styled.div`
  ${flexColumnCenter}

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ForgotPass = styled.p`
  margin-top: 12px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Error = styled.p`
  margin-top: 12px;
  font-size: 1rem;
  color: #ee2e3e;
`;

export default Login;
