import AdminNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dumbbell } from 'lucide-react';
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import {Tabs, Tab, Chip} from "@heroui/react";




export const DeleteIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export default function ShowDietPlan() {
    const { id } = useParams();
    const [dietPlan, setDietPlan] = useState([]);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dayName, setDayName] = useState("");
    const [loading, setLoading] = useState(false);

    const [isMealModalOpen, setIsMealModalOpen] = useState(false);
    const [selectedDayId, setSelectedDayId] = useState(null);

    const [foodName, setFoodName] = useState("");
    const [mealType, setMealType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [calories, setCalories] = useState("");

    const openMealModal = (dayId) => {
        setSelectedDayId(dayId);
        setIsMealModalOpen(true);
    };

    const handleAddDay = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/${id}/add-day`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        day_name: dayName,
                    }),
                }
            );

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Day Added",
                    description: "Day Added Successfully",
                    color: "warning"
                });

                setIsOpen(false);
                setDayName("");
                fetchDietPlan(); // refresh data
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    color: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Error",
                description: "Server error",
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddMeal = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/day/${selectedDayId}/add-meal`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        food_name: foodName,
                        meal_type: mealType,
                        quantity: quantity,
                        calories: calories,
                    }),
                }
            );

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Meal Added",
                    description: "Meal added successfully",
                    color: "success",
                });

                setIsMealModalOpen(false);

                // Reset form
                setFoodName("");
                setMealType("");
                setQuantity("");
                setCalories("");

                fetchDietPlan();
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    color: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Error",
                description: "Server error",
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMeal = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Meal?")) return;

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/admin/diet-plans/meal/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Meal Deleted!",
                    description: "Meal deleted successfully..",
                    variant: "flat",
                    color: "warning",
                });
                fetchDietPlan();
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "flat",
                    color: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Error",
                description: "Something went wrong",
                variant: "flat",
                color: "danger",
            });
        }
    };

    const handleDeleteDay = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Day?")) return;

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/admin/diet-plans/day/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Day Deleted!",
                    description: "Day deleted successfully..",
                    variant: "flat",
                    color: "warning",
                });
                fetchDietPlan();
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "flat",
                    color: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Error",
                description: "Something went wrong",
                variant: "flat",
                color: "danger",
            });
        }
    };

    useEffect(() => {
        fetchDietPlan();
    }, [id]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



    const fetchDietPlan = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/show/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            if (res.status === true) {
                setDietPlan(res.data);
            }
        } catch (error) {
            // console.error("Error fetching user:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>View Diet Plan</title>
            </Helmet>

            <AdminNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center">View</h1>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={`/admin/diet-plans`}>Diet Plans</Link></BreadcrumbItem>
                            <BreadcrumbItem>{dietPlan.title}</BreadcrumbItem>
                            <BreadcrumbItem>View</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
                
                {/* Profile Card */}
                <Card className="mb-6 p-5">
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">

                                <Dumbbell strokeWidth={1} className="text-warning-500" />
                                <h3 className="font-semibold text-lg text-default-500">
                                    View Diet Plan
                                </h3>
                            </div>
                            <Button color="warning" onPress={() => setIsOpen(true)}>
                                Add Day
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Title</p>
                                <p className="font-semibold">{dietPlan?.title}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Level</p>
                                <p className="font-semibold capitalize">{dietPlan?.level}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">
                                Meals
                            </h4>
                            {dietPlan?.days?.length > 0 ? (
                                <>
                                    <Accordion variant="shadow" >
                                        {dietPlan.days.map((day, index) => (
                                            <AccordionItem
                                                key={day.id || index}
                                                aria-label={day.day_name}
                                                className="p-2"
                                                title={
                                                    <div className="flex justify-between items-center w-full">
                                                        <span>{day.day_name}</span>
                                                        <div className="flex gap-2">

                                                        
                                                        <Button
                                                            size="sm"
                                                            color="danger"
                                                            variant="flat"
                                                            onPress={() => handleDeleteDay(day.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            color="warning"
                                                            variant="flat"
                                                            onPress={() => openMealModal(day.id)}
                                                        >
                                                            Add
                                                        </Button>
                                                        </div>

                                                    </div>
                                                }
                                            >
                                                {day.meals?.length > 0 ? (
                                                    <Table aria-label="Example static collection table">
                                                        <TableHeader>
                                                            <TableColumn>Food</TableColumn>
                                                            <TableColumn>Meal Type</TableColumn>
                                                            <TableColumn>ACTIONs</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {day.meals.map((meal, i) => (
                                                                <TableRow key="1">
                                                                    <TableCell>{meal.food_name}</TableCell>
                                                                    <TableCell>{meal.meal_type}</TableCell>
                                                                    <TableCell>
                                                                        <Tooltip color="danger" content="Delete Diet Plan">
                                                                            <span
                                                                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                                                                onClick={() => handleDeleteMeal(meal.id)}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <p className="text-gray-400">No Meals added.</p>
                                                )}
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </>
                            ) : (
                                <p className="text-gray-400">No Days added.</p>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>Add Diet Plan Day</ModalHeader>

                    <ModalBody>
                        <Input
                            label="Day Name"
                            placeholder="Enter Day"
                            value={dayName}
                            onChange={(e) => setDayName(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="flat" onPress={() => setIsOpen(false)}>
                            Cancel
                        </Button>

                        <Button
                            color="warning"
                            isLoading={loading}
                            onPress={handleAddDay}
                        >
                            Add Day
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isMealModalOpen}
                onClose={() => setIsMealModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>Add Meal</ModalHeader>
                    <ModalBody className="space-y-4">
                        <Input
                            label="Food Name"
                            placeholder="Enter Food Name"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                        <Input
                            label="Meal Type"
                            placeholder="Enter Meal Type"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        />
                        <Input
                            label="Quantity"
                            placeholder="Enter Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Input
                            label="Calories"
                            placeholder="Enter Calories"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="flat"
                            onPress={() => setIsMealModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="warning"
                            isLoading={loading}
                            onPress={handleAddMeal}
                        >
                            Add Meal
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}