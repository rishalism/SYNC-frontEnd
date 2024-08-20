import EmptyProjectPage from "@/components/EmptyProjectPage";
import { Button } from "@/components/ui/button";
import errorHandler from "@/middlewares/errorHandler";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
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
import { clearCurrentProjects, setCurrentProjects } from "@/redux/slices/projects";
import ProjectMembers from "@/types/interfaces/IprojejectMembers";
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


function OverViewPage() {
    const { openModal, setOpenModal, projects, setProject, selected, setSelected }: any = useContext(ProjectContext);
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth);
    const [editModal, setEditModal] = useState(false);
    const dispatch = useDispatch()
    async function fetchProjectDetails() {
        try {
            const projectData: any = await getProject();
            if (projectData?.projectData.length > 0) {
                setProject(projectData.projectData);
                if (selected == null) {
                    setSelected(projectData.projectData[0])
                    dispatch(setCurrentProjects({ data: projectData.projectData[0] }))
                }
            }
            if (projectData.projectData.length == 0) {
                dispatch(clearCurrentProjects())
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



    async function deleteConfimed(projectid: string | undefined) {
        const response = await deleteProject(projectid);
        if (response) {
            fetchProjectDetails();
            const filteredProjects = projects.filter((values: any) => values._id !== projectid)
            setSelected(filteredProjects[0])
            if (filteredProjects.length > 0) {
                dispatch(setCurrentProjects({ data: filteredProjects[0] }))
            } else {
                location.reload()
            }
        }
    }


    return (
        <div className='flex flex-col w-full items-center justify-center p-40'>
            {selected ?
                <div className="p-12 w-full border-2 shadow-inner rounded-lg">
                    <div className="flex flex-col w-full h-full gap-8">
                        <div className="flex justify-between">
                            <div className="border-2 flex items-center justify-between p-8 rounded-md w-full">
                                <h2 className="text-4xl font-bold">{selected?.projectName}</h2>
                                {ProjectleadInfo?.id &&
                                    <AlertDialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="secondary" size="icon">
                                                    <BsThreeDotsVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => HandleEditProject(selected?._id)}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <AlertDialogTrigger className="w-full">
                                                    <DropdownMenuItem className="w-full" >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete All your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteConfimed(selected?._id)} >Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                }
                            </div>
                        </div>
                        <p className="text-sm text-neutral-500">{selected?.description}</p>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold">Project Lead</h2>
                            <div className="flex flex-row items-center gap-4 text-neutral-500">
                                <Avatar src={`${selected?.projectOwner?.avatar || "https://github.com/shadcn.png"}`} />
                                <span>{selected?.projectOwner?.name}</span>
                            </div>
                        </div>
                        <div className="space-y-3 mb-8">
                            <h2 className="text-3xl font-bold">Team Members</h2>
                            <div className="flex ">
                                {selected?.ProjectMembers.map((members: ProjectMembers, index: number) => (
                                    <AvatarGroup isBordered max={3}
                                        key={members._id}>
                                        <Avatar src={`${members.avatar || "https://github.com/shadcn.png"}`} alt="User avatar" />
                                    </AvatarGroup>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                : <EmptyProjectPage openModal={openModal} setOpenModal={setOpenModal} />
            }
            <ProjectEditModal openModal={editModal} setOpenModal={setEditModal} />
        </div >
    );
}

export default OverViewPage;