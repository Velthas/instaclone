import React, { useEffect } from "react";
import Userbar from "./sections/Nav";
import Main from "./sections/Main";
import { redirect } from "react-router-dom";

const Instaclone = ({user}) => {
  useEffect(() => {
    if (user === null) redirect('/auth');
  }, [user]);

  return (
    <>
      <Userbar />
      <Main />
    </>
  );
};

export default Instaclone;
