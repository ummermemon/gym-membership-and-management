import { Button } from "@heroui/button";
import { Card,CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";


export default function ForgotPasswordPage() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-fit h-fit">
          <Card className="p-5">
            <CardHeader>
              <Image src="assets/images/logo/erased-horizontal.png" className="h-30" />
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4">
                <Input label="Email" type="email" isRequired />
                <Button color="primary" variant="shadow" size="md">
                  Send OTP
                </Button>
              </div>
              <span className="text-gray-600 text-sm mt-6 text-center">&copy; {new Date().getFullYear()} Gym Membership & Management System</span>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
