import React from "react";
import PropTypes from "prop-types";
import Input from "../inputs/Input";
import { validateMail, validatePsw, validateUsername, validateName } from "../../utils/validation";

const SignupForm = ({displayError}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    displayError('');

    const allInputs = Array.from(document.querySelectorAll('#signup input')).map(input => input.value);
    const [mail, psw, usname, fullname] = allInputs
    const isMailValid = validateMail(mail);
    const isPswValid = validatePsw(psw);
    const isUsernameValid = validateUsername(usname);
    const isNameValid = validateName(fullname);

    switch(true) {
      case isMailValid !== true:
        displayError(isMailValid);
        return;
      case isPswValid !== true:
        displayError(isPswValid);
        return;
      case isUsernameValid !== true:
        displayError(isUsernameValid);
        return;
      case isNameValid !== true:
        displayError(isNameValid);
        return;
      default: return;
    };
  };

  return (
    <form id="signup">
      <Input id="mailreg" type="text" placeholder="Email" />
      <Input id="passreg" type="password" placeholder="Password" />
      <Input id="username" type="text" placeholder="Username" />
      <Input id="fullname" type="text" placeholder="Full Name" />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Sign up
      </button>
    </form>
  )
}

SignupForm.propTypes = {
  displayError: PropTypes.func.isRequired,
};

export default SignupForm;
