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


export default function UpdateWorkoutPlan() {
    const { id } = useParams();
    const [workoutPlan, setWorkoutPlan] = useState([]);
    const [title, setTitle] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkoutPlans();
    }, [id]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchWorkoutPlans = async () => {
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
            setWorkoutPlan(res.data);
            setTitle(res.data.title);
            setLevel(res.data.level);
        } catch (error) {
            // console.error("Error fetching user:", error);
        }
    };

    const handleSubmit = async () => {
        try {

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/workout-plans/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: title,
                        level: level
                    }),
                }
            );

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Updated Successfully",
                    description: "Workout Plan Updated successfully",
                    variant: "flat",
                    color: "warning",
                });
                navigate('/admin/workout-plans');
                
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "flat",
                    color: "danger",
                });
                return;
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

    return (
        <>
            <Helmet>
                <title>Update Workout Plan</title>
            </Helmet>

            <AdminNavbarComponent />

            <div className="p-6 max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="flex justify-center items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center">Update</h1>
                        <Breadcrumbs>
                            <BreadcrumbItem><Link to={`/admin/workout-plans`}>Workout Plans</Link></BreadcrumbItem>
                            <BreadcrumbItem>{workoutPlan.title}</BreadcrumbItem>
                            <BreadcrumbItem>Update</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>

                {/* Profile Card */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <Dumbbell strokeWidth={1} className="text-warning-500" />
                            <h3 className="font-semibold text-lg text-default-500">
                                Update Workout Plan
                            </h3>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
    }}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} isRequired />
                                </div>
                                <div className="col-span-12">
                                    <Select className="" selectedKeys={level ? [level] : []} onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0];
                                        setLevel(selected);
                                    }} label="Select Level" isRequired>
                                        <SelectItem key="beginner">Beginner</SelectItem>
                                        <SelectItem key="intermediate">Intermediate</SelectItem>
                                        <SelectItem key="advanced">Advanced</SelectItem>
                                    </Select>
                                </div>
                                <Button color="warning" type="submit">Submit</Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}