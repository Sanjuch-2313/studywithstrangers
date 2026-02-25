import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  
  const [showIntro, setShowIntro] = useState(false);

useEffect(() => {
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  const navType = navigationEntry?.type;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlow =
    connection &&
    (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g");

  // ✅ Case 1: Page Refresh → Animate once (zoom out)
  if (navType === "reload") {
    setShowIntro(true);

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }

  // ✅ Case 2: Slow Internet → Pulse until fully loaded
  if (isSlow) {
    setShowIntro(true);

    const handleLoad = () => {
      setShowIntro(false);
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }

  // ❌ Case 3: Normal navigation (like login → dashboard)
  // Do nothing (no animation)

}, []);

  return (
    <>
      {/* 🔥 Intro Animation Overlay */}
      {showIntro && (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-[999]">
    <img
      src={logo}
      alt="logo intro"
      className={`w-40 md:w-60 ${
        performance.getEntriesByType("navigation")[0]?.type === "reload"
          ? "animate-zoomOut"
          : "animate-pulseSlow"
      }`}
    />
  </div>
)}

      <nav
        className="fixed top-0 left-0 w-full z-50 
        bg-gradient-to-b from-black/60 to-transparent 
        backdrop-blur-md
        px-8 py-4 flex justify-between items-center text-white"
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="StudyWithStrangers Logo"
            className="h-20 w-auto object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
    </>
  );
};

export default Navbar;