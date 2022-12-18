import Authentication from "./components/authentication/Authentication";
import LoginForm from "./components/forms/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>bro</div>} />
        <Route path="/auth/*" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
