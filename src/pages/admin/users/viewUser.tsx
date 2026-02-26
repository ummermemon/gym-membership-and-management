import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { History, User, ReceiptText  } from 'lucide-react';

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span>{value || "—"}</span>
        </div>
    );
}

export default function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [memberships, setMemberships] = useState([]);
    useEffect(() => {
        fetchUser();
    }, [id]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/users/view/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setUser(res.user[0]);
            setMemberships(res.user[0].memberships || []);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>View User</title>
            </Helmet>

            <AdminNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center">Details</h1>
                        <Breadcrumbs>
                            <BreadcrumbItem>Users</BreadcrumbItem>
                            <BreadcrumbItem>View</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>

                {/* Profile Card */}
                <Card className="mb-6">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar
                            name={`${user.fname} ${user.lname}`}
                            size="lg"
                            src={`${API_BASE_URL}/storage/users/profile_images/${user.profile_img}`}
                            className="text-large"
                            showFallback
                        />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {user.fname} {user.lname}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                        <div className="ml-auto capitalize">
                            <Chip
                                color={
                                    user.active_membership?.status === "active"
                                        ? "warning"
                                        : "danger"
                                }
                                variant="flat"
                            >
                                {user.active_membership?.status || "Inactive"}
                            </Chip>
                        </div>
                    </CardHeader>
                </Card>

                {/* User Info Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <Card >
                        <CardHeader>
                            <div className="flex gap-2 items-center">
                            <User strokeWidth={1} className="text-warning-500" />
                            <h3 className="font-semibold text-lg text-default-500">
                                Personal Information
                            </h3>
                        </div>
                        </CardHeader>
                        <CardBody className="space-y-3">
                            {user.phone ?
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Phone</span>
                                    <span>{user.phone}</span>
                                </div>
                                : ''}
                            {user.address ?
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Address</span>
                                    <span>{user.address}</span>
                                </div>
                                : ''}
                            <div className="flex justify-between">
                                <span className="text-gray-500">Role</span>
                                <span className="capitalize">
                                    {user.role}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Joined</span>
                                <span>{new Date(user.created_at).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Membership Info */}
                    <Card >
                         
                        <CardHeader>
                            <div className="flex gap-2 items-center">
                            <ReceiptText strokeWidth={1} className="text-warning-500" />
                            <h3 className="font-semibold text-lg text-default-500">
                                Membership Details
                            </h3>
                        </div>
                        </CardHeader>
                        <CardBody className="space-y-3">

                            {/* Plan */}
                            <InfoRow
                                label="Plan"
                                value={user.active_membership?.plan_name}
                            />

                            {/* Duration */}
                            <InfoRow
                                label="Duration"
                                value={
                                    user.active_membership?.plan_duration
                                        ? `${user.active_membership.plan_duration} days`
                                        : null
                                }
                            />

                            {/* Price */}
                            <InfoRow
                                label="Price"
                                value={
                                    user.active_membership?.plan_price
                                        ? `₹ ${Number(user.active_membership.plan_price).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}`
                                        : null
                                }
                            />

                            {/* Status */}
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                {user.active_membership ? (
                                    <Chip
                                        size="sm"
                                        color={
                                            user.active_membership.status === "active"
                                                ? "warning"
                                                : "danger"
                                        }
                                        variant="flat"
                                        className="capitalize"
                                    >
                                        {user.active_membership.status}
                                    </Chip>
                                ) : (
                                    <span>—</span>
                                )}
                            </div>

                            {/* Start Date */}
                            <InfoRow
                                label="Start Date"
                                value={
                                    user.active_membership?.start_date
                                        ? new Date(user.active_membership.start_date).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                        : null
                                }
                            />

                            {/* Expiry Date */}
                            <InfoRow
                                label="Expiry Date"
                                value={
                                    user.active_membership?.end_date
                                        ? new Date(user.active_membership.end_date).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                        : null
                                }
                            />

                        </CardBody>
                    </Card>
                </div>
                <Card className="mt-6">
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <History strokeWidth={1} className="text-warning-500" />
                            <h3 className="font-semibold text-lg text-default-500">
                                Membership History
                            </h3>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {memberships.length === 0 ? (
                            <p className="text-gray-500 text-center">
                                No membership history found.
                            </p>
                        ) : (
                            <Accordion variant="splitted">
                                {memberships.map((m, index) => (
                                    <AccordionItem
                                        key={m.id || index}
                                        aria-label={`Membership ${index}`}
                                        title={m.plan_name}
                                        subtitle={<Chip
                                            size="sm"
                                            color={
                                                m?.status === "active"
                                                    ? "warning"
                                                    : "danger"
                                            }
                                            variant="flat"
                                            className="capitalize mt-2"
                                        >
                                            {m?.status}
                                        </Chip>}>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm p-5">

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Duration</span>
                                                <span>{m.plan_duration} days</span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Price</span>
                                                <span>
                                                    ₹{" "}
                                                    {Number(m.plan_price).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Start Date</span>
                                                <span>
                                                    {new Date(m.start_date).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-500">End Date</span>
                                                <span>
                                                    {new Date(m.end_date).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}