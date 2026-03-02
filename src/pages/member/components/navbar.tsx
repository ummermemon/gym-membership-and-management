
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownSection,
} from "@heroui/dropdown";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { Image } from "@heroui/image";
import { useEffect, useState } from "react";
import { User } from "@heroui/user";
import { useNavigate } from "react-router-dom";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { Divider, Skeleton } from "@heroui/react";

import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import { addToast } from "@heroui/toast";
import { Dumbbell } from "lucide-react";
import { Eye, EyeClosed } from 'lucide-react';



export default function MemberNavbarComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isChangePasswordOpen,
        onOpen: onChangePasswordOpen,
        onOpenChange: onChangePasswordOpenChange,
    } = useDisclosure();
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditProfileSubmitting, setIsEditProfileSubmitting] = useState(false);
    const [isChangePasswordSubmitting, setIsChangePasswordSubmitting] = useState(false);

    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);

    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);

    const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] = useState(false);
    const toggleNewPasswordConfirmVisibility = () => setIsNewPasswordConfirmVisible(!isNewPasswordConfirmVisible);

    useEffect(() => {
        fetchUser();
    }, []);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        profile_img: null,
    });
    const [errors, setErrors] = useState({});
    const [changePasswordErrors, setChangePasswordErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setUser(res.data);
            setFormData({
                first_name: res.data.fname || "",
                last_name: res.data.lname || "",
                profile_img: null,
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate("/login");
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));

        if (name === "profile_img") {
            const file = files[0];

            setFormData(prev => ({
                ...prev,
                profile_img: file
            }));
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditProfileSubmitting(true);
        setErrors({});
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const form = new FormData();
        form.append("first_name", formData.first_name);
        form.append("last_name", formData.last_name);

        if (formData.profile_img) {
            form.append("profile_img", formData.profile_img);
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/member/edit-profile`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: form,
                }
            );

            const data = await response.json();
            if (response.status === 422) {
                setErrors(data.errors);
                return;
            }
            if (response.ok) {
                addToast({
                    title: "Edit Profile",
                    description: "Your profile updated successfully",
                    variant: "flat",
                    color: "success",
                });
                setPreviewImage(null);
                setIsEditProfileSubmitting(false);
                await fetchUser();
                onOpenChange(false);
            }

        } catch (error) {
            addToast({
                title: "Error",
                description: "Something went wrong",
                variant: "flat",
                color: "danger",
            });
            console.error("Error updating profile:", error);
        }
    };

    const [passwordData, setPasswordData] = useState({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsChangePasswordSubmitting(true);
        setErrors({});
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/member/change-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(passwordData),
                }
            );

            const data = await response.json();
            if (data.status == true) {
                addToast({
                    title: "Change Password",
                    description: "Password changed successfully",
                    color: "success",
                    variant: "flat"
                });
                setIsChangePasswordSubmitting(false);

                setPasswordData({
                    password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });

                onChangePasswordOpenChange(false);
            } else {
                if (data.status == false) {
                    addToast({
                        title: "Error",
                        description: data.message,
                        color: "danger",
                    });
                    setIsChangePasswordSubmitting(false);
                    return;
                } else {
                    addToast({
                        title: "Error",
                        description: "Please try again later",
                        color: "danger",
                    });
                    setIsChangePasswordSubmitting(false);
                    return;
                }
            }


        } catch (error) {
            setIsChangePasswordSubmitting(false);
        }
    };

    return (
        <>
            <Navbar className="py-5" maxWidth="full">
                <NavbarBrand className="justify-start">
                    <Image
                        src="/assets/images/logo/logo/black/erased.png"
                        className="h-20 block dark:hidden"
                    />
                    <Image
                        src="/assets/images/logo/logo/white/erased.png"
                        className="h-20 hidden dark:block"
                    />
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-8" justify="center" >
                    <NavbarItem isActive={location.pathname === "/member/dashboard"}>
                        <Link
                            as="button"
                            color={location.pathname === "/member/dashboard" ? "warning" : "foreground"}
                            onClick={() => navigate("/member/dashboard")}
                        >
                            Dashboard
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={location.pathname === "/member/workout-plan"}>
                        <Link
                            as="button"
                            color={location.pathname === "/member/workout-plan" ? "warning" : "foreground"}
                            onClick={() => navigate("/member/workout-plan")}
                        >
                            Workout Plan
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={location.pathname === "/member/diet-plan"}>
                        <Link
                            as="button"
                            color={location.pathname === "/member/diet-plan" ? "warning" : "foreground"}
                            onClick={() => navigate("/member/diet-plan")}
                        >
                            Diet Plan
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end" className="space-x-5 mr-2">
                    <ThemeSwitch />
                    <Dropdown
                        showArrow
                        classNames={{
                            base: "before:bg-default-200", // change arrow background
                            content: "p-0 border-small border-divider bg-background",
                        }}
                        radius="sm"
                    >
                        <DropdownTrigger>
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="flex flex-col">

                                        <Skeleton className="w-24 h-4 rounded-md" />
                                        <Skeleton className="w-10 h-2 rounded-md mt-2" />
                                    </div>
                                </div>
                            ) : (
                                <User
                                    avatarProps={{
                                        src: `${user?.profile_img
                                                ? `${API_BASE_URL}/storage/users/profile_images/${user.profile_img}`
                                                : "/profile.png"
                                                }`,
                                            name: `${user?.fname} ${user?.lname}`,
                                            showFallback: true,
                                    }}
                                    name={
                                        user
                                            ? `${user.fname} ${user.lname}`
                                            : <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    }
                                    description={"Gym Member"}
                                    className="cursor-pointer"
                                />
                            )}
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Custom item styles"
                            className="p-3"
                            disabledKeys={["profile"]}
                            itemClasses={{
                                base: [
                                    "rounded-md",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[hover=true]:bg-default-100",
                                    "dark:data-[hover=true]:bg-default-50",
                                    "data-[selectable=true]:focus:bg-default-50",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                            }}
                        >
                            <DropdownSection showDivider aria-label="Profile & Actions">
                                <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
                                    <User
                                        avatarProps={{
                                            src: `${user?.profile_img
                                                ? `${API_BASE_URL}/storage/users/profile_images/${user.profile_img}`
                                                : "/profile.png"
                                                }`,
                                            name: `${user?.fname} ${user?.lname}`,
                                            showFallback: true,
                                            size: "sm"
                                        }}
                                        classNames={{
                                            name: "text-default-600",
                                            description: "text-default-500",
                                        }}
                                        name={user?.fname + " " + user?.lname || "Loading"}
                                        description={"Gym Member"}
                                    />
                                </DropdownItem>
                                <DropdownItem key="editProfile" onPress={onOpen}>Edit Profile</DropdownItem>
                                <DropdownItem key="changePassword" onPress={onChangePasswordOpen}>Change Password</DropdownItem>
                            </DropdownSection>

                            <DropdownSection aria-label="Help & Feedback">
                                <DropdownItem key="logout" onClick={handleLogout}>Log Out</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            <Divider />
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
                                <ModalBody>

                                    <div className="grid grid-cols-12 space-x-3 space-y-3">
                                        <div className="col-span-12 flex flex-col items-center gap-4">

                                            {/* Avatar Wrapper */}
                                            <div className="relative group cursor-pointer">

                                                <Avatar
                                                    size="lg"
                                                    className="w-28 h-28 text-large border-4 border-warning shadow-lg transition-all duration-300 group-hover:scale-105"
                                                    src={
                                                        previewImage
                                                            ? previewImage
                                                            : user?.profile_img
                                                                ? `${API_BASE_URL}/storage/users/profile_images/${user.profile_img}`
                                                                : "/profile.png"
                                                    }
                                                />

                                                {/* Overlay */}
                                                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                                    <span className="text-white text-sm font-medium">
                                                        Change
                                                    </span>
                                                </div>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="profile_img"
                                                    onChange={handleChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>

                                            <p className="text-xs text-default-500">
                                                Click on avatar to upload a new profile picture
                                            </p>

                                        </div>
                                        <div className="col-span-6">
                                            <Input
                                                label="First Name"
                                                variant="flat"
                                                isRequired
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.first_name}
                                                errorMessage={errors.first_name?.[0]}
                                            />
                                        </div>
                                        <div className="col-span-6">
                                            <Input
                                                label="Last Name"
                                                variant="flat"
                                                name="last_name"
                                                isRequired
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.last_name}
                                                errorMessage={errors.last_name?.[0]}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <Input
                                                label="Email"
                                                variant="flat"
                                                type="email"
                                                isRequired
                                                disabled
                                                defaultValue={user.email}
                                            />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" isLoading={isEditProfileSubmitting} color="warning" >
                                        Update
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isChangePasswordOpen} placement="top-center" onOpenChange={onChangePasswordOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
                                <ModalHeader>Change Password</ModalHeader>

                                <ModalBody>
                                    <Input
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-solid outline-transparent"
                                                type="button"
                                                onClick={toggleCurrentPasswordVisibility}
                                            >
                                                {isCurrentPasswordVisible ? (
                                                    <EyeClosed strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                ) : (
                                                    <Eye strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                )}
                                            </button>
                                        }
                                        type={isCurrentPasswordVisible ? "text" : "password"}
                                        label="Current Password"
                                        name="password"
                                        value={passwordData.password}
                                        onChange={handlePasswordChange}
                                        isInvalid={!!changePasswordErrors.current_password}
                                        errorMessage={changePasswordErrors.current_password?.[0]}
                                        minLength={6}
                                        isRequired
                                    />

                                    <Input
                                         endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-solid outline-transparent"
                                                type="button"
                                                onClick={toggleNewPasswordVisibility}
                                            >
                                                {isNewPasswordVisible ? (
                                                    <EyeClosed strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                ) : (
                                                    <Eye strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                )}
                                            </button>
                                        }
                                        type={isNewPasswordVisible ? "text" : "password"}
                                        label="New Password"
                                        name="new_password"
                                        value={passwordData.new_password}
                                        minLength={6}
                                        onChange={handlePasswordChange}
                                        isRequired
                                        isInvalid={!!changePasswordErrors.new_password}
                                        errorMessage={changePasswordErrors.new_password?.[0]}
                                    />

                                    <Input
                                         endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-solid outline-transparent"
                                                type="button"
                                                onClick={toggleNewPasswordConfirmVisibility}
                                            >
                                                {isNewPasswordConfirmVisible ? (
                                                    <EyeClosed strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                ) : (
                                                    <Eye strokeWidth={1} className="text-2xl text-default-400 cursor-pointer" />
                                                )}
                                            </button>
                                        }
                                        type={isNewPasswordConfirmVisible ? "text" : "password"}
                                        label="Confirm Password"
                                        minLength={6}
                                        name="new_password_confirmation"
                                        value={passwordData.new_password_confirmation}
                                        onChange={handlePasswordChange}
                                        isRequired
                                    />
                                </ModalBody>

                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" isLoading={isChangePasswordSubmitting} color="warning">
                                        Update
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
