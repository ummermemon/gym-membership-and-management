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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/me`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
      );
      const res = await response.json();
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
                        <span className="hidden md:block font-medium"> {user?.fname || "Member"}</span>
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border">
                            <DropdownItem icon={<User size={16} />} label="Edit Profile" />
                            <DropdownItem icon={<KeyRound size={16} />} label="Change Password" />
                            <DropdownItem
                            icon={<LogOut size={16} />}
                            label="Logout"
                            onClick={handleLogout}
                            />
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}
const DropdownItem = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
    {icon}
    {label}
  </div>
);

export default Header