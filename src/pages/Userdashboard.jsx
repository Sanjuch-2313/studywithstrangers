import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaFire, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const surveyStatus = localStorage.getItem("isSurveyCompleted") === "true";

  const [step, setStep] = useState(1);
  const [showSurvey, setShowSurvey] = useState(!surveyStatus);

  const [primaryCategory, setPrimaryCategory] = useState("");
  const [dailyTargetHours, setDailyTargetHours] = useState("");
  const [goal, setGoal] = useState("");

  const [showIntroAnimation, setShowIntroAnimation] = useState(false);

  const totalSteps = 3;

  const navigate = useNavigate();
const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Animation Controller
  useEffect(() => {
    if (!showSurvey) {
      setShowIntroAnimation(true);

      const timer = setTimeout(() => {
        setShowIntroAnimation(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSurvey]);

  const nextStep = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      try {
        const userId = localStorage.getItem("userId");

        await fetch(
          `http://127.0.0.1:5005/api/auth/complete-survey/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              primaryCategory,
              dailyTargetHours,
              goal,
            }),
          }
        );

        localStorage.setItem("isSurveyCompleted", "true");
        setShowSurvey(false); // 🔥 this now triggers animation via useEffect

      } catch (error) {
        console.error("Survey update failed:", error);
      }
    }
  };

  const skipSurvey = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await fetch(
        `http://127.0.0.1:5005/api/auth/complete-survey/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isSurveyCompleted: true,
          }),
        }
      );

      localStorage.setItem("isSurveyCompleted", "true");
      setShowSurvey(false); // 🔥 animation auto-triggers

    } catch (error) {
      console.error("Skip survey failed:", error);
    }
  };

  const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-gray-800 overflow-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm sticky top-0 z-20">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            SWS
          </div>
          <h1 className="text-xl md:text-2xl font-semibold">
            StudyWithStrangers
          </h1>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6 relative">

          {/* Trending */}
          <FaChartLine className="text-xl text-gray-600 hover:text-indigo-600 cursor-pointer transition" />

          {/* Streak */}
          <div className="flex items-center gap-1 text-orange-500">
            <FaFire className="text-xl" />
            <span className="text-sm font-medium">7</span>
          </div>

          {/* Notification */}
          <FaBell className="text-xl text-gray-600 hover:text-indigo-600 cursor-pointer transition" />

          {/* Profile */}
          <div className="relative">
            <FaUserCircle
              className="text-3xl text-gray-700 cursor-pointer hover:text-indigo-600 transition"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                  My Profile
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition">
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <div
        className={`p-10 transition-all duration-500 ${
          showSurvey ? "blur-md scale-95" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-500 mt-3">
          Your focus journey starts here.
        </p>
      </div>

      {/* 🔥 INTRO ANIMATION OVERLAY */}
      {showIntroAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-[100] overflow-hidden transition-all duration-500">
          <h1 className="text-[80px] md:text-[160px] font-bold text-gray-800 animate-zoomOut">
            StudyWithStrangers
          </h1>
        </div>
      )}

      {/* SURVEY OVERLAY */}
      {showSurvey && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="relative w-[90%] max-w-md bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8">

            <button
              onClick={skipSurvey}
              className="absolute top-4 right-5 text-sm text-gray-600 hover:text-black"
            >
              Skip
            </button>

            <div className="flex gap-2 mb-6">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < step
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="min-h-[120px] flex flex-col justify-center">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold mb-5 text-center">
                    Which exam are you preparing for?
                  </h2>
                  <select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select Exam</option>
                    <option>JEE</option>
                    <option>NEET</option>
                    <option>UPSC</option>
                    <option>GATE</option>
                    <option>CODING</option>
                  </select>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold mb-5 text-center">
                    How many hours can you focus daily?
                  </h2>
                  <input
                    type="number"
                    value={dailyTargetHours}
                    onChange={(e) => setDailyTargetHours(e.target.value)}
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-xl font-semibold mb-5 text-center">
                    What is your goal?
                  </h2>
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </>
              )}
            </div>

            <button
              onClick={nextStep}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:scale-[1.03] transition"
            >
              {step === totalSteps ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}