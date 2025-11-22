import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Products from "./components/Products";

import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import DashBoard from "./components/DashBoard";
import StockPage from "./pages/Stock";
import MoveHistory from "./pages/History";

import Register from "./pages/Register";
import ReceiptPage from "./pages/ReceiptPage";
import DeliveryPage from "./pages/DeliveryPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/history" element={<MoveHistory />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
