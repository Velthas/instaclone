import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { validateMail, validatePsw } from "../../utils/validation";
import { flexRowCenter } from "../../styles/style";
import { loginUser } from "../../firebase/authentication";
import { redirect } from "react-router-dom";

import InterInput from "../inputs/InterInput";


const LoginForm = ({displayError}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    displayError('');
    const mail = document.querySelector('#mail').value;
    const psw = document.querySelector('#pass').value;

    const isMailValid = validateMail(mail);
    const isPswValid = validatePsw(psw);

    switch(true) {
      case isMailValid !== true:
        displayError(isMailValid);
        return;
      case isPswValid !== true:
        displayError(isPswValid);
        return;
      default:
        loginUser(mail, psw);
        redirect('/');
    };
  };

  return (
    <Form id="login">
      <InterInput id='mail' type='text' label='E-mail' checkValid={validateMail} />
      <InterInput id="pass" type="password" label="Password" checkValid={validatePsw} />
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Log in
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  displayError: PropTypes.func.isRequired,
};

const Form = styled.form`
  width: 100%;
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

export default LoginForm;
