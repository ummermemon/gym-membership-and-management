import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Image } from "@heroui/image";
import { useEffect } from "react";
import { Eye, EyeClosed } from 'lucide-react';

export default function ResetPasswordPage() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
  const togglePasswordConfirmVisibility = () => setIsPasswordConfirmVisible(!isPasswordConfirmVisible);

  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        color: "danger"
      });
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          token: token,
          password: password,
          password_confirmation: confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {

        addToast({
          title: "Success",
          description: "Password reset successfully",
          color: "success"
        });

        navigate("/login");

      } else {

        addToast({
          title: "Error",
          description: data.message || "Something went wrong",
          color: "danger"
        });

      }

    } catch (error) {

      addToast({
        title: "Error",
        description: "Server error",
        color: "danger"
      });

    }

    setLoading(false);
  };

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center">
        <div className="w-fit h-fit">
          <Card className="p-5">
            <CardHeader className="w-full flex justify-center">
              <Image
                src="/assets/images/logo/logo/black/erased.png"
                className="h-30 block dark:hidden"
              />
              <Image
                src="/assets/images/logo/logo/white/erased.png"
                className="h-30 hidden dark:block"
              />
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">

                  <Input
                    label="New Password"
                    value={password}
                    isRequired
                    onChange={(e) => setPassword(e.target.value)}
                    type={isPasswordVisible ? "text" : "password"}
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosed strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                        ) : (
                          <Eye strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                        )}
                      </button>
                    }
                  />

                  <Input
                    label="Confirm Password"
                    isRequired
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={isPasswordConfirmVisible ? "text" : "password"}
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={togglePasswordConfirmVisibility}
                      >
                        {isPasswordConfirmVisible ? (
                          <EyeClosed strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                        ) : (
                          <Eye strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                        )}
                      </button>
                    }
                  />

                  <Button
                    type="submit"
                    color="warning"
                    variant="shadow"
                    isLoading={loading}
                  >
                    Submit
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