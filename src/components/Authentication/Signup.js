import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import SignupForm from '../forms/SignupForm.js';

const Signup = ({setUser}) => {
  const [error, setError] = useState(null);
  const displayError = (msg) => setError(msg);

  return (
    <div>
      <h1>Instagram</h1>
      <SignupForm setUser={setUser} displayError={displayError} />
      { error && 
        <p>{error}</p>
      }
      <p>Have an account? <Link to="/auth">Log in</Link></p>
  </div>
  )
};

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signup;