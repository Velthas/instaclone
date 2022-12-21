import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Login from "./Login";
import Signup from "./Signup";

const Authentication = ({user, setUser}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(user) navigate('/');
  }, [user]);
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup setUser={setUser} />} />
      </Routes>
  )
};

export default Authentication;
