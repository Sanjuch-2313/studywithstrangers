import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import introVideo from "../assets/videos/intro.mp4";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const rooms = [
  {
    name: "JEE",
    image: "https://images.unsplash.com/photo-1581091870627-3b5de0f3b3a6"
  },
  {
    name: "NEET UG",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
  },
  {
    name: "NEET PG",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67"
  },
  {
    name: "GATE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    name: "Competitive Exams",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    name: "Coding",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
  },
  {
    name: "Designing",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    name: "Startups",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRoomClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">

        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={introVideo}
          autoPlay
          loop
          muted
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Study With Strangers
          </h1>

          <p className="text-lg md:text-xl max-w-2xl">
            Connect. Collaborate. Conquer Exams Together.
          </p>
        </div>
      </div>

      {/* Explore Section */}
      <div id="explore" className="bg-white py-20 text-center px-6">

        <h2 className="text-3xl font-bold mb-4">
          Explore Study Rooms
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Join live discussions and boost your preparation.
        </p>

        {/* Auto Carousel */}
        <div className="max-w-4xl mx-auto">

  <Swiper
  modules={[Autoplay, Pagination]}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false
  }}
  pagination={{
    clickable: true,
    el: ".custom-pagination"
  }}
  className="room-swiper"
>
  {rooms.map((room, index) => (
    <SwiperSlide key={index}>
      <div
        onClick={handleRoomClick}
        className="relative cursor-pointer 
        h-[230px] md:h-[280px] 
        rounded-3xl overflow-hidden shadow-2xl"
      >
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            {room.name}
          </h3>

          <p className="text-lg opacity-90">
            Join discussions with students preparing for {room.name}.
          </p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

{/* 👇 Add this right below Swiper */}
<div className="custom-pagination mt-6 flex justify-center"></div>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Dashboard;