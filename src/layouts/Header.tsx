import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuWebhook } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { logoutProjectLead, logoutTeamMember } from "@/redux/slices/auth";
import { RootState } from "@/app/store";
import { getUserInfo, UserInfo } from "@/redux/slices/userData";
import { UserRole } from "@/types/user";
import NotificationModal from "@/components/ui/NotificationModal";


function Header(): JSX.Element {

    const location = useLocation()
    const path: string = location.pathname
    const noBorderPages: string[] = ['/', '/choose-role', '/signup/Project-Lead', '/signup/Team-Member', '/login/Team-Member', '/login/Project-Lead', '/verify-otp', '/api/v1/links/']
    const borderPages = !noBorderPages.includes(path)
    const { setTheme, theme } = useTheme();
    const [user, setUser] = useState<UserInfo | null>();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [notificationCount, setNotificationCount] = useState(0)
    const userdetails = getUserInfo()
    const dispatch = useDispatch()

    const ProjectleadInfo = useSelector((state: RootState) => state.auth.ProjectleadInfo);
    const TeamMemberInfo = useSelector((state: RootState) => state.auth.TeamMemberInfo);

    useEffect(() => {
        if (userdetails?.role === UserRole.projectlead) {
            setUser(ProjectleadInfo);
        } else if (userdetails?.role == UserRole.teammember) {
            setUser(TeamMemberInfo);
        }
    }, [user, ProjectleadInfo, TeamMemberInfo, userdetails]);

    function handleLogout() {
        setUser(null)
        // logoutUsers()
        dispatch(logoutProjectLead())
        dispatch(logoutTeamMember())
    }

    return (
        <>
            {
                borderPages && <div className={`w-full ${theme == 'light' ? "bg-white" : "bg-gray-800"}   h-[3rem] top-0 fixed z-10 flex items-center ${borderPages ? 'border border-b-2' : ""} justify-between px-4`}>
                    <div className="flex items-center gap-3">
                        <LuWebhook className="w-7 h-7" />
                        <Link to={'/'}><h1 className="text-3xl font-bold">SYNC</h1></Link>
                    </div>
                    {user ?
                        <div className="flex lg:space-x-3 items-center">
                            <div>
                                <Button variant="ghost" className="outline-none" size="icon">
                                    <Sun onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 outline-none" />
                                    <Moon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 outline-none" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => setOpenModal(true)} variant="ghost"><IoNotificationsOutline className="w-5 h-5" /></Button>
                            </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className='w-7 h-7'>
                                            <AvatarImage src={`${user.avatar || "https://github.com/shadcn.png "}`} alt="User avatar" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleLogout}>
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        :
                        <div>
                            <Link to={'/choose-role'}><Button>Login</Button></Link>
                        </div>

                    }
                </div>
            }
            <div className={`w-full ${theme == 'light' ? "bg-white" : "bg-dark"}   h-[3rem] top-0 fixed z-10 flex items-center ${borderPages ? 'border border-b-2' : ""} justify-between px-4`}>
                <div className="flex items-center gap-3">
                    <LuWebhook className="w-7 h-7" />
                    <Link to={'/'}><h1 className="text-3xl font-bold">SYNC</h1></Link>
                </div>
                {user ?
                    <div className="flex lg:space-x-3 items-center">
                        <div>
                            <Button variant="ghost" className="outline-none" size="icon">
                                <Sun onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 outline-none" />
                                <Moon onClick={() => setTheme("light")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 outline-none" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>
                        <div className="relative">
                            <Button onClick={() => setOpenModal(true)} variant="ghost" className="relative">
                                <IoNotificationsOutline className="w-5 h-5" />
                                {notificationCount > 0 && (
                                    <span style={{ fontSize: '10px' }} className={`absolute w-3 px-2 top-1 right-3 flex items-center justify-center  text-xs font-bold  ${theme == 'light' ? "bg-black text-white" : "text-black bg-white"} rounded-full`}>
                                        {notificationCount > 99 ? '99+' : notificationCount}
                                    </span>
                                )}
                            </Button>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className='w-7 h-7'>
                                        <AvatarImage src={`${user.avatar || "https://github.com/shadcn.png "}`} alt="User avatar" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    :
                    <div>
                        <Link to={'/choose-role'}><Button>Login</Button></Link>
                    </div>

                }
            </div>
            <NotificationModal openModal={openModal} setNotificationCount={setNotificationCount} setOpenModal={setOpenModal} />
        </>
    );
}

export default Header;