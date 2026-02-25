import React, { useState, useRef } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      setVisibleIndex(index);

      // Hide after 1 second
      setTimeout(() => {
        setVisibleIndex(null);
      }, 1000);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = () => {
    if (!accepted) {
      alert("Please accept privacy & policies");
      return;
    }

    const finalOtp = otp.join("");
    console.log("OTP:", finalOtp);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white px-6">

      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight tracking-tight">
        <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          StudyWithStrangers
        </span>
        <span className="block text-2xl md:text-4xl text-gray-300 font-medium mt-5">
          WELCOMES's YOU !
        </span>
      </h1>

      <p className="text-gray-300 text-center max-w-2xl mb-8">
       Before continuing, please verify your email using the OTP sent to you. By proceeding, you agree to our privacy policy and acknowledge that you are responsible for your actions while using this platform.
      </p>

      {/* OTP Boxes */}
      <div className="flex gap-4 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={
              digit && visibleIndex !== index ? "•" : digit
            }
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-semibold bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        ))}
      </div>

      {/* Policy Checkbox */}
      <div className="flex items-start gap-3 max-w-xl mb-6">
        <input
          type="checkbox"
          checked={accepted}
          onChange={() => setAccepted(!accepted)}
          className="mt-1 w-5 h-5 accent-indigo-500"
        />
        <p className="text-gray-300 text-sm leading-relaxed">
          I confirm that I have read and agree to the Privacy Policy and Terms
          of Service. I understand that I am fully responsible for my actions
          on this platform and agree to abide by community guidelines.
        </p>
      </div>

      <button
        onClick={handleVerify}
        disabled={!accepted}
        className={`px-10 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
          accepted
            ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30"
            : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Verify
      </button>
    </div>
  );
}