import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <section
        className="min-h-screen flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/hero-section/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl px-20 ">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f48f21] mb-6">
            Gym Management System
          </h1>
          <p className="text-lg text-gray-400 text-justify md:text-md mb-8">
            A modern web-based solution that helps gym owners manage members, trainers,
            workout plans, diet plans, and announcements digitally. Members can access
            their workout and diet plans anytime without visiting the gym.
          </p>
          <div className="flex space-x-2">

          <button className="bg-[#f48f21] text-black px-8 py-4 cursor-pointer rounded-xl font-semibold shadow hover:bg-amber-300 transition">
            Get Started
          </button>
          {/* <button className="bg-[#122d52] text-white px-8 py-4 cursor-pointer rounded-xl font-semibold shadow hover:bg-[#122d52] transition">
            Login
          </button> */}
          </div>
        </div>
      </section>
    </div>
  );
}
