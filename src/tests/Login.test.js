import React from 'react';
import Login from '../components/Authentication/Login.js'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Login', () => {
  it('renders content correctly', () => {
    const mock = jest.fn()
    render(<Login validateMail={mock} validatePsw={mock} />)

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/log in/i);
    const signUpLink = screen.getByRole('link');

    expect(mailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
  
  it('text inputs register user inputs', () => {
    const mock = jest.fn()
    render(<Login validateMail={mock} validatePsw={mock} />)

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(mailInput, {target: {value: 'exampleemail@gmail.com'}});
    fireEvent.change(passwordInput, {target: {value: 'fakepassword'}});

    expect(mailInput.value).toBe('exampleemail@gmail.com');
    expect(passwordInput.value).toBe('fakepassword');
  });

  it('displays message if user email does not match format', () => {
    const mailMock = jest.fn((mail) => {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!regex.test(mail)) return 'Please input a valid email';
      return true;
    });
    const pswMock = jest.fn(() => true);
    render(<Login validateMail={mailMock} validatePsw={pswMock} />);

    const mailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(mailInput, {target: {value: 'iamnotanemail'}});
    const submitButton = screen.getByText(/log in/i);
    userEvent.click(submitButton);
    const mailError = screen.getByText(/please input a valid email/i);

    expect(mailError).toBeInTheDocument();
    expect(mailMock).toHaveBeenCalledTimes(1);
  });

  it('displays error message if user password does not match format', () => {
    const mailMock = jest.fn(() => true);
    const pswMock = jest.fn((psw) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if(!regex.test(psw)) return 'Passwords must have at least 8 characters, one letter and one number';
      return true;
    });
    render(<Login validateMail={mailMock} validatePsw={pswMock} />);

    const pswInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(pswInput, {target: {value: 'invalidpsw'}});
    const submitButton = screen.getByText(/log in/i);
    userEvent.click(submitButton);
    const pswError = screen.getByText(/passwords must have at least 8 characters, one letter and one number/i);

    expect(pswError).toBeInTheDocument();
    expect(pswMock).toHaveBeenCalledTimes(1);
  });
});
