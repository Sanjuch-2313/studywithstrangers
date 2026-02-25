import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/Userdashboard";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
    </Routes>
  );
}

export default App;