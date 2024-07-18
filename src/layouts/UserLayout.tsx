import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "@/layouts/SideBar"

function UserLayout() {
    return (
        <div className="w-full relative h-screen">
            <Header />
            <div className="h-screen flex flex-row">
                <SideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout
