import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus, FaCommentDots, FaEyeSlash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import { socket } from "../socket";

export default function RoomPage() {
    const [peers, setPeers] = useState([]);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [topic, setTopic] = useState("Studying Calculus");

  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSpent, setTimeSpent] = useState(0);

  /* START CAMERA */

  useEffect(() => {

    const startCamera = async () => {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error("Camera access denied:", error);
      }

    };
    socket.emit("join-room", {
  roomId,
  userId: localStorage.getItem("userId")
});
socket.on("user-joined", (user) => {

  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: streamRef.current
  });

  peer.on("signal", signal => {

    socket.emit("sending-signal", {
      signal,
      to: user.socketId
    });

  });

  setPeers(prev => [...prev, peer]);

});

    startCamera();


    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };

  }, []);

  /* CURRENT TIME CLOCK */

  useEffect(() => {

    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clock);

  }, []);

  /* TIME SPENT COUNTER */

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* FORMAT TIME */

  const formatTime = (seconds) => {

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h ${m}m ${s}s`;

  };

  /* LEAVE ROOM */

  const leaveRoom = () => {

    const confirmExit = window.confirm(
      "Are you sure you want to leave the Focus Arena?"
    );

    if (!confirmExit) return;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    navigate("/user-dashboard");

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}

      <div className="bg-white shadow px-8 py-4 text-xl font-semibold">
        Focus Arena — Maintain Discipline
      </div>

      <div className="flex flex-1 p-6 gap-6">

        {/* LEFT SIDE */}

        <div className="w-[320px] bg-white rounded-xl shadow flex flex-col justify-between">

          <div>

            {/* USER CAMERA */}

            <div className="relative">

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-[200px] object-cover rounded-t-xl"
              />
              {peers.map((peer, index) => (

    <video
      key={index}
      autoPlay
      className="bg-black rounded"
    />

  ))}

              <span className="absolute top-2 left-2 text-green-400 text-sm">
                ● Live
              </span>

            </div>

            {/* STUDY TOPIC */}

            <div className="p-4 border-b">

              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full font-semibold text-center outline-none"
              />

            </div>

            {/* TIME INFORMATION */}

            <div className="p-4 space-y-2 text-sm text-gray-700">

              <div>
                <strong>Current Time:</strong> {currentTime.toLocaleTimeString()}
              </div>

              <div>
                <strong>Time Spent:</strong> {formatTime(timeSpent)}
              </div>

            </div>

          </div>

          {/* LEAVE ROOM BUTTON */}

          <div className="p-4 border-t">

            <button
              onClick={leaveRoom}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Leave Room
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex-1 flex flex-col gap-6">

          {/* OTHER USERS GRID */}

          <div className="grid grid-cols-3 gap-5">

            {[...Array(6)].map((_, i) => (

              <div
                key={i}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <div className="h-[120px] bg-gray-300"></div>

                <div className="flex justify-between p-3 text-gray-600">

                  <FaUserPlus className="cursor-pointer hover:text-indigo-600"/>

                  <FaCommentDots className="cursor-pointer hover:text-indigo-600"/>

                  <FaEyeSlash className="cursor-pointer hover:text-red-500"/>

                </div>

              </div>

            ))}

          </div>

          {/* NEWS SECTION */}

          <div className="bg-white rounded-xl shadow p-5">

            <h3 className="font-semibold mb-3">
              Latest Study Updates
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">

              <li>• New JEE mock test released</li>
              <li>• NEET syllabus update announced</li>
              <li>• Coding contest starting tonight</li>
              <li>• GATE preparation webinar announced</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}