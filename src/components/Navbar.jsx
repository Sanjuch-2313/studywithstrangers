import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white">
      
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">
          SWS
        </div>
        <h1 className="text-xl font-bold">
          StudyWithStrangers
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="space-x-6 hidden md:flex items-center">
        {/* Login using React Router */}
        <Link
          to="/login"
          className="text-white hover:text-gray-300 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-lg font-medium transition hover:bg-white/30"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;