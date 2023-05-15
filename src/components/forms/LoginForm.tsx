import React from "react";
import styled from "styled-components";
import { validateMail, validatePsw } from "../../utils/validation";
import { flexRowCenter } from "../../styles/style";
import { loginUser } from "../../firebase/authentication";
import { redirect } from "react-router-dom";

import InterInput from "../inputs/InterInput";

type Props = {
  displayError: (message: string) => void;
};

const LoginForm = ({ displayError }: Props) => {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    displayError("");
    const mailInput = document.querySelector<HTMLInputElement>("#mail");
    const pswInput = document.querySelector<HTMLInputElement>("#pass");
    if (!(mailInput && pswInput)) return;
    const mail = mailInput.value;
    const psw = pswInput.value;

    const isMailValid = validateMail(mail);
    const isPswValid = validatePsw(psw);

    switch (true) {
      case isMailValid !== true:
        if (typeof isMailValid === "string") displayError(isMailValid);
        return;
      case isPswValid !== true:
        if (typeof isPswValid === "string") displayError(isPswValid);
        return;
      default:
        const error = await loginUser(mail, psw);
        if (error) displayError(`Login failed with code: ${error.code}`);
        else redirect("/");
    }
  };

  return (
    <Form id="login">
      <InterInput
        id="mail"
        type="text"
        label="Email"
        checkValid={validateMail}
      />
      <InterInput
        id="pass"
        type="password"
        label="Password"
        checkValid={validatePsw}
      />
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Log in
      </Button>
    </Form>
  );
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
