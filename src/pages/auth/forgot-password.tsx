import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";
import { useState } from "react";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();
      if (data.status === true) {
        addToast({
          title: "Rest Link Sent!",
          description: "Reset Link has been sent to the Email",
          variant: "flat",
          color: "success"
        });
        setIsSubmitting(false);
      } else {
        if (data.status == false && data.message) {
          addToast({
            title: "Error",
            description: "Please try again later",
            variant: "flat",
            color: "danger",
          });
          setIsSubmitting(false);
        } else {
          addToast({
            title: "Error",
            description: "Something wrong",
            variant: "flat",
            color: "danger",
          });
          setIsSubmitting(false);
        }
      }

    } catch (error) {
      addToast({
        title: "Error",
        description: "Something went wrong",
        variant: "flat",
        color: "danger",
      });
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div className=" min-h-screen flex items-center justify-center">
        <div className="w-fit h-fit">
          <Card className="p-5">
            <CardHeader className="w-full flex justify-center">
              <Image
                src="assets/images/logo/logo/black/erased.png"
                className="h-30 block dark:hidden"
              />
              <Image
                src="assets/images/logo/logo/white/erased.png"
                className="h-30 hidden dark:block"
              />
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <Input label="Email" type="email" isRequired onChange={(e) => setEmail(e.target.value)} />
                  <Button isLoading={isSubmitting} type="submit" color="warning" variant="shadow" size="md">
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
