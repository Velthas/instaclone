import React from "react";
import Login from "../components/authentication/Login.js";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  it("renders content correctly", () => {
    render(
    <MemoryRouter>
      <Login setUser={jest.fn} />
    </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/log in/i);
    const signUpLink = screen.getByRole("link");

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

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(mailInput, {
      target: { value: "exampleemail@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "fakepassword" } });

    expect(mailInput.value).toBe("exampleemail@gmail.com");
    expect(passwordInput.value).toBe("fakepassword");
  });

  it("displays message if user email does not match format", () => {
    render(
      <MemoryRouter>
        <Login setUser={jest.fn}/>
      </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(mailInput, { target: { value: "iamnotanemail" } });
    const submitButton = screen.getByText(/log in/i);
    userEvent.click(submitButton);
    const mailError = screen.getByText(/please input a valid email/i);

    expect(mailError).toBeInTheDocument();
  });

  it("displays error message if user password does not match format", () => {
    render(
      <MemoryRouter>
        <Login setUser={jest.fn}/>
      </MemoryRouter> );

    const mailInput = screen.getByPlaceholderText(/email/i);
    const pswInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(mailInput, { target: { value: "iamanemail@mail.com" } });
    fireEvent.change(pswInput, { target: { value: "invalidpsw" } });
    userEvent.click(screen.getByText(/log in/i));
    const pswError = screen.getByText(
      /passwords must have at least 8 characters, one letter and one number/i
    );

    expect(pswError).toBeInTheDocument();
  });
});
