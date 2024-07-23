import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "@/layouts/SideBar"
import ProjectContextProvider from "@/context/ProjectContextProvider"


function UserLayout() {

    return (
        <div className="w-full flex flex-row relative h-screen">
            <Header />
            <ProjectContextProvider>
                <SideBar />
                <Outlet />
            </ProjectContextProvider>
        </div>
    )
}

export default UserLayout
