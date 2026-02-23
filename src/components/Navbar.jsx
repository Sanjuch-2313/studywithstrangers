import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 
    bg-gradient-to-b from-black/60 to-transparent 
    backdrop-blur-md
    px-8 py-4 flex justify-between items-center text-white">

      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
  src={logo}
  alt="StudyWithStrangers Logo"
  className="h-10 w-auto object-contain"
/>
        <h1 className="text-xl font-bold tracking-wide">
          StudyWithStrangers
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="space-x-6 hidden md:flex items-center">
        
        <Link
          to="/login"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-white/20 backdrop-blur-md border border-white/30 
          px-5 py-2 rounded-lg font-medium 
          transition duration-300 hover:bg-white/30"
        >
          Sign Up
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;