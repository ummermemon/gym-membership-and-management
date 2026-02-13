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

function Header() {
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <>
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
        </>
    )
}
const DropdownItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
    {icon}
    {label}
  </div>
);

export default Header