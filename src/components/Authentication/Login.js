import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "../Forms/LoginForm";

//TODO: REPLACE H1 WITH INSTAGRAM PICTURE
const Login = ({validateMail, validatePsw}) => {
  const [error, setError] = useState(null)
  const displayError = (msg) => setError(msg);

  return (
    <div>
      <h1>Instagram</h1>
      <LoginForm
        validateMail={validateMail}
        validatePsw={validatePsw}
        displayError={displayError}
      />
      { error && 
        <p>{error}</p>
      }
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  )
}

Login.propTypes = {
  validateMail: PropTypes.func.isRequired,
  validatePsw: PropTypes.func.isRequired,
}

export default Login;
