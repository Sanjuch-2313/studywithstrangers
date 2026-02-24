import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async () => {
    const response = await fetch("http://127.0.0.1:5005/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Verified successfully!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}