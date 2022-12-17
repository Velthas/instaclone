import React from "react";
import Login from "./Login";

const Authentication = () => {
  const validateMail = (mail) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!regex.test(mail)) return 'Please input a valid email';
    return true; // returns true if mail is valid, errormsg otherwise
  };

  const validatePsw = (psw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!regex.test(psw)) return 'Passwords must have at least 8 characters, one letter and one number';
    return true; // returns true if psw id valid, errormsg otherwise
  }

  return (
    <>
      <Login validateMail={validateMail} validatePsw={validatePsw} />
    </>
  )
};

export default Authentication;
