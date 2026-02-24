import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Helmet } from "react-helmet-async";
import { Image } from "@heroui/image";

export default function IndexPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Welcome to Gym Membership and Management System</title>
      </Helmet>
      <div className="min-h-screen relative">
        <section
          className="min-h-screen h-full w-full flex items-center bg-cover"
          style={{ backgroundImage: "url('/assets/images/hero-section/2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-3xl px-20 ">
            
            <h1 className="text-4xl md:text-5xl font-bold text-warning-500 mb-6">
              Gym Membership & Management System
            </h1>
            <p className="text-lg text-gray-400 text-justify md:text-md mb-8">
              A modern web-based solution that helps gym owners manage members, trainers,
              workout plans, diet plans, and announcements digitally. Members can access
              their workout and diet plans anytime without visiting the gym.
            </p>
            <div className="flex space-x-2">
              <Button as={Link} to={'/login'} color="warning" variant="shadow" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
