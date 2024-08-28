import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    User,
    Pagination,

} from "@nextui-org/react";
import { columns } from "./data";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import InviteModal from '../ui/InviteModal';
import { toast } from 'sonner';
import { getCurrentProject, RemoveMember, UpdatePermission } from '@/api/projectsApi';
import { useParams } from 'react-router-dom';
import ProjectMembers from '@/types/interfaces/IprojejectMembers';
import { setCurrentProjects } from '@/redux/slices/projects';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AiOutlineDelete } from "react-icons/ai";
import { accessLevel } from '@/types/user';

function MembersTable() {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects);
    const [users, setUsers] = useState<ProjectMembers[]>([]);
    const [paginatedUsers, setPaginatedUsers] = useState<ProjectMembers[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth);
    const { projectId } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        fetchCurrentProjectMembers()
    }, [currentProjectInfo, projectId]);

    async function fetchCurrentProjectMembers() {
        if (projectId !== 'undefined') {
            const response = await getCurrentProject(projectId)
            if (response?.data) {
                setUsers(response.data.ProjectMembers)
                dispatch(setCurrentProjects({ data: response.data }))
            }
        }
    }

    useEffect(() => {
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        setPaginatedUsers(users.slice(startIdx, endIdx));
    }, [users, page, rowsPerPage]);



    const headerColumns = useMemo(() => {
        if (ProjectleadInfo) return columns;
        return columns.filter((column) => column.uid !== 'dbdesign' && column.uid !== 'actions' && column.uid !== 'notepad' && column.uid !== 'board');
    }, [ProjectleadInfo]);





    async function handleRemove(userId: string | undefined) {
        if (!userId) {
            toast.error('Select a member!');
        } else {
            const response = await RemoveMember({ userId, projectId });
            if (response) {
                const filteteredUsers = users.filter((user) => user._id !== userId)
                const data = await getCurrentProject(projectId)
                console.log(data?.data);
                dispatch(setCurrentProjects(data?.data))
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
    }, [onRowsPerPageChange, currentProjectInfo.ProjectMembers.length, ProjectleadInfo,]);





    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
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
    }, [page, pages, , currentProjectInfo.ProjectMembers.length, onNextPage, onPreviousPage]);



    async function updateDBPermissions(user: ProjectMembers) {
        const newPermission = user.permissions?.dbDesign === accessLevel.allow ? accessLevel.restrict : accessLevel.allow;
        const response = await UpdatePermission(projectId, user._id, 'dbDesign', newPermission);
        if (response) {
            fetchCurrentProjectMembers(); // Refresh members after update
        }
    }

    async function updateNotepadPermissions(user: ProjectMembers) {
        const newPermission = user.permissions?.notepad === accessLevel.allow ? accessLevel.restrict : accessLevel.allow;
        const response = await UpdatePermission(projectId, user._id, 'notepad', newPermission);
        if (response) {
            fetchCurrentProjectMembers(); // Refresh members after update
        }
    }

    async function updateBoardPermission(user: ProjectMembers) {
        const newPermission = user.permissions?.board === accessLevel.allow ? accessLevel.restrict : accessLevel.allow;
        const response = await UpdatePermission(projectId, user._id, 'board', newPermission);
        if (response) {
            fetchCurrentProjectMembers(); // Refresh members after update
        }
    }



    const renderCell = useCallback((user: ProjectMembers, columnKey: string) => {
        const cellValue = user[columnKey as keyof ProjectMembers];
        switch (columnKey) {
            case "name":
                return <User avatarProps={{ radius: "lg", src: user.avatar || "https://github.com/shadcn.png " }} description={user.email} name={cellValue as string} />;
            case "role":
                return <div className="flex flex-col"><p className="text-bold text-small capitalize">{cellValue as string}</p></div>;
            case "status":
                return <div className="flex flex-col"><p className="text-bold text-small capitalize">{cellValue as string}</p></div>;
            case "dbdesign":
                return (
                    <div className="flex items-center justify-center cursor-pointer">
                        {ProjectleadInfo &&
                            <div onClick={() => updateDBPermissions(user)}>
                                {user.permissions?.dbDesign === accessLevel.allow ? <div>Allowed ✅</div> : <div>Restricted 🚫</div>}
                            </div>
                        }
                    </div>
                );
            case "notepad":
                return (
                    <div className="flex items-center justify-center cursor-pointer">
                        {ProjectleadInfo &&
                            <div onClick={() => updateNotepadPermissions(user)}>
                                {user.permissions?.notepad === accessLevel.allow ? <div>Allowed ✅</div> : <div>Restricted 🚫</div>}
                            </div>
                        }
                    </div>
                );
            case "board":
                return (
                    <div className="flex items-center justify-center cursor-pointer">
                        {ProjectleadInfo &&
                            <div onClick={() => updateBoardPermission(user)}>
                                {user.permissions?.board === accessLevel.allow ? <div>Allowed ✅</div> : <div>Restricted 🚫</div>}
                            </div>
                        }
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        {ProjectleadInfo &&
                            <AlertDialog>
                                <AlertDialogTrigger><AiOutlineDelete /></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You want to remove {user.name} . This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemove(user._id)} >Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }
                    </div>
                );
            default:
                return typeof cellValue === 'string' || typeof cellValue === 'number' ? cellValue : '';
        }
    }, [ProjectleadInfo, handleRemove, updateDBPermissions, updateNotepadPermissions, updateBoardPermission]);



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