import MemberNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useEffect, useState } from "react";
import { Dumbbell } from 'lucide-react';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";
import { useRef } from "react";




const ViewMyWorkoutPlan = () => {
    const [workoutPlan, setWorkoutPlan] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const hasFetched = useRef(false);

    useEffect(() => {
    if (!hasFetched.current) {
        fetchWorkoutPlan();
        hasFetched.current = true;
    }
}, []);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



    const fetchWorkoutPlan = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/member/workout-plans/view`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            if (res.status === true) {
                setWorkoutPlan(res.data[0]);
                setIsLoading(false);
            }else{
                addToast({
                    title: res.message || "Something went wrong",
                    variant: "flat",
                    color: "danger",
                });
                navigate('/member/dashboard');
            }
        } catch (error) {
                navigate('/member/dashboard');
            // console.error("Error fetching user:", error);
        }
    };
    return (
        <>
            <Helmet>
                <title>Workout Plan | Gym Membership & Management System</title>
            </Helmet>
            <MemberNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <div className="flex w-full justify-center">
                        {isLoading ? <Skeleton className="h-6 w-30 rounded-md justify-end" /> : <h1 className="text-2xl font-bold text-center">{workoutPlan?.title}</h1>}
                        </div>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={`/member/dashboard`}>Dashboard</Link></BreadcrumbItem>
                            <BreadcrumbItem>Workout Plan</BreadcrumbItem>
                            <BreadcrumbItem>{isLoading ? <Skeleton className="h-4 w-20 rounded-md" /> : `${workoutPlan?.title}`}</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
                <Card className="mb-6 p-5">
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-default-500">
                                    Workout Plan
                                </h3>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Title</p>
                                <p className="font-semibold">{isLoading ? <Skeleton className="h-4 w-20 rounded-md mt-2" /> : `${workoutPlan?.title}`}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Level</p>
                                <p className="font-semibold capitalize">{isLoading ? <Skeleton className="h-4 w-20 rounded-md mt-2" /> : `${workoutPlan?.level}`}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">
                                Exercises
                            </h4>
                            {isLoading ? 
                                <div className="flex w-full justify-center">
                                  <Spinner color="warning" label="Loading" />
                                </div>

                            : workoutPlan?.days?.length > 0 ? (
                                <>
                                    <Accordion variant="splitted" >
                                        {workoutPlan.days.map((day, index) => (
                                            <AccordionItem
                                                key={day.id || index}
                                                aria-label={day.title}
                                                className="p-3"
                                                title={
                                                    <div className="flex justify-between items-center w-full">
                                                        <span>{day.title}</span>

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
                                                        </TableHeader>
                                                        <TableBody>


                                                            {day.exercises.map((exercise, i) => (
                                                                <TableRow key="1">
                                                                    <TableCell>{exercise.exercise_name}</TableCell>
                                                                    <TableCell>{exercise.sets}</TableCell>
                                                                    <TableCell>{exercise.reps}</TableCell>
                                                                    <TableCell>{exercise.rest_time}</TableCell>
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
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default ViewMyWorkoutPlan