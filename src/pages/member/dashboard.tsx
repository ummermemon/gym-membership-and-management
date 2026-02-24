import MemberNavbarComponent from "./components/navbar";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
export default function MemberDashboardPage() {

    return (
        <>
            <MemberNavbarComponent />
            <div className="p-6 space-y-6 ">

                {/* Greeting Section */}
                <div className="flex items-center justify-between bg-content1 p-6 rounded-2xl shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome Back, Ummer 👋</h1>
                        <p className="text-default-500">
                            Stay consistent. Stay strong. Your fitness journey continues today.
                        </p>
                    </div>
                    <Avatar
                        src="/assets/images/profile.png"
                        className="w-16 h-16"
                    />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <Card className="shadow-sm">
                        <CardBody className="space-y-2">
                            <p className="text-default-500">Workout Progress</p>
                            <Progress value={70} />
                            <p className="text-sm font-semibold">70% Completed</p>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm">
                        <CardBody>
                            <p className="text-default-500">Diet Plan</p>
                            <p className="text-xl font-bold">Active</p>
                            <Chip color="success" variant="flat">
                                Following
                            </Chip>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm">
                        <CardBody>
                            <p className="text-default-500">Attendance</p>
                            <p className="text-xl font-bold">22 Days</p>
                            <p className="text-sm text-default-400">This Month</p>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm">
                        <CardBody>
                            <p className="text-default-500">Notifications</p>
                            <p className="text-xl font-bold">3 New</p>
                            <Chip color="danger" variant="flat">
                                Important
                            </Chip>
                        </CardBody>
                    </Card>
                </div>

                {/* Workout & Diet Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Workout Plan */}
                    <Card className="shadow-sm">
                        <CardHeader className="flex justify-between">
                            <h3 className="font-semibold text-lg">Today's Workout</h3>
                            <Button size="sm" variant="light">
                                View Full Plan
                            </Button>
                        </CardHeader>
                        <Divider />
                        <CardBody className="space-y-3">
                            <p>🏋️ Chest Press – 4 x 12</p>
                            <p>💪 Dumbbell Fly – 3 x 15</p>
                            <p>🔥 Push Ups – 3 x 20</p>
                        </CardBody>
                    </Card>

                    {/* Diet Plan */}
                    <Card className="shadow-sm">
                        <CardHeader className="flex justify-between">
                            <h3 className="font-semibold text-lg">Today's Diet</h3>
                            <Button size="sm" variant="light">
                                View Full Plan
                            </Button>
                        </CardHeader>
                        <Divider />
                        <CardBody className="space-y-3">
                            <p>🥣 Breakfast – Oats + Banana + Milk</p>
                            <p>🍗 Lunch – Grilled Chicken + Rice</p>
                            <p>🥗 Dinner – Salad + Boiled Eggs</p>
                        </CardBody>
                    </Card>

                </div>

                {/* Announcements */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Gym Announcements</h3>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-4">
                        <div>
                            <p className="font-semibold">New Zumba Batch Starting!</p>
                            <p className="text-default-500 text-sm">
                                Join our new Zumba batch starting from Monday at 6 AM.
                            </p>
                        </div>
                        <Divider />
                        <div>
                            <p className="font-semibold">Maintenance Notice</p>
                            <p className="text-default-500 text-sm">
                                Gym will remain closed on Sunday for equipment maintenance.
                            </p>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </>
    );
}
