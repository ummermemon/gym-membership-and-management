import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Helmet } from "react-helmet-async";

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <title>Welcome to Gym Membership and Management System</title>
      </Helmet>

      <div className="min-h-screen bg-black flex items-center">
        
        <div className="w-1/2 px-20 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-warning mb-6">
            Gym Membership & Management System
          </h1>

          <p className="text-lg text-gray-400 text-justify mb-8">
            A modern web-based solution that helps gym owners manage members, 
            trainers, workout plans, diet plans, and announcements digitally. 
            Members can access their workout and diet plans anytime without visiting the gym.
          </p>

          <Button
            as={Link}
            to={"/login"}
            color="warning"
            variant="shadow"
            size="lg"
          >
            Get Started
          </Button>
        </div>

        {/* Right Video Section */}
        <div className="relative w-1/2 h-screen overflow-hidden">
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/images/hero-section/2.mp4" type="video/mp4" />
          </video>

          {/* Fade Effect (Gradient Overlay) */}
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-black/70 to-black"></div>
        </div>

      </div>
    </>
  );
}