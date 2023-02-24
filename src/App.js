import React, { useEffect, useState } from "react";
import Authentication from "./components/authentication/Authentication";
import Instaclone from "./components/instaclone/Instaclone";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/shared.css';
import { authenticationListener } from "./firebase/authentication";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = authenticationListener(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Instaclone user={user} />} />
        <Route path="/auth/*" element={<Authentication user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
