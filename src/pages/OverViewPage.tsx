import { getProject } from "@/api/projectLeadApi";
import EmptyProjectPage from "@/components/EmptyProjectPage"
import { Button } from "@/components/ui/button";
import errorHandler from "@/middlewares/errorHandler";
import { useEffect, useState } from "react"
import { FiEdit2 } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function OverViewPage() {

    const [projects, setProject] = useState<any[] | null>(null);
    async function fetchProjectDetails() {
        try {
            const projectData: any = await getProject()
            console.log(projectData.projectData);
            if (projectData?.projectData) {
                setProject(projectData.projectData)
            }
        } catch (error) {
            errorHandler(error)
        }
    }

    useEffect(() => {
        fetchProjectDetails()
    }, [])

    return (
        <div className='flex flex-col w-full items-center justify-center '>
            {projects ?
                <div className="w-[60%]  p-12  border-2 shadow-md rounded-lg " >
                    <div className="flex flex-col w-full h-full gap-8 ">
                        <div className="flex justify-between">
                            <h2 className="text-4xl font-bold ">Project headline</h2>
                            <Button variant={'ghost'}><FiEdit2 /></Button>
                        </div>
                        <p className="text-sm text-neutral-500" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed rem vero cupiditate ipsa voluptatibus debitis corporis animi eligendi. Quod aliquid adipisci aspernatur numquam laudantium, tenetur error incidunt provident saepe, exercitationem labore corporis eligendi quos ipsa tempora id ut itaque sunt dolore cum qui optio atque. Eius necessitatibus vitae perspiciatis?</p>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold " >Project Lead</h2>
                            <div className="flex flex-row gap-4 text-neutral-500">
                                <Avatar className='w-10 h-10'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>project lead name</span>
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

                : <EmptyProjectPage />}

        </div>
    )


}

export default OverViewPage
