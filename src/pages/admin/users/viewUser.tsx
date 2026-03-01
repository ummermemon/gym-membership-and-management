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
import { History, User, ReceiptText } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/react";
import { Tabs, Tab } from "@heroui/tabs";




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
    const [plans, setPlans] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [assignedWorkout, setAssignedWorkout] = useState(null);
    const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
    const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);

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
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchAssignedWorkout = async () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch(
            `${API_BASE_URL}/api/admin/user-workout/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        if (data.status) {
            setAssignedWorkout(data.data);
        }
    };

    const fetchPlans = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/membership-plans/list`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setPlans(res.data);
        } catch (error) {
            // console.error("Error fetching mp:", error);
        }
    };
    const handleAssign = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/admin/user-membership/assign`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    membership_plan_id: Number(selectedPlan)
                })
            });

            const data = await res.json();
            // console.log(data);

            if (data.status) {
                fetchUser(); // Refresh user data
                addToast({
                    title: "Membership Assigned",
                    description: "Membership assigned successfully",
                    variant: "flat",
                    color: "warning",
                });
                setIsOpen(false);
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "flat",
                    color: "warning",
                });
            }

        } catch (error) {
            // console.error(error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Details | User | Gym Membership and Management System</title>
            </Helmet>

            <AdminNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto flex flex-col">
                {/* Page Heading */}
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center">Details</h1>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={'/admin/users'}>Users</Link></BreadcrumbItem>
                            <BreadcrumbItem>{isLoading ? (
                                <div className="flex gap-2">

                                    <Skeleton className="w-12 h-4 rounded-md" />
                                    <Skeleton className="w-12 h-4 rounded-md" />
                                </div>
                            ) : `${user.fname} ${user.lname}`}</BreadcrumbItem>
                            <BreadcrumbItem>Details</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
                <Tabs aria-label="Options" className="justify-center" color="warning" radius="md">
                    <Tab key="membership" title="Membership">
                        {/* Profile Card */}
                        <Card className="mb-6">
                            <CardHeader className="flex items-center gap-4">
                                {
                                    isLoading ? (
                                        <div className="flex gap-4 items-center">
                                            <Skeleton className="w-15 h-15 rounded-full" />
                                            <div className="flex flex-col">
                                                <div className="flex gap-2">
                                                    <Skeleton className="w-20 h-6 rounded-md" />
                                                    <Skeleton className="w-20 h-6 rounded-md" />
                                                </div>
                                                <Skeleton className="w-40 h-4 rounded-md mt-2" />
                                            </div>
                                        </div>
                                    )
                                        : (
                                            <Avatar
                                                name={`${user.fname} ${user.lname}`}
                                                size="lg"
                                                src={`${API_BASE_URL}/storage/users/profile_images/${user.profile_img}`}
                                                className="text-large"
                                                showFallback
                                            />
                                        )}

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
                                            {isLoading ? (<Skeleton className="h-4 w-12 rounded-md" />) : user.role}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Joined</span>
                                        <span>{isLoading ? (<Skeleton className="h-6 w-20 rounded-md" />) : new Date(user.created_at).toLocaleDateString("en-IN", {
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
                                <div className="flex flex-row items-center justify-between w-full">


                                    <div className="flex gap-2 items-center ">
                                        <History strokeWidth={1} className="text-warning-500" />
                                        <h3 className="font-semibold text-lg text-default-500">
                                            Membership History
                                        </h3>
                                    </div>
                                    <div className="ml-auto">
                                        <Button
                                            size="sm"
                                            color="warning"
                                            variant="flat"
                                            onClick={() => setIsOpen(true)}
                                        >
                                            Assign / Renew
                                        </Button>
                                    </div>
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
                    </Tab>
                    <Tab key="workoutPlan" title="Workout Plan">
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="dietPlan" title="Diet Plan">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>


            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>Assign Membership</ModalHeader>
                    <ModalBody>

                        <Select
                            label="Select Plan"
                            placeholder="Choose a membership plan"
                            selectedKeys={
                                selectedPlan !== null ? new Set([String(selectedPlan)]) : new Set()
                            }
                            onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                setSelectedPlan(Number(value));
                            }}
                        >
                            {plans.map((plan) => (
                                <SelectItem key={String(plan.id)}>
                                    {plan.name} - ₹{plan.price}
                                </SelectItem>
                            ))}
                        </Select>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={handleAssign}>
                            Assign
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}