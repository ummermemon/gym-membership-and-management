import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { User } from "@heroui/user";
import { Pagination } from "@heroui/pagination";
import { useState, useMemo, useCallback } from "react";
import { ChevronDown, Delete, Edit, Eye, EyeClosed, PencilLine, Plus, Search, Trash2, X } from "lucide-react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { useEffect } from "react";
import { Tooltip } from "@heroui/tooltip";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
export const EyeIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const DeleteIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};
export default function UsersListComponent() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onOpenChange: onDeleteOpenChange,
    } = useDisclosure();
    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onOpenChange: onUpdateOpenChange,
    } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [updateUserId, setUpdateUserId] = useState(null);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "member",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const pages = Math.max(1, Math.ceil(users.length / rowsPerPage));

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users, rowsPerPage]);
    useEffect(() => {
        if (page > pages) {
            setPage(1);
        }
    }, [users, pages]);
    // Pagination



    // Fetch users API Call 
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/users/list`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setUsers(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };


    const generatePassword = () => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setFormData((prev) => ({
            ...prev,
            password,
        }));
    };
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleAddUser = async (onClose) => {
        try {
            setIsSubmitting(true);

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/users/store`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "User Added",
                    description: "New user added successfully",
                    variant: "flat",
                    color: "warning",
                });
            } else {
                addToast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "flat",
                    color: "danger",
                });
                return;
            }

            // Refresh users list
            fetchUsers();

            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                role: "member",
            });

            onClose();
        } catch (error) {
            addToast({
                title: "Error",
                description: "Something went wrong",
                variant: "flat",
                color: "danger",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleDeleteUser = async (id) => {

        // if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/admin/users/destroy/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "User Deleted!",
                    description: "User deleted successfully..",
                    variant: "flat",
                    color: "warning",
                });
                // Refresh users list
                fetchUsers();
            } else {
                addToast({
                    title: "Error",
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
            });
        }
    };
    const handleUpdateUser = async (onClose) => {
        alert('Update user called');
        return;
    };


    const topContent = useMemo(() => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex w-sm flex-wrap md:flex-nowrap gap-4">

                </div>
                <div className="flex gap-4">
                    <Button color="warning" startContent={<Plus size={20} strokeWidth={1} />} onPress={onOpen}>Add User</Button>
                </div>
            </div>
        );
    }, []);

    /* -------------------- BOTTOM CONTENT -------------------- */

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <span className="text-default-400 text-small">
                Total {users.length} users
            </span>
            <div>
                {!isLoading && (
                    <Pagination
                        showControls
                        showShadow
                        color="warning"
                        page={page}
                        total={pages}
                        onChange={setPage}
                    />
                )}
            </div>
        </div>
    );

    return (
        <>

            <div className="m-4 p-5">
                <Table
                    isHeaderSticky
                    aria-label="Admin Users Table"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    topContent={topContent}
                    topContentPlacement="outside"
                >
                    <TableHeader >
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>MEMBERSHIP</TableColumn>
                        <TableColumn>REGISTERED AT</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>

                    <TableBody
                        emptyContent={"No users found"}
                        items={items}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>#{item.id}</TableCell>
                                <TableCell>
                                    <User
                                        avatarProps={{
                                            radius: "lg",
                                            src: `${API_BASE_URL}/storage/users/profile_images/${item.profile_img}`,
                                            name: `${item.fname} ${item.lname}`,
                                            showFallback: true
                                        }}
                                        description={item.role === "admin" ? "Admin" : "Member"}
                                        name={`${item.fname} ${item.lname}`}
                                    />
                                </TableCell>
                                <TableCell>
                                    {item.email}
                                </TableCell>
                                <TableCell>
                                    {item.active_membership?.status === "active" ? (
                                        <Chip color="warning" variant="flat">
                                            Active
                                        </Chip>
                                    ) : (
                                        <Chip color="danger" variant="flat">
                                            Inactive
                                        </Chip>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {
                                        new Date(item.created_at).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }).replace(", ", " ", ", ")
                                    }
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                onClick={() => navigate(`/admin/users/view/${item.id}`)}
                                            >
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Edit">
                                            <span
                                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                onClick={() => {
                                                    setUpdateUserId(item.id);
                                                    setFormData({
                                                        first_name: item.fname,
                                                        last_name: item.lname,
                                                        email: item.email,
                                                        password: "", // optional (usually don’t prefill password)
                                                        role: item.role,
                                                    });
                                                    onUpdateOpen();
                                                }}
                                            >
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete">
                                            <span
                                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                                // onClick={() => handleDeleteUser(item.id)}
                                                onClick={() => {
                                                    setDeleteUserId(item.id);
                                                    onDeleteOpen();
                                                }}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New User</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-6">
                                        <Input
                                            variant="flat"
                                            label="First Name"
                                            isRequired
                                            value={formData.first_name}
                                            onValueChange={(value) =>
                                                handleChange("first_name", value)
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <Input
                                            variant="flat"
                                            label="Last Name"
                                            isRequired
                                            value={formData.last_name}
                                            onValueChange={(value) =>
                                                handleChange("last_name", value)
                                            }
                                        />
                                    </div>

                                    <div className="col-span-12">


                                        <Input
                                            label="Email"
                                            type="email"
                                            variant="flat"
                                            isRequired
                                            value={formData.email}
                                            onValueChange={(value) =>
                                                handleChange("email", value)
                                            }
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex flex-col ">
                                            <Input
                                                label="Password"
                                                variant="flat"
                                                isRequired
                                                value={formData.password}
                                                onValueChange={(value) =>
                                                    handleChange("password", value)
                                                }
                                                type={isVisible ? "text" : "password"}
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
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <Button
                                            onPress={generatePassword}
                                            color="warning"
                                            variant="flat"
                                            className="cursor-pointer w-full"
                                        >
                                            Generate
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="warning"
                                    isLoading={isSubmitting}
                                    onPress={() => handleAddUser(onClose)}
                                >
                                    Add User
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isDeleteOpen} placement="top-center" onOpenChange={onDeleteOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete User</ModalHeader>
                            <ModalBody>
                                <div className="">
                                    Are you sure want to delete this user?
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    <X size={15} strokeWidth={1} />  Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={() => {
                                        handleDeleteUser(deleteUserId);
                                        onClose();
                                    }}
                                >
                                    <Trash2 size={15} strokeWidth={1} /> Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isUpdateOpen}
                placement="top-center"
                onOpenChange={onUpdateOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Update User</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-6">
                                        <Input
                                            label="First Name"
                                            variant="flat"
                                            value={formData.first_name}
                                            onValueChange={(value) =>
                                                handleChange("first_name", value)
                                            }
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <Input
                                            label="Last Name"
                                            variant="flat"
                                            value={formData.last_name}
                                            onValueChange={(value) =>
                                                handleChange("last_name", value)
                                            }
                                            isRequired
                                        />
                                    </div>

                                    <div className="col-span-12">
                                        <Input
                                            label="Email"
                                            type="email"
                                            variant="flat"
                                            value={formData.email}
                                            onValueChange={(value) =>
                                                handleChange("email", value)
                                            }
                                            isRequired
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="warning"
                                    onPress={() => handleUpdateUser(onClose)}
                                >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}