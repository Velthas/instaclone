import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupForm from '../forms/SignupForm.js';

const Signup = () => {
  const [error, setError] = useState(null);
  const displayError = (msg) => setError(msg);

  return (
    <div>
      <h1>Instagram</h1>
      <SignupForm displayError={displayError} />
      { error && 
        <p>{error}</p>
      }
      <p>Have an account? <Link to="/auth">Log in</Link></p>
  </div>
  )
};

export default Signup;