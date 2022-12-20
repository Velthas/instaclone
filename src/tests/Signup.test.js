import React from "react";
import Signup from "../components/authentication/Signup";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Signup", () => {
  it("displays content correctly", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const nameInput = screen.getByPlaceholderText(/full name/i);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const signupButton = screen.getByText(/sign up/i);

    expect(mailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it("displays error message when full name is in wrong format", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const nameInput = screen.getByPlaceholderText(/full name/i);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const signupButton = screen.getByText(/sign up/i);

    fireEvent.change(mailInput, { target: { value: "iamanemail@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Iamavalidps1" } });
    fireEvent.change(nameInput, { target: { value: "2123dami dodo" } });
    fireEvent.change(usernameInput, { target: { value: "heythere" } });
    userEvent.click(signupButton);


    const nameError = screen.getByText(/name can only hold latin alphabet characters/i);
    expect(nameError).toBeInTheDocument();
  });

  it("displays error message when username is in wrong format", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const nameInput = screen.getByPlaceholderText(/full name/i);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const signupButton = screen.getByText(/sign up/i);

    fireEvent.change(mailInput, { target: { value: "iamanemail@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Iamavalidps1" } });
    fireEvent.change(nameInput, { target: { value: "Dami Domi" } });
    fireEvent.change(usernameInput, { target: { value: "﷽﷽﷽﷽﷽﷽12" } });
    userEvent.click(signupButton);

    const usernameError = screen.getByText(
      /username must start with a letter and have at least 3 to 15 characters/i
    );
    expect(usernameError).toBeInTheDocument();
  });

  it("display error message when username is already taken", () => {
    //TODO
  });
});
