import React from "react";
import PropTypes from "prop-types";
import Input from "../inputs/Input";

const LoginForm = ({validateMail, validatePsw, displayError}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    displayError('');
    const mail = document.querySelector('#mail').value;
    const psw = document.querySelector('#pass').value;

    const isMailValid = validateMail(mail);
    const isPswValid = validatePsw(psw);

    if(isMailValid !== true) displayError(isMailValid);
    if(isPswValid !== true) displayError(isPswValid);
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
  validateMail: PropTypes.func.isRequired,
  validatePsw: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,
};

export default LoginForm;
