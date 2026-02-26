import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";


export default function ViewUser() {
    // Dummy data (replace with API data)
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        role: "member",
        gender: "Male",
        joinDate: "12 Feb 2026",
        membership: {
            plan: "Gold Plan",
            status: "active",
            expiry: "12 May 2026",
        },
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
                <Card className="mb-6 shadow-lg rounded-2xl">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar
                            name={user.name}
                            size="lg"
                            className="text-large"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {user.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                        <div className="ml-auto">
                            <Chip
                                color={
                                    user.membership.status === "active"
                                        ? "success"
                                        : "danger"
                                }
                                variant="flat"
                            >
                                {user.membership.status}
                            </Chip>
                        </div>
                    </CardHeader>
                </Card>

                {/* User Info Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">
                                Personal Information
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Gender</span>
                                <span>{user.gender}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Role</span>
                                <span className="capitalize">
                                    {user.role}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Joined</span>
                                <span>{user.joinDate}</span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Membership Info */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <h3 className="font-semibold text-lg">
                                Membership Details
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Plan</span>
                                <span>
                                    {user.membership.plan || "No Plan"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <Chip
                                    size="sm"
                                    color={
                                        user.membership.status === "active"
                                            ? "success"
                                            : "danger"
                                    }
                                    variant="flat"
                                >
                                    {user.membership.status}
                                </Chip>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Expiry Date</span>
                                <span>
                                    {user.membership.expiry || "—"}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}