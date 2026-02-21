import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">StudyWithStrangers</h2>
          <p className="text-gray-400 text-sm">
            A platform where students connect, collaborate,
            and prepare together for competitive exams.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Rooms</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <p className="text-gray-400 text-sm">
            Coming soon 🚀
          </p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} StudyWithStrangers. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;