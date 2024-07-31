import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Pagination,
} from "@nextui-org/react";
import { columns } from "./data";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import InviteModal from '../ui/InviteModal';
import { LuLineChart } from 'react-icons/lu';
import { IoDocumentOutline } from "react-icons/io5";
import { TbDatabaseEdit } from 'react-icons/tb';
import { toast } from 'sonner';
import { RemoveMember } from '@/api/projectsApi';
import { useParams } from 'react-router-dom';
import ProjectMembers from '@/types/interfaces/IprojejectMembers';

const INITIAL_VISIBLE_COLUMNS = ["Permissions", "actions"];

function MembersTable() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const [visibleColumns, setVisibleColumns] = useState(new Set<string>(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects);
    const [users, setUsers] = useState<ProjectMembers[]>([]);
    const [paginatedUsers, setPaginatedUsers] = useState<ProjectMembers[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth);
    const { projectId } = useParams();

    useEffect(() => {
        setUsers(currentProjectInfo.ProjectMembers);
    }, [currentProjectInfo]);


    useEffect(() => {
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        setPaginatedUsers(users.slice(startIdx, endIdx));
    }, [users, page, rowsPerPage]);

    const hasSearchFilter = Boolean(filterValue);


    const headerColumns = useMemo(() => {
        if (ProjectleadInfo) return columns;
        return columns.filter((column) => column.uid !== 'Permissions' && column.uid !== 'actions');
    }, [visibleColumns, ProjectleadInfo]);





    async function handleRemove(userId: string | undefined) {
        if (!userId) {
            toast.error('Select a member!');
        } else {
            const response = await RemoveMember({ userId, projectId });
            if (response) {
                setUsers(users.filter((user) => user._id !== userId));
                toast.success('Member removed!');
            }
        }
    }

    const pages = Math.ceil(users.length / rowsPerPage);


    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);







    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-end gap-3">
                    {ProjectleadInfo && <Button color="primary" onClick={() => setOpenModal(!openModal)} endContent={<GoPlus />}>Add New</Button>}
                </div>
            </div>
        );
    }, [filterValue, visibleColumns, onRowsPerPageChange, currentProjectInfo.ProjectMembers.length, hasSearchFilter, ProjectleadInfo]);





    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys.size ? "All items selected" : ''}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>Previous</Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>Next</Button>
                </div>
            </div>
        );
    }, [page, pages, selectedKeys, currentProjectInfo.ProjectMembers.length, onNextPage, onPreviousPage]);



    const renderCell = useCallback((user: ProjectMembers, columnKey: string) => {
        const cellValue = user[columnKey as keyof ProjectMembers];
        switch (columnKey) {
            case "id":
                return <p>{user._id}</p>;
            case "name":
                return <User avatarProps={{ radius: "lg", src: user.avatar }} description={user.email} name={cellValue as string} />;
            case "role":
                return <div className="flex flex-col"><p className="text-bold text-small capitalize">{cellValue as string}</p></div>;
            case "status":
                return <div className="flex flex-col"><p className="text-bold text-small capitalize">{cellValue as string}</p></div>;
            case "Permissions":
                return (
                    <div className="flex ">
                        {ProjectleadInfo &&
                            <>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light"><TbDatabaseEdit /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu disallowEmptySelection
                                        aria-label="Table Columns"
                                        closeOnSelect={false}
                                        selectedKeys={''}
                                        selectionMode="single"
                                    // onSelectionChange={setStatusFilter}
                                    >
                                        <DropdownItem>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light"><IoDocumentOutline /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light"><LuLineChart /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </>
                        }
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        {ProjectleadInfo &&
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="md" variant="light"><BsThreeDotsVertical /></Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => handleRemove(user._id)}>Remove</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        }
                    </div>
                );
            default:
                return typeof cellValue === 'string' || typeof cellValue === 'number' ? cellValue : '';
        }
    }, [ProjectleadInfo, handleRemove]);



    return (
        <div className='w-full'>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{ wrapper: "max-h-[400px] " }}
                topContent={topContent}
                topContentPlacement="outside"
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No users found"} items={paginatedUsers}>
                    {(item) => (
                        <TableRow key={item?._id}>
                            {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <InviteModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default MembersTable;
