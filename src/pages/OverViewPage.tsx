import EmptyProjectPage from "@/components/EmptyProjectPage";
import { Button } from "@/components/ui/button";
import errorHandler from "@/middlewares/errorHandler";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteProject, getProject } from "@/api/projectsApi";
import { toast } from "sonner";
import ProjectContext from "@/context/projectContext";
import ProjectEditModal from "@/components/ui/ProjectEditModal";

function OverViewPage() {
    const { openModal, setOpenModal, projects, setProject, selected, setSelected }: any = useContext(ProjectContext);
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth);
    const [editModal, setEditModal] = useState(false);

    async function fetchProjectDetails() {
        try {
            const projectData: any = await getProject();
            if (projectData?.projectData) {
                setProject(projectData.projectData);
                if (selected == null) {
                    setSelected(projectData.projectData[0])
                }
            }
            return projectData?.projectData[0];
        } catch (error) {
            errorHandler(error);
        }
    }

    useEffect(() => {
        fetchProjectDetails();
    }, [openModal, editModal]);

    async function HandleEditProject(projectid: string | undefined) {
        setEditModal(!editModal);
    }

    async function HandleDeleteProject(projectid: string | undefined) {
        toast.custom((id: any) => (
            <div id={id} className="bg-white py-3 font-semibold shadow-md px-3 rounded-md text-red-600">
                Deleting this project is irreversible and will permanently remove all associated data. Do you really want to proceed?
                <div className="mt-2">
                    <button
                        className="bg-red-600 text-white px-2 py-2 rounded mr-2"
                        onClick={async () => {
                            await deleteConfimed(projectid);
                            toast.dismiss(id); // Dismiss the toast after action
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-2 py-2 rounded"
                        onClick={() => toast.dismiss(id)} // Dismiss the toast on cancel
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            position: 'top-center',
        });
    }

    async function deleteConfimed(projectid: string | undefined) {
        const response = await deleteProject(projectid);
        if (response) {
            fetchProjectDetails();
            const filteredProjects = projects.filter((values: any) => values._id !== projectid)
            setSelected(filteredProjects[0])
        }
    }

    console.log(selected);

    return (
        <div className='flex flex-col w-full items-center justify-center p-40'>
            {selected ?
                <div className="p-12 w-full border-2 shadow-md rounded-lg">
                    <div className="flex flex-col w-full h-full gap-8">
                        <div className="flex justify-between">
                            <h2 className="text-4xl font-bold">{selected?.projectName}</h2>
                            {ProjectleadInfo?.id && <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon">
                                        <BsThreeDotsVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => HandleEditProject(selected?._id)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => HandleDeleteProject(selected?._id)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>}
                        </div>
                        <p className="text-sm text-neutral-500">{selected?.description}</p>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold">Project Lead</h2>
                            <div className="flex flex-row gap-4 text-neutral-500">
                                <Avatar className='w-10 h-10'>
                                    <AvatarImage src={`${selected?.projectOwner?.avatar || "https://github.com/shadcn.png"}`} alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{selected?.projectOwner?.name}</span>
                            </div>
                        </div>
                        <div className="space-y-3 mb-8">
                            <h2 className="text-3xl font-bold">Team Members</h2>
                            <div className="flex relative">
                                {selected?.ProjectMembers.map((members: string) => (
                                    <Avatar key={members} className='w-10 absolute h-10'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                : <EmptyProjectPage openModal={openModal} setOpenModal={setOpenModal} />}
            <ProjectEditModal openModal={editModal} setOpenModal={setEditModal} />
        </div>
    );
}

export default OverViewPage;
