import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Skeleton } from "@heroui/skeleton";
import { Hand, Dumbbell, Utensils } from 'lucide-react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MemberNavbarComponent from "./components/navbar";

export default function MemberDashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/member/dashboard`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const res = await response.json();

            if (res.status) {
                setData(res.data);
            } else {
                // throw new Error(res.message || "Failed to fetch dashboard data");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    const getExpiryMessage = (endDate) => {
        if (!endDate) return "";

        const today = new Date();
        const expiry = new Date(endDate);

        // Reset time to midnight for accurate day calculation
        today.setHours(0, 0, 0, 0);
        expiry.setHours(0, 0, 0, 0);

        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return `Expired ${Math.abs(diffDays)} days ago`;
        if (diffDays === 0) return "Expires today";
        if (diffDays === 1) return "Expires tomorrow";
        return `Expiring in ${diffDays} days`;
    };

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return (
        <div className="min-h-screen bg-50/50">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <MemberNavbarComponent />

            <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
                {!loading && data?.user && (
                    <Alert
                        startContent={<Hand className="text-warning" size={24} strokeWidth={1} />}
                        color="warning"
                        variant="flat"
                        hideIcon
                        title={`Welcome back, ${data.user.fname}!`}
                        description="Consistency is the key to progress. Let's get to work today."
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                        className="shadow-sm border-none"
                    />
                )}

                <section>
                    <Skeleton isLoaded={!loading} className="rounded-2xl">
                        <Card className="border-none shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white p-2">
                            <CardBody className="p-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="space-y-2">
                                        <p className="text-warning font-semibold uppercase tracking-widest text-xs">Membership {getExpiryMessage(data?.membership?.end_date)}</p>
                                        <h2 className="text-4xl font-black italic tracking-tight">
                                            {data?.membership?.plan_name || "NO ACTIVE PLAN"}
                                        </h2>
                                        {data?.membership && (
                                            <div className="flex items-center gap-4 mt-4">
                                                <span className="bg-white/10 backdrop-blur-md text-warning text-[10px] px-3 py-1 rounded-full border border-warning/20 font-bold uppercase">
                                                    {data.membership.status}
                                                </span>

                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <Button
                                            color="warning"
                                            variant="shadow"
                                            size="md"
                                            as={Link}
                                            to={'/member/membership'}
                                            isDisabled={!data?.membership}
                                        >
                                            Explore
                                        </Button>
                                    </div>


                                </div>
                            </CardBody>
                        </Card>
                    </Skeleton>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Workout Section */}
                    <Skeleton isLoaded={!loading} className="rounded-xl">
                        <Card className="">
                            <CardHeader className="flex justify-between items-center pb-0">
                                <div className="flex items-center gap-3">
                                        <Dumbbell size={18} strokeWidth={1} className="text-warning"  />
                                    <h3 >Workout</h3>
                                </div>
                            </CardHeader>
                            <CardBody className="py-6">
                                {data?.workout_plan ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="">{data.workout_plan.title}</h4>
                                            <p className="text-default-500 capitalize">Level: {data.workout_plan.level}</p>
                                        </div>
                                        <Button as={Link} to={`/member/workout-plan`} color="warning" className="mt-2">
                                            Explore
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="py-10 text-center border-2 border-dashed border-default-200 rounded-xl">
                                        <p className="text-default-400">No workout assigned yet</p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Skeleton>

                    {/* Diet Section */}
                    <Skeleton isLoaded={!loading} className="rounded-xl">
                        <Card className="">
                            <CardHeader className="flex justify-between items-center pb-0">
                                <div className="flex items-center gap-3">
                                        <Utensils size={18} strokeWidth={1} className="text-warning" />
                                    <h3 className="">Diet</h3>
                                </div>
                            </CardHeader>   
                            <CardBody className="py-6">
                                {data?.diet_plan ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h4>{data.diet_plan.diet_plan.title}</h4>
                                            <p className="text-default-500 capitalize">Goal: {data.diet_plan.diet_plan.goal?.replace('_', ' ')}</p>
                                        </div>
                                        
                                        <Button color="warning" className="mt-2" as={Link}
                                            to={'/member/diet-plan'}>
                                            Explore
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="py-10 text-center border-2 border-dashed border-default-200 rounded-xl">
                                        <p className="text-default-400">No diet plan assigned yet</p>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </Skeleton>
                </div>
            </main>
        </div>
    );
}