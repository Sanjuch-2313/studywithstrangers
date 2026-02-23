import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    primaryCategory: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5005/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully 🎉");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden">
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

  {/* GLASS FORM */}
  <div className="relative z-10 w-[95%] max-w-md bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

    <div className="text-center mb-6">
      <h2 className="text-3xl font-semibold">
        Create Account
      </h2>
      <p className="text-sm text-gray-300 mt-1">
        Start your focused journey
      </p>
    </div>

    

        {/* Google Button */}
<div className="mt-6">
  <button className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/30 py-3 rounded-xl text-white font-medium transition hover:bg-white/20 hover:shadow-lg hover:shadow-indigo-500/20">
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="google"
      className="w-5 h-5"
    />
    <span className="tracking-wide">
      Continue with Google
    </span>
  </button>
</div>

{/* OR Divider */}
<div className="flex items-center gap-4 text-gray-300 text-xs uppercase tracking-widest my-6">
  <div className="flex-1 h-px bg-white/20"></div>
  <span className="opacity-70">OR</span>
  <div className="flex-1 h-px bg-white/20"></div>
</div>

        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 bg-white/20 border border-white/30 p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 bg-white/20 border border-white/30 p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="mt-4 w-full bg-white/20 border border-white/30 p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          className="mt-4 w-full bg-white/20 border border-white/30 p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          name="primaryCategory"
          value={formData.primaryCategory}
          onChange={handleChange}
          className="mt-4 w-full bg-white/20 border border-white/30 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Your Focus Area</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="UPSC">UPSC</option>
          <option value="GATE">GATE</option>
          <option value="CODING">Coding</option>
          <option value="STARTUP">Startup</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-red-300">
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-300 mt-6">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}