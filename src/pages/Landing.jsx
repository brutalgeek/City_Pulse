// src/pages/Landing.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/people.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
          Welcome to City Pulse
        </h1>

        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-white/80 hover:bg-white text-black rounded-2xl shadow-lg transition"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/signin')}
            className="px-6 py-3 bg-white/80 hover:bg-white text-black rounded-2xl shadow-lg transition"
          >
            Sign In
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="text-white underline hover:text-gray-200 transition"
        >
          What is City Pulse?
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl max-w-lg p-8 shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4">About City Pulse</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>City Pulse</strong> is an innovative civic reporting and resolution
              platform designed to empower citizens. It allows communities to
              identify and report local issues such as broken streetlights, waste
              mismanagement, potholes, or other civic concerns directly through
              an accessible app. <br />
              <br />
              By connecting residents with municipal authorities, City Pulse
              fosters accountability, transparency, and faster resolutions —
              transforming cities into smarter, more responsive, and more
              livable spaces. Think of it as your city's heartbeat, capturing
              voices and turning them into action.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}