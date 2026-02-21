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
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }

    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Study With Strangers
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">
            Build discipline.  
            Stay accountable.  
            Achieve your goals with structured focus.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-10">

        <div className="w-full max-w-md flex flex-col gap-6">

          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Start your focused journey
            </p>
          </div>

          {/* Google Button */}
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-200"></div>
            OR
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          />

          <select
            name="primaryCategory"
            value={formData.primaryCategory}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
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
            className={`py-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-slate-800 text-white hover:bg-slate-900"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-sm text-gray-600">{message}</p>
          )}

          {/* Already Registered Section */}
          <p className="text-sm text-gray-500 text-center">
            Already registered?{" "}
            <span
              onClick={() => navigate("/Login")}
              className="text-slate-800 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}