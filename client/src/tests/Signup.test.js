import React from "react";
import Signup from "../components/authentication/signup/Signup";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as fs from "../firebase/firestore";
import * as fa from "../firebase/authentication";

describe("Signup", () => {
  it("displays content correctly", async () => {
    render(
      <MemoryRouter>
        <Signup setUser={jest.fn()}/>
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const nameInput = screen.getByLabelText(/full name/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const signupButton = screen.getAllByRole('button')[1];

    expect(mailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it("displays error message when full name is in wrong format", async () => {
    fs.doesUserExist = jest.fn().mockReturnValue(false);
    fs.createUserBucket = jest.fn();
    fa.createUser = jest.fn();

    render(
      <MemoryRouter>
        <Signup setUser={jest.fn()} />
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const nameInput = screen.getByLabelText(/full name/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const signupButton = screen.getAllByRole('button')[1];

    userEvent.type(mailInput,"iamanemail@gmail.com");
    userEvent.type(passwordInput, "Iamavalidps1");
    userEvent.type(nameInput, "2123dami dodo");
    userEvent.type(usernameInput, "heythere");
    userEvent.click(signupButton);

    const nameError = await screen.findByText(/name can only hold latin alphabet characters/i);
    expect(nameError).toBeInTheDocument();
  });

  it("displays error message when username is in wrong format", async () => {
    fs.doesUserExist = jest.fn().mockReturnValue(false);
    fs.createUserBucket = jest.fn();
    fa.createUser = jest.fn();
    render(
      <MemoryRouter>
        <Signup setUser={jest.fn()}/>
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const nameInput = screen.getByLabelText(/full name/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const signupButton = screen.getAllByRole('button')[1];

    userEvent.type(mailInput, "iamanemail@gmail.com");
    userEvent.type(passwordInput, "Iamavalidps1");
    userEvent.type(nameInput, "Dami Domi");
    userEvent.type(usernameInput, "﷽﷽﷽﷽﷽﷽12");
    userEvent.click(signupButton);

    const usernameError = await screen.findByText(
      /username must start with a letter and have at least 3 to 15 characters/i
    );
    expect(usernameError).toBeInTheDocument();
  });

  it("display error message when username is already taken", () => {
    //TODO
  });
});
