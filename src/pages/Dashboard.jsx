import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import introVideo from "../assets/videos/intro.mp4";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">

        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={introVideo}
          autoPlay
          loop
          muted
        />

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Study With Strangers
          </h1>

          <p className="text-lg md:text-xl max-w-2xl">
            Connect. Collaborate. Conquer Exams Together.
          </p>

        </div>
      </div>

      {/* Other Content Section */}
      <div
        id="explore"
        className="bg-white py-20 text-center px-6"
      >
        <h2 className="text-3xl font-bold mb-4">
          Explore Study Rooms
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join live discussions and boost your preparation.
        </p>
      </div>

      <Footer />

    </div>
  );
};

export default Dashboard;