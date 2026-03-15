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
import { Skeleton } from "@heroui/react";

export default function AdminDashboardPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        setLoading(true);
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
            setLoading(false);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <AdminNavbarComponent currentPage="dashboard" />

            <main className="max-w-7xl mx-auto p-6 lg:p-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-normal">Dashboard</h1>
                        <p className="text-gray-400 font-normal">
                            Monitor and manage gym assets and users.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Skeleton isLoaded={!loading} className="rounded-2xl">
                        <Card >
                            <CardBody className="flex flex-row items-center gap-4 py-4">
                                <div className="text-warning bg-warning/10 p-2 rounded-lg">{<Users size={20} />}</div>

                                <div>
                                    <p className="text-2xl font-normal leading-none">{data?.count?.users || 0}</p>
                                    <p className="text-xs text-gray-500 font-normal mt-1">Members</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>

                    <Skeleton isLoaded={!loading} className="rounded-2xl">
                        <Card >
                            <CardBody className="flex flex-row items-center gap-4 py-4">
                                <div className="text-warning bg-warning/10 p-2 rounded-lg">{<Dumbbell size={20} />}</div>

                                <div>
                                    <p className="text-2xl font-normal leading-none">{data?.count?.workout_plans || 0}</p>
                                    <p className="text-xs text-gray-500 font-normal mt-1">Workout Plans</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} className="rounded-2xl">
                        <Card >
                            <CardBody className="flex flex-row items-center gap-4 py-4">
                                <div className="text-warning bg-warning/10 p-2 rounded-lg">{<Apple size={20} />}</div>

                                <div>
                                    <p className="text-2xl font-normal leading-none">{data?.count?.diet_plans || 0}</p>
                                    <p className="text-xs text-gray-500 font-normal mt-1">Diet Plans</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} className="rounded-2xl">
                        <Card >
                            <CardBody className="flex flex-row items-center gap-4 py-4">
                                <div className="text-warning bg-warning/10 p-2 rounded-lg">{<CreditCard size={20} />}</div>

                                <div>
                                    <p className="text-2xl font-normal leading-none">{data?.count?.membership_plans || 0}</p>
                                    <p className="text-xs text-gray-500 font-normal mt-1">Membership Plans</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <Skeleton isLoaded={!loading} className="rounded-2xl">
                            <Card>
                                <CardBody className="p-5">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-lg font-normal">Recent Members</h3>
                                        <Button
                                            as={Link}
                                            to={'/admin/users'}
                                            variant="light"
                                            color="warning"
                                            size="sm"
                                            endContent={<ChevronRight size={14} />}
                                        >
                                            See All
                                        </Button>
                                    </div>

                                    <div className="space-y-4">{data?.users?.map((user, index) => (
                                        <div key={user.id}>
                                            <MemberItem
                                                name={`${user.fname} ${user.lname}`}
                                                info={user.email}
                                                status="Active"
                                                profileImg={user.profile_img}
                                            />
                                        </div>
                                    ))}</div>
                                </CardBody>
                            </Card>
                        </Skeleton>
                        <Skeleton isLoaded={!loading} className="rounded-2xl">
                            <Card >
                                <CardBody className="p-5">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-lg font-normal">Membership Plans</h3>
                                        <Button
                                            as={Link}
                                            to={"/admin/membership-plans"}
                                            variant="light"
                                            color="warning"
                                            size="sm"
                                            endContent={<ChevronRight size={14} />}
                                        >
                                            See All
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {data?.membership_plans?.map((plan) => (
                                            <div className="flex justify-between items-center p-3 rounded-lg bg-linear-to-r from-warning-500 to to-blue-900">
                                                <div>
                                                    <p className="text-sm font-normal text-black">{plan.name}</p>
                                                    <p className="text-xs text-black">{`₹${plan.price}`}</p>
                                                </div>
                                                {/* <p className="text-xs text-gray-500">Members</p> */}
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        </Skeleton>
                    </div>

                    <div className="space-y-8">
                        <Skeleton isLoaded={!loading} className="rounded-2xl">
                            <Card className="" >
                                <CardBody className="p-5">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-lg font-normal">Workout Plans</h3>
                                        <Button
                                            as={Link}
                                            to={'/admin/workout-plans'}
                                            variant="light"
                                            color="warning"
                                            size="sm"
                                            endContent={<ChevronRight size={14} />}
                                        >
                                            See All
                                        </Button>
                                    </div>

                                    <div className="space-y-4">{data?.workout_plans?.map((plan) => (
                                        <div className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
                                                <div>
                                                    <p className="text-sm font-normal">{plan.title}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{plan.level}</p>
                                                </div>
                                            </div>
                                    ))}</div>
                                </CardBody>
                            </Card>
                        </Skeleton>
                        <Skeleton isLoaded={!loading} className="rounded-2xl">
                            <Card >
                                <CardBody className="p-5">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-lg font-normal">Diet Plans</h3>

                                        <Button
                                            as={Link}
                                            to={"/admin/diet-plans"}
                                            variant="light"
                                            color="warning"
                                            size="sm"
                                            endContent={<ChevronRight size={14} />}
                                        >
                                            See All
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {data?.diet_plans?.map((plan) => (
                                            <div className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
                                                <div>
                                                    <p className="text-sm font-normal">{plan.title}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{plan.level}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        </Skeleton>
                    </div>
                </div>
            </main>
        </div>
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