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




export default function ShowWorkoutPlan() {
    const { id } = useParams();
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dayTitle, setDayTitle] = useState("");
    const [dayNumber, setDayNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
    const [selectedDayId, setSelectedDayId] = useState(null);

    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [restTime, setRestTime] = useState("90");

    const openExerciseModal = (dayId) => {
        setSelectedDayId(dayId);
        setIsExerciseModalOpen(true);
    };

    const handleAddDay = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/${id}/add-days`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: dayTitle,
                        day_number: dayNumber,
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
                setDayTitle("");
                fetchWorkoutPlan(); // refresh data
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

    const handleAddExercise = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/days/${selectedDayId}/add-exercises`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        exercise_name: exerciseName,
                        sets: sets,
                        reps: reps,
                        rest_time: restTime,
                    }),
                }
            );

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Exercise Added",
                    description: "Exercise added successfully",
                    color: "success",
                });

                setIsExerciseModalOpen(false);

                // Reset form
                setExerciseName("");
                setSets("");
                setReps("");
                setRestTime("90");

                fetchWorkoutPlan();
            } else {
                addToast({
                    title: "Error",
                    description: res.message || "Something went wrong",
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

    useEffect(() => {
        fetchWorkoutPlan();
    }, [id]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



    const fetchWorkoutPlan = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/show/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            if (res.status === true) {
                setWorkoutPlan(res.data);
            }
        } catch (error) {
            // console.error("Error fetching user:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>View Workout Plan</title>
            </Helmet>

            <AdminNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center">View</h1>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={`/admin/workout-plans`}>Workout Plans</Link></BreadcrumbItem>
                            <BreadcrumbItem>{workoutPlan.title}</BreadcrumbItem>
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
                                    View Workout Plan
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
                                <p className="font-semibold">{workoutPlan?.title}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Level</p>
                                <p className="font-semibold">{workoutPlan?.level}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">
                                Exercises
                            </h4>
                            {workoutPlan?.days?.length > 0 ? (
                                <>
                                    <Accordion variant="shadow">
                                        {workoutPlan.days.map((day, index) => (
                                            <AccordionItem
                                                key={day.id || index}
                                                aria-label={day.title}
                                                title={
                                                    <div className="flex justify-between items-center w-full">
                                                        <span>{day.title}</span>
                                                        <Button
                                                            size="sm"
                                                            color="warning"
                                                            variant="flat"
                                                            onPress={() => openExerciseModal(day.id)}
                                                        >
                                                            Add Exercise
                                                        </Button>
                                                    </div>
                                                }
                                            >
                                                {day.exercises?.length > 0 ? (
                                                    <Table aria-label="Example static collection table">
                                                        <TableHeader>
                                                            <TableColumn>EXCERCISE</TableColumn>
                                                            <TableColumn>SETS</TableColumn>
                                                            <TableColumn>REPS</TableColumn>
                                                            <TableColumn>REST</TableColumn>
                                                            <TableColumn>ACTIONs</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>


                                                            {day.exercises.map((exercise, i) => (
                                                                <TableRow key="1">
                                                                    <TableCell>{exercise.exercise_name}</TableCell>
                                                                    <TableCell>{exercise.sets}</TableCell>
                                                                    <TableCell>{exercise.reps}</TableCell>
                                                                    <TableCell>{exercise.rest_time}</TableCell>
                                                                    <TableCell>Active</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <p className="text-gray-400">No exercises added.</p>
                                                )}
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </>
                            ) : (
                                <p className="text-gray-400">No Days added.</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                variant="flat"
                                onPress={() => navigate("/admin/workout-plans")}
                            >
                                Back
                            </Button>

                            <Button
                                color="warning"
                                onPress={() =>
                                    navigate(`/admin/workout-plans/update/${workoutPlan?.id}`)
                                }
                            >
                                Update Plan
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>Add Workout Day</ModalHeader>

                    <ModalBody>
                        <Input
                            label="Day Name"
                            placeholder="Enter Day"
                            value={dayTitle}
                            onChange={(e) => setDayTitle(e.target.value)}
                        />
                        <Input
                            label="Day Number"
                            placeholder="Enter Day Number"
                            value={dayNumber}
                            onChange={(e) => setDayNumber(e.target.value)}
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
                isOpen={isExerciseModalOpen}
                onClose={() => setIsExerciseModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>Add Exercise</ModalHeader>

                    <ModalBody className="space-y-4">
                        <Input
                            label="Exercise Name"
                            placeholder="Enter Exercise Name"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />

                        <Input
                            label="Sets"
                            placeholder="Enter Sets"
                            type="number"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        />

                        <Input
                            label="Reps"
                            placeholder="Enter Reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        />

                        <Input
                            label="Rest Time (seconds)"
                            type="number"
                            value={restTime}
                            onChange={(e) => setRestTime(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="flat"
                            onPress={() => setIsExerciseModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="warning"
                            isLoading={loading}
                            onPress={handleAddExercise}
                        >
                            Add Exercise
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}