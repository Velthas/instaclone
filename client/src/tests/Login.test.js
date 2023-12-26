import React from "react";
import Login from "../components/authentication/login/Login.js";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  it("renders content correctly", () => {
    render(
    <MemoryRouter>
      <Login setUser={jest.fn} />
    </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', {name: /Log in/});
    const [signUpLink] = screen.getAllByRole("link");

    expect(mailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it("text inputs register user inputs", () => {
    render(
      <MemoryRouter>
        <Login setUser={jest.fn}/>
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(mailInput, "exampleemail@gmail.com");
    userEvent.type(passwordInput, "fakepassword");

    expect(mailInput.value).toBe("exampleemail@gmail.com");
    expect(passwordInput.value).toBe("fakepassword");
  });

  it("displays message if user email does not match format", async () => {
    render(
      <MemoryRouter>
        <Login setUser={jest.fn}/>
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    userEvent.type(mailInput, "iamnotanemail");
    const loginButton = screen.getByRole('button', {name: /Log in/});
    userEvent.click(loginButton);
    const mailError = await screen.findByText(/please input a valid email/i);

    expect(mailError).toBeInTheDocument();
  });

  it("displays error message if user password does not match format", async () => {
    render(
      <MemoryRouter>
        <Login setUser={jest.fn}/>
      </MemoryRouter> );

    const mailInput = screen.getByLabelText(/email/i);
    const pswInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', {name: 'Log in'});
    userEvent.type(mailInput, "iamanemail@mail.com");
    userEvent.type(pswInput, "invalidpsw");
    userEvent.click(loginButton);
    const pswError = await screen.findByText(
      /passwords must have at least 8 characters, one letter and one number/i
    );

    expect(pswError).toBeInTheDocument();
  });
});
