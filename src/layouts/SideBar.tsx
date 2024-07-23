import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import { FaRegFolderOpen } from 'react-icons/fa';
import { LuFileSignature, LuLineChart } from 'react-icons/lu';
import { LiaUserShieldSolid } from 'react-icons/lia';
import { DiCodeBadge } from 'react-icons/di';
import { TbDatabaseEdit } from 'react-icons/tb';
import { IoDocumentsOutline, IoVideocamOutline } from 'react-icons/io5';
import { PiChatsCircleLight, PiUsersLight } from 'react-icons/pi';
import { RiAddCircleLine } from 'react-icons/ri';
import ProjectModal from '@/components/ui/ProjectModal';
import { useContext, useState, useEffect } from 'react';
import errorHandler from '@/middlewares/errorHandler';
import { NavLink } from 'react-router-dom';
import { getUserInfo } from '@/redux/slices/userData';
import { UserRole } from '@/types/user';
import { getProject } from '@/api/projectsApi';
import { BsArrowBarRight } from "react-icons/bs";
import { BsArrowBarLeft } from "react-icons/bs";
import ProjectContext from '@/context/projectContext';
import IProjects from '@/types/interfaces/Iprojects';
import { IoDocumentOutline } from "react-icons/io5";


function SideBar() {
    const [collapse, setCollapse] = useState(false);
    const { openModal, setOpenModal, projects, setProject, selected, setSelected }: any = useContext(ProjectContext);
    const userdata = getUserInfo();

    async function fetchProjectDetails() {
        try {
            const projectData = await getProject();
            if (projectData?.projectData) {
                setProject(projectData.projectData);
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    function handleSelectProject(projectId: string | undefined) {
        const filteredProjects = projects.filter((values: any) => values._id == projectId)
        setSelected(filteredProjects[0])
    }


    useEffect(() => {
        fetchProjectDetails();
    }, [openModal]);

    return (
        <>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" className={`h-92 mt-12 transform duration-300`} collapsed={collapse}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Collapse icon={FaRegFolderOpen} label="Projects">
                            {userdata?.role === UserRole.projectlead && (
                                <Sidebar.Item onClick={() => setOpenModal(true)} className={'cursor-pointer text-sm'} icon={RiAddCircleLine}>
                                    New Project
                                </Sidebar.Item>
                            )}
                            {projects.map((project: IProjects) => (
                                <Sidebar.Item onClick={() => handleSelectProject(project?._id)} icon={IoDocumentOutline} key={project._id} className={`${selected?._id == project?._id ? 'bg-neutral-200' : ''} hover:bg-neutral-200 cursor-pointer`}>
                                    {project.projectName}
                                </Sidebar.Item>
                            ))}
                        </Sidebar.Collapse>
                        {collapse ? (
                            <BsArrowBarRight
                                onClick={() => setCollapse(!collapse)}
                                className={`absolute cursor-pointer top-[14%] bg-gray-200 rounded-sm text-black py-0.5 ${collapse ? 'left-[90%]' : 'left-[97%]'}`}
                            />
                        ) : (
                            <BsArrowBarLeft
                                onClick={() => setCollapse(!collapse)}
                                className={`absolute cursor-pointer top-[14%] bg-gray-200 rounded-sm text-black py-0.5 ${collapse ? 'left-[90%]' : 'left-[97%]'}`}
                            />
                        )}
                        <Sidebar.Item href icon={LuFileSignature}>
                            <NavLink to={'/overView'} className={({ isActive }) => `${isActive ? '' : ''} w-full`}>
                                OverView
                            </NavLink>
                        </Sidebar.Item>
                        <SidebarItemGroup>
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
            </Sidebar>
            <ProjectModal setOpenModal={setOpenModal} openModal={openModal} />
        </>
    );
}

export default SideBar;
