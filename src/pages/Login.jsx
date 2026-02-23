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
      const response = await fetch("http://127.0.0.1:5005/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isSurveyCompleted", data.isSurveyCompleted);

      navigate("/user-dashboard");

    } catch (error) {
      setMessage("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] animate-gradient flex items-center justify-center">
      {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 z-20 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition"
    >
      ← Back
    </button>

      

        {/* BIG BACKGROUND TEXT */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h1 className="text-[100px] md:text-[160px] font-bold tracking-wider text-white opacity-15">
      StudyWithStrangers
    </h1>
  </div>
      {/* Glass Card */}
      <div className="relative z-10 w-[95%] max-w-md backdrop-blur-2xl bg-white/10 border border-white/30 rounded-3xl p-10 shadow-2xl text-white transition-transform duration-500 hover:scale-[1.02]">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Login to continue your journey
          </p>
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/20 border border-white/30 p-3 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/20 border border-white/30 p-3 rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-medium transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="text-sm text-red-300 mt-4 text-center">
            {message}
          </p>
        )}

        <p className="text-sm text-gray-300 mt-6 text-center">
          Not registered yet?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-medium cursor-pointer hover:underline"
          >
            Register now
          </span>
        </p>
      </div>
    </div>
  );
}