import { useEffect, useState } from "react";
import Authentication from "./components/authentication/Authentication";
import Instaclone from "./components/instaclone/Instaclone";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authenticationListener } from "./firebase/authentication";
import { FirebaseUser } from "./utils/types";
import "./styles/shared.css";

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    //TODO Remove this eventually
    const tryCall = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/hi"
        );
        console.log(response);
        const data = await response.json();
        console.log({ data, response });
      } catch (err) {
        console.log(err);
      }
    };
    tryCall();
    const unsubscribe = authenticationListener(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Instaclone user={user} />} />
        <Route
          path="/auth/*"
          element={<Authentication user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
