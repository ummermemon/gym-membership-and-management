import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { useState, useMemo, useCallback } from "react";
import { ChevronDown, Delete, Edit, Eye, EyeClosed, PencilLine, Plus, Search, Trash2, } from "lucide-react";
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
export default function DietPlanListComponent() {
    const navigate = useNavigate();
    const [dietPlans, setDietPlans] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [level, setLevel] = useState("");
    const [goal, setGoal] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const pages = Math.max(1, Math.ceil(dietPlans.length / rowsPerPage));

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dietPlans.slice(start, end);
    }, [page, dietPlans, rowsPerPage]);

    useEffect(() => {
        if (page > pages) {
            setPage(1);
        }
    }, [dietPlans, pages]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    // Fetch Diet Plans API Call 
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        fetchDietPlans();
    }, []);
    const fetchDietPlans = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/list`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setDietPlans(res.data);
            setIsLoading(false);
        } catch (error) {
            // console.error("Error fetching diet plan:", error);
        }
    };
    const handleAddDietPlan = async (onClose) => {
        try {
            setIsLoading(true);

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/diet-plans/store`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: title,
                        level: level,
                        goal: goal,
                    }),
                }
            );

            const res = await response.json();

            if (res.status === true) {

                // Refresh table
                fetchDietPlans();

                // Reset form
                setTitle("");
                setLevel("");
                setGoal("");

                addToast({
                    title: "Added Successfully",
                    description: "Diet Plan Added successfully",
                    variant: "flat",
                    color: "warning",
                });

                // Close modal
                onClose();
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
    const handleDeleteDietPlan = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Diet Plan?")) return;

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}/api/admin/diet-plans/destroy/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();

            if (res.status === true) {
                addToast({
                    title: "Diet Plan Deleted!",
                    description: "Diet Plan deleted successfully..",
                    variant: "flat",
                    color: "warning",
                });
                fetchDietPlans();
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

    const topContent = useMemo(() => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex w-sm flex-wrap md:flex-nowrap gap-4">
                    
                </div>
                <div className="flex gap-4">
                    <Button color="warning" startContent={<Plus size={20} strokeWidth={1} />} onPress={onOpen} >Add Diet Plan</Button>
                </div>
            </div>
        );
    }, []);

    /* -------------------- BOTTOM CONTENT -------------------- */

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <span className="text-default-400 text-small">
                Total {dietPlans.length} Diet Plans
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
                    aria-label="Admin Diet Plan Table"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    topContent={topContent}
                    topContentPlacement="outside"
                >
                    <TableHeader >
                        <TableColumn>ID</TableColumn>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn>GOAL</TableColumn>
                        <TableColumn>LEVEL</TableColumn>
                        <TableColumn>REGISTERED AT</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>

                    <TableBody
                        emptyContent={"No Diet Plan found"}
                        items={items}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>#{item.id}</TableCell>
                                <TableCell >
                                    {item.title}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {item.goal}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {item.level}
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
                                                onClick={() => navigate(`/admin/diet-plans/show/${item.id}`)}
                                            >
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip content="Edit Diet Plan">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                            >
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete Diet Plan">
                                            <span
                                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                                onClick={() => handleDeleteDietPlan(item.id)}
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
                            <ModalHeader className="flex flex-col gap-1">Add Diet Plan</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12">
                                        <Input
                                            label="Title"
                                            variant="flat"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            isRequired
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <Select selectedKeys={level ? [level] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0];
                                                setLevel(selected);
                                            }} className="" label="Select Level" isRequired>
                                            <SelectItem key="beginner">Beginner</SelectItem>
                                            <SelectItem key="intermediate">Intermediate</SelectItem>
                                            <SelectItem key="advanced">Advanced</SelectItem>
                                        </Select>
                                    </div>
                                    <div className="col-span-12">
                                        <Select selectedKeys={goal ? [goal] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0];
                                                setGoal(selected);
                                            }} className="" label="Select Goal" isRequired>
                                            <SelectItem key="weight_loss">Weight Loss</SelectItem>
                                            <SelectItem key="weight_gain">Weight Gain</SelectItem>
                                            <SelectItem key="maintenance">Maintenance</SelectItem>
                                        </Select>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="warning"
                                    onPress={() => handleAddDietPlan(onClose)}
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}