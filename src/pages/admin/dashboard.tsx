import AdminNavbarComponent from "./components/navbar";
import { Helmet } from "react-helmet-async";
import { Card, CardBody, Button, Chip, User, Divider } from "@heroui/react";
import {
    Users,
    Dumbbell,
    Apple,
    CreditCard,
    Plus,
    ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [data, setData] = useState({});
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token =
                localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            const res = await response.json();
            setData(res.data);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <AdminNavbarComponent currentPage="dashboard" />

            <main className="max-w-7xl mx-auto p-6 lg:p-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-normal">Dashboard</h1>
                        <p className="text-gray-400 font-normal">
                            Monitor and manage gym assets and users.
                        </p>
                    </div>

                    <Button
                        color="warning"
                        endContent={<Plus size={18} />}
                        radius="md"
                    >
                        Quick Action
                    </Button>
                </header>

                {/* Count Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <CountCard
                        label="Members"
                        count={data?.count?.users || 0}
                        icon={<Users size={20} />}
                    />

                    <CountCard
                        label="Workouts"
                        count={data?.count?.workout_plans || 0}
                        icon={<Dumbbell size={20} />}
                    />

                    <CountCard
                        label="Diet Plans"
                        count={data?.count?.diet_plans || 0}
                        icon={<Apple size={20} />}
                    />

                    <CountCard
                        label="Plans"
                        count={data?.count?.membership_plans || 0}
                        icon={<CreditCard size={20} />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="space-y-8">

                        {/* Recent Members */}
                        <ManagementSection title="Recent Members" link="/members">
                            {data?.users?.map((user, index) => (
                                <div key={user.id}>
                                    <MemberItem
                                        name={`${user.fname} ${user.lname}`}
                                        info={user.email}
                                        status="Active"
                                        profileImg={user.profile_img}
                                    />
                                    {index !== data.users.length - 1 && (
                                        <Divider className="bg-zinc-800" />
                                    )}
                                </div>
                            ))}
                        </ManagementSection>

                        {/* Membership Plans */}
                        <ManagementSection title="Membership Plans" link="/membership-plans">
                            {data?.membership_plans?.map((plan) => (
                                <PlanItem
                                    key={plan.id}
                                    name={plan.name}
                                    price={`₹${plan.price}`}
                                    users="--"
                                />
                            ))}
                        </ManagementSection>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">

                        {/* Workout Plans */}
                        <ManagementSection title="Workout Plans" link="/workouts">
                            {data?.workout_plans?.map((plan) => (
                                <AssetItem
                                    key={plan.id}
                                    title={plan.title}
                                    category={plan.level}
                                    items="Exercises"
                                />
                            ))}
                        </ManagementSection>

                        {/* Diet Plans */}
                        <ManagementSection title="Diet Plans" link="/diet-plans">
                            {data?.diet_plans?.map((plan) => (
                                <AssetItem
                                    key={plan.id}
                                    title={plan.title}
                                    category={plan.goal}
                                    items={plan.level}
                                />
                            ))}
                        </ManagementSection>

                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---------------- Count Card ---------------- */

function CountCard({ label, count, icon }) {
    return (
        <Card className="bg-zinc-900/40 border-zinc-800 border-1" shadow="none">
            <CardBody className="flex flex-row items-center gap-4 py-4">
                <div className="text-warning bg-warning/10 p-2 rounded-lg">{icon}</div>

                <div>
                    <p className="text-2xl font-normal leading-none">{count}</p>
                    <p className="text-xs text-gray-500 font-normal mt-1">{label}</p>
                </div>
            </CardBody>
        </Card>
    );
}

/* ---------------- Management Section ---------------- */

function ManagementSection({ title, children, link }) {
    return (
        <Card className="bg-zinc-900/30 border-zinc-800 border-1" shadow="none">
            <CardBody className="p-5">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-normal text-white">{title}</h3>

                    <Button
                        as={Link}
                        to={link}
                        variant="light"
                        color="warning"
                        size="sm"
                        endContent={<ChevronRight size={14} />}
                    >
                        See All
                    </Button>
                </div>

                <div className="space-y-4">{children}</div>
            </CardBody>
        </Card>
    );
}

/* ---------------- Member Item ---------------- */

function MemberItem({ name, info, status, profileImg }) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const avatarSrc = profileImg
        ? `${API_BASE_URL}/storage/users/profile_images/${profileImg}`
        : "/profile.png";

    return (
        <div className="flex justify-between items-center my-2">
            <User
                name={name}
                description={info}
                avatarProps={{
                    size: "sm",
                    radius: "md",
                    src: avatarSrc,
                    showFallback: true,
                    name: name,
                }}
            />

            <Chip
                size="sm"
                color={status === "Active" ? "warning" : "default"}
                variant="flat"
                className="font-normal"
            >
                {status}
            </Chip>
        </div>
    );
}

/* ---------------- Plan Item ---------------- */

function PlanItem({ name, price, users }) {
    return (
        <div className="flex justify-between items-center p-3 rounded-lg bg-black/40 border border-zinc-800">
            <div>
                <p className="text-sm font-normal">{name}</p>
                <p className="text-xs text-warning">{price}</p>
            </div>

            <p className="text-xs text-gray-500">{users} Members</p>
        </div>
    );
}

/* ---------------- Asset Item ---------------- */

function AssetItem({ title, category, items }) {
    return (
        <div className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
            <div>
                <p className="text-sm font-normal text-gray-200">{title}</p>
                <p className="text-xs text-gray-500">{category}</p>
            </div>

            <span className="text-xs font-normal text-zinc-600 italic">
                {items}
            </span>
        </div>
    );
}