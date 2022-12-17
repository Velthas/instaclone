import React from 'react';
import Login from '../components/Login.js'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login', () => {
  it('renders content correctly', () => {
    render(<Login />)

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signUpLink = screen.getByRole('link');

    expect(mailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
  
  it('text inputs register user inputs', () => {
    render(<Login />)

    const mailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(mailInput, {target: {value: 'exampleemail@gmail.com'}});
    fireEvent.change(passwordInput, {target: {value: 'fakepassword'}});

    expect(mailInput.value).toBe('exampleemail@gmail.com');
    expect(passwordInput.value).toBe('fakepassword');
  });

  it('displays message if user data is incorrect', () => {
    render(<Login />)

    const mailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(mailInput, {target: {value: 'iamnotanemail'}});
    const errorMsg = screen.getByText(/please input a valid email/i);

    expect(errorMsg).toBeInTheDocument();
  })
});
