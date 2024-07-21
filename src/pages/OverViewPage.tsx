import { getProject } from "@/api/projectLeadApi";
import EmptyProjectPage from "@/components/EmptyProjectPage"
import { Button } from "@/components/ui/button";
import errorHandler from "@/middlewares/errorHandler";
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IProjects from "@/types/interfaces/Iprojects";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";


function OverViewPage() {

    const [projects, setProject] = useState<IProjects | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)
    async function fetchProjectDetails() {
        try {
            const projectData: any = await getProject()
            if (projectData?.projectData) {
                setProject(projectData.projectData[0])
            }
        } catch (error) {
            errorHandler(error)
        }
    }

    
    useEffect(() => {
        fetchProjectDetails()
    }, [openModal])


    function HandleEditProject() {

    }

    function HandleDeleteProject() {

    }

    return (
        <div className='flex flex-col w-full items-center justify-center  p-40'>
            {projects ?
                <div className="p-12  w-full border-2 shadow-md rounded-lg " >
                    <div className="flex flex-col w-full h-full gap-8 ">
                        <div className="flex justify-between">
                            <h2 className="text-4xl font-bold ">{projects?.projectName}</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon">
                                        <BsThreeDotsVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={HandleEditProject}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={HandleDeleteProject}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>                        </div>
                        <p className="text-sm text-neutral-500" >{projects?.description}</p>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold " >Project Lead</h2>
                            <div className="flex flex-row gap-4 text-neutral-500">
                                <Avatar className='w-10 h-10'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{ProjectleadInfo?.name}</span>
                            </div>
                        </div>
                        <div className="space-y-3 mb-8">
                            <h2 className="text-3xl font-bold" >Team Members</h2>
                            <div className="flex  relative ">
                                <Avatar className='w-10 absolute  h-10'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar className='left-6 w-10 h-10 absolute'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar className='left-12 w-10 h-10 absolute'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar className='left-20 w-10 h-10 absolute'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>

                : <EmptyProjectPage openModal={openModal} setOpenModal={setOpenModal} />}

        </div>
    )


}

export default OverViewPage
