import React, { useState } from "react";
import { Bell, Flame } from "lucide-react";

const FocusArenaDashboard = () => {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [formData, setFormData] = useState({
    exam: "",
    goal: "",
    hours: "",
  });

  const arenas = [
    { name: "JEE Power Hour", exam: "JEE", live: 128 },
    { name: "NEET Deep Focus", exam: "NEET", live: 94 },
    { name: "UPSC 3hr Grind", exam: "UPSC", live: 56 },
    { name: "GATE Marathon", exam: "GATE", live: 73 },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSurveyCompleted(true);
  };

  if (!surveyCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] to-[#141b3a] flex items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to <span className="text-purple-400">Focus Arena</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                1. Which exam are you preparing for?
              </label>
              <select
                name="exam"
                onChange={handleChange}
                required
                className="w-full bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Exam</option>
                <option>JEE</option>
                <option>NEET</option>
                <option>UPSC</option>
                <option>GATE</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                2. What is your target goal?
              </label>
              <input
                type="text"
                name="goal"
                placeholder="AIR under 1000 / Top Medical College..."
                onChange={handleChange}
                required
                className="w-full bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                3. Daily target study hours?
              </label>
              <input
                type="number"
                name="hours"
                placeholder="e.g. 6"
                onChange={handleChange}
                required
                className="w-full bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition duration-300 shadow-lg shadow-purple-500/40"
            >
              Enter Focus Arena
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] to-[#141b3a] text-white px-8 py-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold tracking-wide text-purple-400">
          Focus Arena
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Flame size={18} className="text-orange-400" />
            <span>12 Day Streak</span>
          </div>
          <Bell className="cursor-pointer hover:text-purple-400 transition" />
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome back, Champion</h2>
        <p className="text-gray-300 mb-4">Discipline today. Rank tomorrow.</p>
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>Daily Goal Progress</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div className="bg-purple-500 h-3 rounded-full w-3/5 shadow-lg shadow-purple-500/40"></div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6">Active Focus Arenas</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {arenas.map((arena, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-2xl hover:shadow-purple-500/40 hover:shadow-lg transition-all duration-300"
          >
            <h4 className="text-xl font-semibold mb-2">{arena.name}</h4>
            <p className="text-gray-400 text-sm mb-1">Exam: {arena.exam}</p>
            <p className="text-gray-400 text-sm mb-4">{arena.live} students live</p>
            <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition shadow-md shadow-purple-500/40">
              Join Arena
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusArenaDashboard;