import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    primaryCategory: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Send formData to backend API
    console.log("Signing up user:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="bg-[#e3edf7] p-10 rounded-2xl shadow-md w-96 flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="primaryCategory"
          placeholder="Primary Category (optional)"
          value={formData.primaryCategory}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}