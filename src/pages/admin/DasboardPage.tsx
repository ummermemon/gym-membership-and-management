import React, { useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Bell,
  User,
  LogOut,
  KeyRound,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const DashboardPage = () => {

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Content */}
        <main className="p-6">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back, Ummer 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Stay consistent and track your fitness journey!
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <DashboardCard
              title="Workout Plan"
              description="Check your assigned workout routine."
              icon={<Dumbbell size={28} />}
              bg="bg-green-100"
              iconColor="text-green-600"
            />

            <DashboardCard
              title="Diet Plan"
              description="Access your personalized diet schedule."
              icon={<Utensils size={28} />}
              bg="bg-orange-100"
              iconColor="text-orange-600"
            />

            <DashboardCard
              title="Membership Status"
              description="Premium Plan - Active"
              icon={<ClipboardList size={28} />}
              bg="bg-blue-100"
              iconColor="text-blue-600"
            />
          </div>

          {/* Announcements Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell size={20} /> Latest Announcements
            </h2>

            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="p-3 bg-gray-50 rounded-lg">
                🏋️ New Zumba batch starting from Monday!
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                🔥 20% discount on yearly membership.
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                📢 Gym will remain closed on public holiday.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};





const DashboardCard = ({ title, description, icon, bg, iconColor }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
    <div
      className={`w-12 h-12 ${bg} ${iconColor} rounded-xl flex items-center justify-center mb-4`}
    >
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-gray-500 text-sm mt-2">{description}</p>
  </div>
);

export default DashboardPage;
