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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [dietPlans, setDietPlans] = useState([]);
    const [assignedDiet, setAssignedDiet] = useState(null);
    const [isDietModalOpen, setIsDietModalOpen] = useState(false);
    const [selectedDietPlan, setSelectedDietPlan] = useState(null);
    const [isDietLoading, setIsDietLoading] = useState(false);


    useEffect(() => {
        fetchWorkoutPlans();
    }, []);

    const fetchWorkoutPlans = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.status) {
                setWorkoutPlans(data.data);
            }

        } catch (error) {
            console.error("Error fetching workout plans:", error);
        }
    };

    const handleAssignWorkout = async () => {
        try {
            if (!selectedWorkoutPlan || !startDate || !endDate) {
                addToast({
                    title: "All fields required",
                    color: "warning",
                });
                return;
            }

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const formData = new FormData();
            formData.append("user_id", user.id);
            formData.append("start_date", startDate);
            formData.append("end_date", endDate);

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/${selectedWorkoutPlan}/assign`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.status) {
                addToast({
                    title: "Workout Assigned Successfully",
                    color: "warning",
                });

                setIsWorkoutModalOpen(false);
                setSelectedWorkoutPlan(null);
                setStartDate("");
                setEndDate("");

                fetchUser(); // refresh page data
            } else {
                addToast({
                    title: "Assignment Failed",
                    color: "danger",
                });
            }

        } catch (error) {
            console.error("Assign error:", error);
        }
    };

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

            const userData = res.user;   // ✅ not array

            setUser(userData);
            setMemberships(userData.memberships || []);

            // 👇 extract active workout
            if (userData.active_workout_plan?.length > 0) {
                setAssignedWorkout(userData.active_workout_plan[0]);
            } else {
                setAssignedWorkout(null);
            }

            if (userData.active_diet_plan) {
                setAssignedDiet(userData.active_diet_plan);
            } else {
                setAssignedDiet(null);
            }

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
    const fetchDietPlans = async () => {
        try {
            setIsDietLoading(true);

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.status) {
                setDietPlans(data.data);
            } else {
                setDietPlans([]);
            }

        } catch (error) {
            console.error("Error fetching diet plans:", error);
        } finally {
            setIsDietLoading(false);
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
    const handleAssignDiet = async () => {
        try {
            if (!selectedDietPlan) {
                addToast({
                    title: "Please select diet plan",
                    color: "warning",
                });
                return;
            }

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const formData = new FormData();
            formData.append("user_id", user.id);
            formData.append("diet_plan_id", selectedDietPlan);

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/assign`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // ❌ DO NOT add Content-Type manually
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.status) {
                addToast({
                    title: "Diet Plan Assigned Successfully",
                    color: "warning",
                });

                setIsDietModalOpen(false);
                setSelectedDietPlan(null);

                fetchUser(); // refresh user data
            } else {
                addToast({
                    title: data.message || "Assignment Failed",
                    color: "danger",
                });
            }

        } catch (error) {
            // console.error("Diet assign error:", error);
            addToast({
                title: "Something went wrong",
                color: "danger",
            });
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
                            <CardHeader className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Assigned Workout Plan</h3>

                                <Button
                                    size="sm"
                                    color="warning"
                                    variant="flat"
                                    onClick={() => setIsWorkoutModalOpen(true)}
                                >
                                    Assign / Change
                                </Button>
                            </CardHeader>

                            <CardBody>

                                {!assignedWorkout ? (
                                    <p className="text-gray-500 text-center">
                                        No workout plan assigned.
                                    </p>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <h4 className="text-xl font-semibold text-warning-500">
                                                {assignedWorkout.title}
                                            </h4>

                                            <div className="flex gap-4 text-sm mt-2">
                                                <span>
                                                    Start: {assignedWorkout.pivot?.start_date}
                                                </span>
                                                <span>
                                                    End: {assignedWorkout.pivot?.end_date}
                                                </span>
                                            </div>
                                        </div>

                                        <Accordion variant="splitted">
                                            {assignedWorkout.days?.map((day) => (
                                                <AccordionItem key={day.id} title={day.title}>
                                                    {day.exercises.map((ex) => (
                                                        <div
                                                            key={ex.id}
                                                            className="flex justify-between py-2 text-sm"
                                                        >
                                                            <span>{ex.exercise_name}</span>
                                                            <span>
                                                                {ex.sets} x {ex.reps} | Rest: {ex.rest_time}s
                                                            </span>
                                                        </div>
                                                    ))}
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </>
                                )}

                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="dietPlan" title="Diet Plan">
                        <Card>
                            <CardHeader className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Assigned Diet Plan</h3>

                                <Button
                                    size="sm"
                                    color="warning"
                                    variant="flat"
                                    onClick={() => {
                                        fetchDietPlans();
                                        setIsDietModalOpen(true);
                                    }}
                                >
                                    Assign / Change
                                </Button>
                            </CardHeader>

                            <CardBody>

                                {!assignedDiet ? (
                                    <p className="text-gray-500 text-center">
                                        No diet plan assigned.
                                    </p>
                                ) : (
                                    <>
                                        {/* Plan Info */}
                                        <div className="mb-4">
                                            <h4 className="text-xl font-semibold text-warning-500">
                                                {assignedDiet.diet_plan?.title}
                                            </h4>

                                            <div className="text-sm text-gray-500 mt-1">
                                                Goal: {assignedDiet.diet_plan?.goal}
                                            </div>

                                            {assignedDiet.start_date && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Start Date: {assignedDiet.start_date}
                                                </div>
                                            )}
                                        </div>

                                        {/* Days & Meals */}
                                        <Accordion variant="splitted">
                                            {assignedDiet.diet_plan?.days?.map((day) => (
                                                <AccordionItem
                                                    key={day.id}
                                                    title={day.day_name}
                                                >
                                                    {day.meals.length === 0 ? (
                                                        <p className="text-gray-400 text-sm">
                                                            No meals added.
                                                        </p>
                                                    ) : (
                                                        day.meals.map((meal) => (
                                                            <div
                                                                key={meal.id}
                                                                className="flex justify-between py-2 text-sm border-b"
                                                            >
                                                                <div>
                                                                    <div className="font-medium">
                                                                        {meal.meal_type}
                                                                    </div>
                                                                    <div className="text-gray-500">
                                                                        {meal.food_name}
                                                                    </div>
                                                                </div>

                                                                <div className="text-right text-gray-500">
                                                                    <div>{meal.quantity}</div>
                                                                    <div>{meal.calories} kcal</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </>
                                )}
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>


            </div>
            <Modal
                isOpen={isWorkoutModalOpen}
                onClose={() => setIsWorkoutModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>Assign Workout Plan</ModalHeader>

                    <ModalBody className="space-y-4">

                        <Select
                            label="Select Workout Plan"
                            selectedKeys={
                                selectedWorkoutPlan
                                    ? new Set([String(selectedWorkoutPlan)])
                                    : new Set()
                            }
                            onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                setSelectedWorkoutPlan(Number(value));
                            }}
                        >
                            {workoutPlans.map((plan) => (
                                <SelectItem key={String(plan.id)}>
                                    {plan.title}
                                </SelectItem>
                            ))}
                        </Select>

                        <div>
                            <label className="text-sm text-gray-500">Start Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-md p-2 mt-1"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">End Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-md p-2 mt-1"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="warning"
                            onClick={handleAssignWorkout}
                        >
                            Assign
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isDietModalOpen}
                onClose={() => {
                    setIsDietModalOpen(false);
                    setSelectedDietPlan(null);
                }}
            >
                <ModalContent>
                    <ModalHeader>Assign Diet Plan</ModalHeader>

                    <ModalBody>

                        {isDietLoading ? (
                            <p className="text-center text-gray-500">
                                Loading diet plans...
                            </p>
                        ) : (
                            <Select
                                label="Select Diet Plan"
                                placeholder="Choose diet plan"
                                selectedKeys={
                                    selectedDietPlan
                                        ? new Set([String(selectedDietPlan)])
                                        : new Set()
                                }
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    setSelectedDietPlan(Number(value));
                                }}
                            >
                                {dietPlans.map((plan) => (
                                    <SelectItem key={String(plan.id)}>
                                        {plan.title}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="light"
                            onClick={() => {
                                setIsDietModalOpen(false);
                                setSelectedDietPlan(null);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="warning"
                            onClick={handleAssignDiet}
                            isDisabled={!selectedDietPlan}
                        >
                            Assign
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}