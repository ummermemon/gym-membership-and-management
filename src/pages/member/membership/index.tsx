import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Chip,
    Skeleton,
    Button
} from "@heroui/react";
import MemberNavbarComponent from "../components/navbar";

const ViewMyMembership = () => {
    const [membership, setMembership] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchMembership();
    }, []);

    const fetchMembership = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/api/member/membership/view`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const res = await response.json();
            if (res.status === true) {
                setMembership(res.data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Membership | Gym Membership & Mangement System</title>
            </Helmet>
            <MemberNavbarComponent />

            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold mb-6">Membership Details</h1>

                {isLoading ? (
                    <Card className="p-4 space-y-3">
                        <Skeleton className="rounded-lg h-8 w-1/3" />
                        <Skeleton className="rounded-lg h-24 w-full" />
                        <Skeleton className="rounded-lg h-12 w-full" />
                    </Card>
                ) : membership ? (
                    <Card className="shadow-sm border-1 border-divider">
                        <CardHeader className="flex justify-between items-center px-6 pt-6">
                            <div className="flex flex-col">
                                <p className="text-tiny uppercase font-bold text-default-500">Current Plan</p>
                                <h2 className="text-2xl font-black text-warning">{membership.plan_name}</h2>
                            </div>
                            <Chip
                                color={membership.status === "active" ? "warning" : "danger"}
                                variant="flat"
                                className="capitalize"
                            >
                                {membership.status}
                            </Chip>
                        </CardHeader>

                        <Divider className="my-4" />

                        <CardBody className="px-6 pb-8 space-y-6">
                            <div className="flex justify-between">
                                <section>
                                    <p className="text-sm text-default-500">Price</p>
                                    <p className="text-lg font-semibold italic">₹{membership.plan_price}</p>
                                </section>
                                <section>
                                    <p className="text-sm text-default-500">Duration</p>
                                    <p className="text-lg font-semibold">{membership.plan_duration} Days</p>
                                </section>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between">
                                    <span className="text-default-600">Start Date</span>
                                    <span className="font-medium tracking-tight">{membership.start_date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-default-600">Renewal Date</span>
                                    <span className="font-medium tracking-tight">{membership.end_date}</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-default-400">No membership data found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewMyMembership;