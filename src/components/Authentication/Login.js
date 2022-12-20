import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import LoginForm from "../forms/LoginForm";

//TODO: REPLACE H1 WITH INSTAGRAM PICTURE
const Login = ({setUser}) => {
  const [error, setError] = useState(null)
  const displayError = (msg) => setError(msg);

  return (
    <div>
      <h1>Instagram</h1>
      <LoginForm displayError={displayError} setUser={setUser} />
      { error && 
        <p>{error}</p>
      }
      <p>Don't have an account? <Link to="/auth/signup">Sign Up</Link></p>
    </div>
  )
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
