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

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-lg ${!sidebarOpen && "hidden"}`}>
            Gym Member
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<Dumbbell size={20} />}
            label="Workout Plan"
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<Utensils size={20} />}
            label="Diet Plan"
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<Bell size={20} />}
            label="Announcements"
            open={sidebarOpen}
          />
        </nav>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center">
                U
              </div>
              <span className="hidden md:block font-medium">Ummer</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border">
                <DropdownItem icon={<User size={16} />} label="Edit Profile" />
                <DropdownItem icon={<KeyRound size={16} />} label="Change Password" />
                <DropdownItem icon={<LogOut size={16} />} label="Logout" />
              </div>
            )}
          </div>
        </header>

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

const SidebarItem = ({ icon, label, open }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
    {icon}
    {open && <span className="text-sm font-medium">{label}</span>}
  </div>
);

const DropdownItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
    {icon}
    {label}
  </div>
);

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
