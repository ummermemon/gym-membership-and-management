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
import { NumberInput } from "@heroui/react";

/* -------------------- COLUMNS -------------------- */

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "DURATION", uid: "duration", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "PRICE", uid: "price", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];




const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "duration",
    "status",
    "price",
    "actions"
];
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
export default function MembershipPlansListComponent() {
    const [membershipPlans, setMembershipPlans] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "registered_at",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
    });


    // Fetch Membership Plans API Call 
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        fetchMembershipPlans();
    }, []);
    const fetchMembershipPlans = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/membership-plans/list`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const res = await response.json();
            setMembershipPlans(res.data);
        } catch (error) {
            // console.error("Error fetching mp:", error);
        }
    };

    const handleAddMembership = async (onClose) => {
        if (!formData.name || !formData.price || !formData.duration) {
            addToast({
                title: "All fields are required",
                color: "danger",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/membership-plans/store`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        price: formData.price,
                        duration: formData.duration,
                    }),
                }
            );

            const res = await response.json();

            if (response.ok) {
                addToast({
                    title: "Membership Added",
                    description: "New Membership Plan Added Successfully",
                    variant: "flat",
                    color: "warning",
                });

                fetchMembershipPlans();

                setFormData({
                    name: "",
                    price: "",
                    duration: "",
                });

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
                title: "Server Error",
                color: "danger",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleDeleteMembership = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this membership plan?");
        if (!confirmDelete) return;

        try {
            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/admin/membership-plans/destroy/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                addToast({
                    title: "Membership Deleted",
                    description: "Membership plan deleted successfully",
                    color: "warning",
                    variant: "flat"
                });

                fetchMembershipPlans();
            } else {
                console.log(response.json())
                addToast({
                    title: "Delete Failed",
                    description: "Unable to delete membership",
                    color: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Server Error",
                description: "Something went wrong",
                color: "danger",
            });
        }
    };
    const hasSearchFilter = Boolean(filterValue);

    /* -------------------- HEADER COLUMNS -------------------- */

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredMP = [...membershipPlans];
        if (hasSearchFilter) {
            const search = filterValue.toLowerCase();

            filteredMP = filteredMP.filter((mp) => (`${mp.name}`).toLowerCase().includes(search)
            );
        }

        return filteredMP;
    }, [membershipPlans, filterValue, hasSearchFilter]);

    /* -------------------- PAGINATION -------------------- */

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredItems.slice(start, start + rowsPerPage);
    }, [page, filteredItems, rowsPerPage]);

    /* -------------------- SORTING -------------------- */

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];

            let cmp =
                typeof first === "number"
                    ? first - second
                    : String(first).localeCompare(String(second));

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    /* -------------------- CELL RENDER -------------------- */

    const renderCell = useCallback((mp, columnKey) => {
        const cellValue = mp[columnKey];

        switch (columnKey) {
            case "duration":
                return (
                    `${cellValue} days`
                );
            case "status":
                const status = mp.is_active === 1 ? <Chip color="warning" variant="flat">Active</Chip> : <Chip color="danger" variant="flat">Inactive</Chip>;
                return (
                    status
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit Membership">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete Membership">
                            <span 
                                onClick={() => handleDeleteMembership(mp.id)}
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    /* -------------------- TOP CONTENT -------------------- */

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    {/* 🔎 Search */}
                    <Input
                        isClearable
                        className="w-fit"
                        placeholder="Search by name..."
                        value={filterValue}
                        startContent={<Search strokeWidth={2} size={15} />}
                        onClear={() => {
                            setFilterValue("");
                            setPage(1);
                        }}
                        onValueChange={(value) => {
                            setFilterValue(value);
                            setPage(1);
                        }}
                    />

                    <div className="flex gap-3">

                        <Select className="w-53" size="sm" label="Rows per page" value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setPage(1);
                            }} placeholder="Rows per page">
                            <SelectItem key={5} >5</SelectItem >
                            <SelectItem key={10}>10</SelectItem >
                            <SelectItem key={15}>15</SelectItem >
                        </Select>



                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {filteredItems.length} Membership Plans
                    </span>
                    <div className="flex gap-4">

                        <Dropdown size="2xl">
                            <DropdownTrigger>
                                <Button variant="flat">Columns <ChevronDown strokeWidth={2} size={15} /></Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="warning" onPress={onOpen} endContent={<Plus size={20} strokeWidth={1} />} >Add Membership Plan</Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        rowsPerPage,
        filteredItems.length,
    ]);

    const bottomContent = (
        <div className="py-2 px-2 flex justify-between items-center">
            <span className="text-small text-default-400">
                {selectedKeys.size} selected
            </span>
            <Pagination
                showControls
                color="warning"
                page={page}
                total={pages}
                onChange={setPage}
            />
        </div>
    );

    /* -------------------- RETURN -------------------- */

    return (
        <>

            <div className="m-4">
                <Table
                    isHeaderSticky
                    aria-label="Admin Membership Plan Table"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    topContent={topContent}
                    topContentPlacement="outside"
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody
                        emptyContent={"No Membership Plan found"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Membership</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    placeholder="Enter Membership Name"
                                    variant="flat"
                                    isRequired
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />

                                <NumberInput
                                    label="Price"
                                    isRequired
                                    value={formData.price}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, price: value }))
                                    }
                                />

                                <NumberInput
                                    label="Duration (Days)"
                                    isRequired
                                    value={formData.duration}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, duration: value }))
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="warning"
                                    isLoading={isSubmitting}
                                    onPress={() => handleAddMembership(onClose)}
                                >
                                    Add Membership
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}