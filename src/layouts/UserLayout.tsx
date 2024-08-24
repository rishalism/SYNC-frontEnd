import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "@/layouts/SideBar";
import ProjectContextProvider from "@/context/ProjectContextProvider";
import DeviceCheck from "@/components/smallScreen/DeviceCheck";
import SmallScreenMessage from "@/components/smallScreen/SmallScreenMessage";


function UserLayout() {
    return (
        <DeviceCheck fallback={<SmallScreenMessage />}>
            <div className="w-full flex flex-row relative h-screen">
                <Header />
                <ProjectContextProvider>
                    <SideBar />
                    <Outlet />
                </ProjectContextProvider>
            </div>
        </DeviceCheck>
    );
}

export default UserLayout;