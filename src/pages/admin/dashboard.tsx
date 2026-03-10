import AdminNavbarComponent from "./components/navbar";
import { Helmet } from "react-helmet-async";
import { Card, CardBody, Button, Chip, User, Divider } from "@heroui/react";
import { 
  Users, 
  Dumbbell, 
  Apple, 
  CreditCard, 
  Plus, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Helmet>
                <title>Admin Dashboard | Pulse Gym</title>
            </Helmet>

            <AdminNavbarComponent currentPage="dashboard" />

            <main className="max-w-7xl mx-auto p-6 lg:p-10">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-normal">Management Console</h1>
                        <p className="text-gray-400 font-normal">Monitor and manage gym assets and users.</p>
                    </div>
                    <Button color="warning" endContent={<Plus size={18} />} radius="md">
                        Quick Action
                    </Button>
                </header>

                {/* Top Count Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <CountCard label="Members" count="1,248" icon={<Users size={20} />} />
                    <CountCard label="Workouts" count="84" icon={<Dumbbell size={20} />} />
                    <CountCard label="Diet Plans" count="62" icon={<Apple size={20} />} />
                    <CountCard label="Plans" count="4" icon={<CreditCard size={20} />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Column 1: Members & Membership Plans */}
                    <div className="space-y-8">
                        {/* Member List Preview */}
                        <ManagementSection title="Recent Members" link="/members">
                            <MemberItem name="Alex Rivera" info="Pro Member" status="Active" />
                            <Divider className="bg-zinc-800" />
                            <MemberItem name="Sarah Chen" info="Basic Plan" status="Expired" />
                            <Divider className="bg-zinc-800" />
                            <MemberItem name="Marcus Thorne" info="Elite Plan" status="Active" />
                        </ManagementSection>

                        {/* Membership Plans List */}
                        <ManagementSection title="Membership Plans" link="/membership-plans">
                            <PlanItem name="Elite Performance" price="$99/mo" users="120" />
                            <PlanItem name="Pro Monthly" price="$59/mo" users="840" />
                        </ManagementSection>
                    </div>

                    {/* Column 2: Workout & Diet Plans */}
                    <div className="space-y-8">
                        {/* Workout Plans */}
                        <ManagementSection title="Active Workout Plans" link="/workouts">
                            <AssetItem title="Hypertrophy A" category="Bodybuilding" items="12 Exercises" />
                            <AssetItem title="Fat Loss Express" category="Cardio" items="8 Exercises" />
                            <AssetItem title="Strength Core" category="Powerlifting" items="10 Exercises" />
                        </ManagementSection>

                        {/* Diet Plans */}
                        <ManagementSection title="Standard Diet Plans" link="/diet-plans">
                            <AssetItem title="Keto Advanced" category="Low Carb" items="2400 kcal" />
                            <AssetItem title="Mass Gainer" category="High Protein" items="3200 kcal" />
                        </ManagementSection>
                    </div>

                </div>
            </main>
        </div>
    );
}

/* --- UI Sub-Components --- */

function CountCard({ label, count, icon }) {
    return (
        <Card className="bg-zinc-900/40 border-zinc-800 border-1" shadow="none">
            <CardBody className="flex flex-row items-center gap-4 py-4">
                <div className="text-warning bg-warning/10 p-2 rounded-lg">{icon}</div>
                <div>
                    <p className="text-2xl font-normal leading-none">{count}</p>
                    <p className="text-xs text-gray-500 font-normal mt-1">{label}</p>
                </div>
            </CardBody>
        </Card>
    );
}

function ManagementSection({ title, children, link }) {
    return (
        <Card className="bg-zinc-900/30 border-zinc-800 border-1" shadow="none">
            <CardBody className="p-5">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-normal text-white">{title}</h3>
                    <Button as={Link} to={link} variant="light" color="warning" size="sm" endContent={<ChevronRight size={14}/>}>
                        See All
                    </Button>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </CardBody>
        </Card>
    );
}

function MemberItem({ name, info, status }) {
    return (
        <div className="flex justify-between items-center">
            <User 
                name={<span className="font-normal text-sm text-white">{name}</span>}
                description={info}
                avatarProps={{ size: "sm", radius: "md", src: `https://i.pravatar.cc/150?u=${name}` }}
            />
            <Chip size="sm" color={status === "Active" ? "warning" : "default"} variant="flat" className="font-normal">
                {status}
            </Chip>
        </div>
    );
}

function PlanItem({ name, price, users }) {
    return (
        <div className="flex justify-between items-center p-3 rounded-lg bg-black/40 border border-zinc-800">
            <div>
                <p className="text-sm font-normal">{name}</p>
                <p className="text-xs text-warning">{price}</p>
            </div>
            <p className="text-xs text-gray-500">{users} Members</p>
        </div>
    );
}

function AssetItem({ title, category, items }) {
    return (
        <div className="flex justify-between items-center group cursor-pointer hover:translate-x-1 transition-transform">
            <div>
                <p className="text-sm font-normal text-gray-200">{title}</p>
                <p className="text-xs text-gray-500">{category}</p>
            </div>
            <span className="text-xs font-normal text-zinc-600 italic">{items}</span>
        </div>
    );
}