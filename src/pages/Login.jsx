import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-md w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input
          type="text"
          placeholder="Email or Phone"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="button"
          className="bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}