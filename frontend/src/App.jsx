import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Products from "./components/Products";

import { Toaster } from "react-hot-toast";
import Login from "./pages/login";

import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
