import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";
import { Eye, EyeClosed } from 'lucide-react';
import { Checkbox } from "@heroui/checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        addToast({
          title: "Login Successful!",
          description: "You've successfully logged in",
          variant: "flat",
          color: "primary",
        });
        if (rememberMe) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
        } else {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.user.role);
        }
        navigate('/member/dashboard');
      } else {
        addToast({
          title: "Login Failed",
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
      })
    }
  };

  return (
    <>
      <Helmet>
        <title>Let's Login!</title>
      </Helmet>
      <div className=" min-h-screen flex items-center justify-center">
        <div className="w-fit h-fit">
          <Card className="p-5">
            <CardHeader>
              <Image src="assets/images/logo/erased-horizontal.png" className="h-30" />
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-4">
                  <Input label="Email" type="email" isRequired onChange={(e) => setEmail(e.target.value)} />
                  <Input
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeClosed className="text-2xl text-default-400 cursor-pointer" />
                        ) : (
                          <Eye className="text-2xl text-default-400 cursor-pointer" />
                        )}
                      </button>
                    }
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                  />
                  <div className="mt-2 flex justify-between">
                    <Checkbox size="sm" checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}><div className="text-sm text-gray-600">Remember Me</div></Checkbox>
                    <Link to={"/forgot-password"} className="text-gray-600 text-sm">Forgot Password?</Link>
                  </div>
                  <Button type="submit" color="primary" variant="shadow" size="md">
                    Login
                  </Button>
                </div>
              </form>
              <span className="text-gray-600 text-sm mt-6 text-center">&copy; {new Date().getFullYear()} Gym Membership & Management System</span>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
