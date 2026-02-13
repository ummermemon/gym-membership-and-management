import React from 'react'
import { useState } from 'react';
import {
    LayoutDashboard,
    Dumbbell,
    Utensils,
    Bell,
} from "lucide-react";

function Sidebar() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <>
            <div
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-white shadow-lg transition-all duration-300 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-500">
                    <img
                        src="/assets/images/logo/erased-horizontal.png"
                        alt="Logo"
                        className=""
                    />
                    {/* <button className="text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button> */}
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
        </>
    )
}

const SidebarItem = ({ icon, label, open }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
    {icon}
    {open && <span className="text-sm font-medium">{label}</span>}
  </div>
);

export default Sidebar