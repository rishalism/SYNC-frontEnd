
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { FaRegFolderOpen } from "react-icons/fa";
import { LuFileSignature, LuLineChart } from "react-icons/lu";
import { LiaUserShieldSolid } from "react-icons/lia";
import { DiCodeBadge } from "react-icons/di";
import { TbDatabaseEdit } from "react-icons/tb";
import { IoDocumentsOutline, IoVideocamOutline } from "react-icons/io5";
import { PiChatsCircleLight, PiUsersLight } from "react-icons/pi";
import { RiAddCircleLine } from "react-icons/ri";
import ProjectModal from "@/components/ui/ProjectModal";
import { useState } from "react";
import errorHandler from "@/middlewares/errorHandler"
import { useEffect } from "react"
import IProjects from "@/types/interfaces/Iprojects";
import { getProject } from "@/api/projectLeadApi";
import { BsArrowBarRight } from "react-icons/bs";
import { BsArrowBarLeft } from "react-icons/bs";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";




function SideBar() {
    const [collapse, setCollapse] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const [projectDetails, setProjectDetails] = useState<any[] | null>(null);

    async function fetchProjectDetails() {
        try {
            const projectData: any = await getProject()
            console.log(projectData.projectData);
            if (projectData?.projectData) {
                setProjectDetails(projectData.projectData)
            }
        } catch (error) {
            errorHandler(error)
        }
    }


    useEffect(() => {
        fetchProjectDetails()
    }, [openModal])


    return (
        <>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" className={`h-92 mt-12  transform duration-300`} collapsed={collapse} >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse icon={FaRegFolderOpen} label="Projects">
                            <Sidebar.Item onClick={() => setOpenModal(true)} className={'cursor-pointer text-sm '} icon={RiAddCircleLine}>New Project</Sidebar.Item>
                            {
                                projectDetails?.map((projects: IProjects) => {
                                    return (
                                        <>
                                            <Sidebar.Item icon={IoDocumentOutline} key={projects._id} className={'cursor-pointer'}>{projects.projectName}</Sidebar.Item>
                                        </>
                                    )
                                })
                            }
                        </Sidebar.Collapse>
                        {collapse ? <BsArrowBarRight onClick={() => setCollapse(!collapse)} className={`absolute cursor-pointer top-[14%] bg-gray-200 rounded-sm text-black py-0.5 ${collapse ? 'left-[90%]' : 'left-[97%]'}`} /> : <BsArrowBarLeft onClick={() => setCollapse(!collapse)} className={`absolute cursor-pointer top-[14%] bg-gray-200 rounded-sm text-black py-0.5 ${collapse ? 'left-[90%]' : 'left-[97%]'}`} />}
                        <Sidebar.Item href icon={LuFileSignature}><NavLink to={'/overView'} className={({ isActive }) => `${isActive ? '' : ''} w-full `}>
                            OverView
                        </NavLink></Sidebar.Item>
                        <SidebarItemGroup >
                            <Sidebar.Item href="#" icon={LiaUserShieldSolid}>
                                Teams
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={PiUsersLight}>
                                Members
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={DiCodeBadge}>
                                API Docs
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={TbDatabaseEdit}>
                                DB Designs
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={IoDocumentsOutline}>
                                Modules
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={LuLineChart}>
                                Board
                            </Sidebar.Item>
                        </SidebarItemGroup>
                        <SidebarItemGroup>
                            <Sidebar.Item href="#" icon={PiChatsCircleLight}>
                                Chats
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={IoVideocamOutline}>
                                Meetings
                            </Sidebar.Item>
                        </SidebarItemGroup>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar >
            <ProjectModal setOpenModal={setOpenModal} openModal={openModal} />
        </>
    );
}

export default SideBar


