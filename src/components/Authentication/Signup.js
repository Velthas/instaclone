import React, { useState } from "react";
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
      <p>Have an account? <a href="#">Log in</a></p>
  </div>
  )
}

export default Signup;