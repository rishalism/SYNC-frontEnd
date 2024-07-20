import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "@/layouts/SideBar"

function UserLayout() {
    return (
        <div className="w-full flex flex-row relative h-screen">
            <Header />
            <SideBar />
            <Outlet />
        </div>
    )
}

export default UserLayout
