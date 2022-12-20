import React, { useState } from "react";
import Authentication from "./components/authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>bro</div>} />
        <Route path="/auth/*" element={<Authentication setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
