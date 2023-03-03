import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import InterInput from "../inputs/InterInput";
import { validateMail, validatePsw, validateUsername, validateName } from "../../utils/validation";
import { createUser } from "../../firebase/authentication";
import { createUserBucket, doesUserExist } from "../../firebase/firestore";
import { flexRowCenter } from "../../styles/style";

const SignupForm = ({ displayError, setUser }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    displayError(null);

    const allInputs = Array.from(
      document.querySelectorAll("#signup input")
    ).map((input) => input.value);
    const [mail, fullname, usname, psw] = allInputs;
    const isMailValid = validateMail(mail);
    const isPswValid = validatePsw(psw);
    const isUsernameValid = validateUsername(usname);
    const isUsernameTaken = await doesUserExist(usname);
    const isNameValid = validateName(fullname);

    switch (true) {
      case isMailValid !== true:
        displayError(isMailValid);
        return;
      case isPswValid !== true:
        displayError(isPswValid);
        return;
      case isNameValid !== true:
        displayError(isNameValid);
        return;
      case isUsernameValid !== true:
        displayError(isUsernameValid);
        return;
      case isUsernameTaken !== false:
        displayError("Username already taken");
        return;
      default:
        await createUser(mail, psw, usname, setUser);
        createUserBucket(fullname, usname);
    }
  };

  return (
    <Form id="signup">
      <InterInput id="mailreg" type="text" label="Email" checkValid={validateMail} />
      <InterInput id="fullname" type="text" label="Full name" checkValid={validateName} />
      <InterInput id="username" type="text" label="Username" checkValid={validateUsername} />
      <InterInput id="passreg" type="password" label="Password" checkValid={validatePsw} />
      <Para>
        Hi! My name is Damiano, my coding alias is Velthas, and this is my clone
        of Instagram.{" "}
      </Para>
      <Para>
        This project was made for educational purposes, not the real thing. Even
        though firebase's authentication is safe, please do not put any relevant
        information in here, nor use your real-life passwords. Thank you and
        enjoy!{" "}
      </Para>
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Sign up
      </Button>
    </Form>
  );
};

SignupForm.propTypes = {
  displayError: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const Form = styled.form`
  width: 100%;
`;

const Para = styled.p`
  font-size: 0.7rem;
  color: #8e8e8e;
  margin: 10px 0;
  text-align: center;
`;

const Button = styled.button`
  ${flexRowCenter};
  width: 100%;
  height: 32px;
  margin-top: 20px;
  padding: 7px 16px;
  border: none;
  border-radius: 10px;

  cursor: pointer;
  background-color: #0095f6;
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: #1877f2;
  }
`;

export default SignupForm;
