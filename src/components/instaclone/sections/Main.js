import React from "react";
import { Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<div> this is the homepage </div>} />
      <Route path="profile/:username" element={<div> this is a profile page </div>} />
      <Route path="posts/:postid" element={<div> this is a post page </div>} />
    </Routes>
  )
}

export default Main;