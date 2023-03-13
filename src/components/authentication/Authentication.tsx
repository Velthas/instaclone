import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import { FirebaseUser } from "../../utils/types";

type Props = {
  user: FirebaseUser | null,
  setUser: (authUser: FirebaseUser | null) => void, 
};

const Authentication = ({ user, setUser }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup setUser={setUser} />} />
    </Routes>
  );
};

export default Authentication;
