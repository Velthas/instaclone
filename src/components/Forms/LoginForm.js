import React from "react";
import PropTypes from "prop-types";
import Input from "../inputs/Input";
import { validateMail, validatePsw } from "../../utils/validation";
import { loginUser } from "../../firebase/authentication";
import { redirect } from "react-router-dom";

const LoginForm = ({displayError, setUser}) => {
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
        setUser(true);
        redirect('/');
    };
  };

  return (
    <form id="login">
      <Input id="mail" type="text" placeholder="Email" />
      <Input id="pass" type="password" placeholder="Password" />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Log in
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  displayError: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
