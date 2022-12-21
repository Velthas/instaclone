import React, { useEffect } from "react";
import Userbar from "./sections/Nav";
import Main from "./sections/Main";
import { useNavigate } from "react-router-dom";

const Instaclone = ({user}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) navigate('/auth');
  }, [user]);

  return (
    <>
      <Userbar />
      <Main />
    </>
  );
};

export default Instaclone;
