import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Authentication = ({setUser}) => {
  return (
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
  )
};

export default Authentication;
