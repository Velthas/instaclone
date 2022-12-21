import React, { useEffect } from "react";
import Main from "./sections/Main";
import { useNavigate } from "react-router-dom";
import Nav from "./sections/Nav";

const Instaclone = ({user}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) navigate('/auth');
  }, [user]);

  return (
    <>
      <Nav user={user} />
      <Main />
    </>
  );
};

export default Instaclone;
