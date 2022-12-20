import React, { useState } from "react";
import Authentication from "./components/authentication/Authentication";
import Instaclone from "./components/instaclone/Instaclone";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/shared.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Instaclone user />} />
        <Route path="/auth/*" element={<Authentication setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
