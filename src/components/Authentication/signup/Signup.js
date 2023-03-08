import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { flexColumnCenter } from "../../../styles/style.js";

import instalogo from "../../../assets/logo/instalogo.png";
import SignupForm from "../../forms/SignupForm";
import GoLogin from "./GoLogin";
import FacebookButton from "./FacebookButton";
import Separator from "./Separator";

const Signup = ({ setUser }) => {
  const [error, setError] = useState(null);
  const displayError = (msg) => setError(msg);

  return (
    <Container>
      <FormWrapper>
        <Logo src={instalogo} alt="Instagram Logo" />
        <Info>Sign up to see the photos and videos of your friends.</Info>
        <FacebookButton />
        <Separator />
        <SignupForm setUser={setUser} displayError={displayError} />
        {error && <Error>{error}</Error>}
      </FormWrapper>
      <GoLogin />
    </Container>
  );
};

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  ${flexColumnCenter}
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 350px;
  padding: 36px;
  margin-top: 36px;
  border: 1px solid #dbdbdb;
  ${flexColumnCenter}

  @media (max-width: 550px) {
    width: 80%;
  }

  @media (max-width: 350px) {
    width: 90%;
  }
`;

const Logo = styled.img`
  width: 175px;
  height: 60px;

  margin-bottom: 10px;
`;

const Info = styled.span`
  width: 100%;
  text-align: center;
  color: #8e8e8e;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 10px 0;
`;

const Error = styled.p`
  margin-top: 12px;
  font-size: 1rem;
  color: #ee2e3e;
`;

export default Signup;
