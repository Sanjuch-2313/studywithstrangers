import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaFire, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ---------------- ROOMS ---------------- */
const rooms = [
  { id: "jee", name: "JEE", color: "from-red-500 to-orange-500" },
  { id: "neet-ug", name: "NEET UG", color: "from-green-500 to-emerald-600" },
  { id: "neet-pg", name: "NEET PG", color: "from-teal-500 to-cyan-600" },
  { id: "gate", name: "GATE", color: "from-blue-500 to-indigo-600" },
  { id: "competitive", name: "Competitive Exams", color: "from-purple-500 to-indigo-600" },
  { id: "coding", name: "Coding", color: "from-gray-700 to-gray-900" },
  { id: "designing", name: "Designing", color: "from-pink-500 to-rose-500" },
  { id: "startups", name: "Startups", color: "from-yellow-500 to-orange-600" }
];

export default function UserDashboard() {
  const navigate = useNavigate();

  const surveyStatus = localStorage.getItem("isSurveyCompleted") === "true";

  const [step, setStep] = useState(1);
  const [showSurvey, setShowSurvey] = useState(!surveyStatus);

  const [primaryCategory, setPrimaryCategory] = useState("");
  const [dailyTargetHours, setDailyTargetHours] = useState("");
  const [goal, setGoal] = useState("");

  const [showIntroAnimation, setShowIntroAnimation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showArenaPolicy, setShowArenaPolicy] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const totalSteps = 3;

  /* ---------------- JOIN ROOM ---------------- */
  const handleJoinRoom = (roomId) => {
    setSelectedRoom(roomId);
    setShowArenaPolicy(true);
  };

  /* ---------------- ENTER ARENA ---------------- */
  const enterArena = async () => {
    if (!acceptedPolicy) {
      alert("Please accept arena rules before entering.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      stream.getTracks().forEach(track => track.stop());

      const userId = localStorage.getItem("userId");

      await fetch("http://127.0.0.1:5005/api/rooms/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          roomId: selectedRoom
        })
      });

      navigate(`/room/${selectedRoom}`);

    } catch (error) {
      alert("Camera permission required to enter focus arena.");
    }
  };

  /* ---------------- Animation Controller ---------------- */
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              primaryCategory,
              dailyTargetHours,
              goal,
            }),
          }
        );

        localStorage.setItem("isSurveyCompleted", "true");
        setShowSurvey(false);
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isSurveyCompleted: true }),
        }
      );

      localStorage.setItem("isSurveyCompleted", "true");
      setShowSurvey(false);
    } catch (error) {
      console.error("Skip survey failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-gray-800 overflow-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm sticky top-0 z-20">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            SWS
          </div>
          <h1 className="text-xl md:text-2xl font-semibold">
            StudyWithStrangers
          </h1>
        </div>

        <div className="flex items-center gap-6 relative">

          <FaChartLine className="text-xl text-gray-600 hover:text-indigo-600 cursor-pointer transition" />

          <div className="flex items-center gap-1 text-orange-500">
            <FaFire className="text-xl" />
            <span className="text-sm font-medium">7</span>
          </div>

          <FaBell className="text-xl text-gray-600 hover:text-indigo-600 cursor-pointer transition" />

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

        {/* -------- ROOMS SECTION -------- */}
        <div className="mt-12">

          <h3 className="text-2xl font-semibold mb-6">
            Join Focus Arenas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleJoinRoom(room.id)}
                className={`cursor-pointer p-6 rounded-2xl 
                bg-gradient-to-br ${room.color}
                text-white shadow-lg 
                hover:scale-105 hover:shadow-2xl
                transition-all duration-300`}
              >
                <h4 className="text-xl font-bold mb-2">
                  {room.name}
                </h4>

                <p className="text-sm opacity-90">
                  Click to enter focus arena
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* INTRO ANIMATION */}
      {showIntroAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-[100]">
          <h1 className="text-[80px] md:text-[160px] font-bold text-gray-800 animate-zoomOut">
            StudyWithStrangers
          </h1>
        </div>
      )}

      {/* ARENA POLICY MODAL */}
      {showArenaPolicy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[200]">

          <div className="bg-white max-w-lg w-[90%] rounded-2xl shadow-2xl p-8">

            <h2 className="text-2xl font-semibold mb-4 text-center">
              Enter Focus Arena
            </h2>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              You are entering a Focus Arena. Maintain discipline,
              avoid abusive behavior, and respect other learners.

              Any abnormal activity may result in restrictions
              according to platform policies and applicable laws.
            </p>

            <div className="flex items-start gap-3 mb-6">

              <input
                type="checkbox"
                checked={acceptedPolicy}
                onChange={() => setAcceptedPolicy(!acceptedPolicy)}
                className="mt-1 w-5 h-5 accent-indigo-600"
              />

              <p className="text-sm text-gray-600">
                I agree to follow Focus Arena rules and maintain discipline.
              </p>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() => setShowArenaPolicy(false)}
                className="flex-1 py-3 rounded-lg border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={enterArena}
                className="flex-1 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Enter Arena
              </button>

            </div>

          </div>

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

            {/* SURVEY STEPS (unchanged) */}

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