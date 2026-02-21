import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful 🎉");

        // Save user data if needed
        localStorage.setItem("userId", data.userId);

        // Redirect to dashboard (change route later)
        navigate("/dashboard");

      } else {
        setMessage(data.message || "Invalid credentials");
      }

    } catch (error) {
      setMessage("Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Study With Strangers
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">
            Stay consistent.  
            Stay accountable.  
            Build discipline through focused study rooms.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-10">

        <div className="w-full max-w-md flex flex-col gap-6">

          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Login to continue your journey
            </p>
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`py-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-sm text-gray-600">{message}</p>
          )}

          {/* Redirect to Signup */}
          <p className="text-sm text-gray-500 text-center">
            Not registered yet?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-slate-800 font-medium cursor-pointer hover:underline"
            >
              Register now
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}