import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white bg-transparent">
      
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">
          SWS
        </div>
        <h1 className="text-xl font-bold">
          StudyWithStrangers
        </h1>
      </div>

      {/* Right Section */}
      <div className="space-x-6 font-medium hidden md:flex">
        <button className="hover:text-blue-400 transition">
          Rooms
        </button>
        <button className="hover:text-blue-400 transition">
          Profile
        </button>
        <button className="hover:text-blue-400 transition">
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;