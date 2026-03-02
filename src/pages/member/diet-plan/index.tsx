import MemberNavbarComponent from "../components/navbar";
import { Helmet } from "react-helmet-async";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useEffect, useState } from "react";
import { Dumbbell } from 'lucide-react';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";




const ViewMyDietPlan = () => {
    const [dietPlan, setDietPlan] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchDietPlan();
    }, []);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



    const fetchDietPlan = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/member/diet-plans/view`,
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
                setIsLoading(false);
            }
        } catch (error) {
            // console.error("Error fetching user:", error);
        }
    };
    return (
        <>
            <Helmet>
                <title>Diet Plan | Gym Membership & Management System</title>
            </Helmet>
            <MemberNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <div className="flex w-full justify-center">
                        {isLoading ? <Skeleton className="h-6 w-30 rounded-md justify-end" /> : <h1 className="text-2xl font-bold text-center">{dietPlan?.title}</h1>}
                        </div>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={`/member/dashboard`}>Dashboard</Link></BreadcrumbItem>
                            <BreadcrumbItem>Diet Plan</BreadcrumbItem>
                            <BreadcrumbItem>{isLoading ? <Skeleton className="h-4 w-20 rounded-md" /> : `${dietPlan?.title}`}</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>

                <Card className="mb-6 p-5">
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                                <h3 className="font-semibold text-lg text-default-500">
                                    Diet Plan
                                </h3>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Title</p>
                                <p className="font-semibold">{isLoading ? <Skeleton className="h-4 w-20 rounded-md mt-2" /> : `${dietPlan?.title}`}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Level</p>
                                <p className="font-semibold capitalize">{isLoading ? <Skeleton className="h-4 w-20 rounded-md mt-2" /> : `${dietPlan?.level}`}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-3">
                                Meals
                            </h4>
                            {isLoading ? 
                                <div className="flex w-full justify-center">
                                  <Spinner color="warning" label="Loading" />
                                </div>

                            : dietPlan?.days?.length > 0 ? (
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

                                                    </div>
                                                }
                                            >
                                                {day.meals?.length > 0 ? (
                                                    <Table aria-label="Example static collection table">
                                                        <TableHeader>
                                                            <TableColumn>Type</TableColumn>
                                                            <TableColumn>Meal</TableColumn>
                                                            <TableColumn>Quantity</TableColumn>
                                                            <TableColumn>Calories</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>


                                                            {day.meals.map((meal, i) => (
                                                                <TableRow key="1">
                                                                    <TableCell>{meal.meal_type}</TableCell>
                                                                    <TableCell>{meal.food_name}</TableCell>
                                                                    <TableCell>{meal.quantity}</TableCell>
                                                                    <TableCell>{meal.calories}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <p className="text-gray-400">No meals added.</p>
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

export default ViewMyDietPlan