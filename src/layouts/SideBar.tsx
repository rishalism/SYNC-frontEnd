import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import { FaRegFolderOpen } from 'react-icons/fa';
import { LuFileSignature, LuLineChart } from 'react-icons/lu';
import { DiCodeBadge } from 'react-icons/di';
import { TbDatabaseEdit } from 'react-icons/tb';
import { IoDocumentsOutline, IoVideocamOutline } from 'react-icons/io5';
import { PiChatsCircleLight, PiUsersLight } from 'react-icons/pi';
import { RiAddCircleLine } from 'react-icons/ri';
import ProjectModal from '@/components/ui/ProjectModal';
import { useContext, useState, useEffect } from 'react';
import errorHandler from '@/middlewares/errorHandler';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/redux/slices/userData';
import { UserRole } from '@/types/user';
import { getProject } from '@/api/projectsApi';
import { BsArrowBarRight } from "react-icons/bs";
import { BsArrowBarLeft } from "react-icons/bs";
import ProjectContext from '@/context/projectContext';
import IProjects from '@/types/interfaces/Iprojects';
import { IoDocumentOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProjects } from '@/redux/slices/projects';
import { RootState } from '@/app/store';


function SideBar() {
    const [collapse, setCollapse] = useState(false);
    const { openModal, setOpenModal, projects, setProject, selected, setSelected }: any = useContext(ProjectContext);
    const location = useLocation()
    const [active, setActive] = useState('/overView')
    const userdata = getUserInfo();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)

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
        dispatch(setCurrentProjects({ data: filteredProjects[0] }))
        navigate('/overview')
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
                                <Sidebar.Item onClick={() => handleSelectProject(project?._id)} icon={IoDocumentOutline} key={project._id} className={`${selected?._id == project?._id ? ' bg-neutral-200 ' : ''} hover:bg-neutral-200 cursor-pointer`}>
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
                        <NavLink to={`/overView`} >
                            <Sidebar.Item href icon={LuFileSignature} className={`${active === '/overView' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/overView')} >
                                OverView
                            </Sidebar.Item>
                        </NavLink>
                        <SidebarItemGroup>
                            <NavLink to={`/Members/${currentProjectInfo?._id}`}>
                                <Sidebar.Item href="#" icon={PiUsersLight} className={`${active === '/Members' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/Members')} >
                                    Members
                                </Sidebar.Item>
                            </NavLink>
                            <NavLink to={`/Api-testing/${currentProjectInfo?._id}`}>
                                <Sidebar.Item href="#" icon={DiCodeBadge} className={`${active === '/API Testing' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/API Testing')} >
                                    API Testing
                                </Sidebar.Item>
                            </NavLink>
                            <NavLink to={`/db-design/${currentProjectInfo?._id}`}>
                                <Sidebar.Item href="#" icon={TbDatabaseEdit} className={`${active === '/DB Designs' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/DB Designs')}  >
                                    DB Designs
                                </Sidebar.Item>
                            </NavLink>
                            <Sidebar.Item href="#" icon={IoDocumentsOutline} className={`${active === '/Modules' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/Modules')} >
                                NotePad
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={LuLineChart} className={`${active === '/Board' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/Board')} >
                                Board
                            </Sidebar.Item>
                        </SidebarItemGroup>
                        <SidebarItemGroup>
                            <Sidebar.Item href="#" icon={PiChatsCircleLight} className={`${active === '/chats' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/chats')}  >
                                Chats
                            </Sidebar.Item>
                            <NavLink to={`/Meet/${currentProjectInfo?._id}`} >
                                <Sidebar.Item href="#" icon={IoVideocamOutline} className={`${active === '/Meetings' ? 'border border-neutral-400 shadow-inner' : ''}`} onClick={() => setActive('/Meetings')} >
                                    Meetings
                                </Sidebar.Item>
                            </NavLink>
                        </SidebarItemGroup>
                    </Sidebar.ItemGroup>
                </Sidebar.Items >
            </Sidebar >
            <ProjectModal setOpenModal={setOpenModal} openModal={openModal} />
        </>
    );
}

export default SideBar;