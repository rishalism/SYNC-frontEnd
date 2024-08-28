import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import SideBar from "@/layouts/SideBar";
import ProjectContextProvider from "@/context/ProjectContextProvider";
import DeviceCheck from "@/components/smallScreen/DeviceCheck";
import SmallScreenMessage from "@/components/smallScreen/SmallScreenMessage";
import socket from "@/services/socket/socketConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


function UserLayout() {
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth)
    const { projectId } = useParams()
    useEffect(() => {
        if (projectId) {
            socket.emit('join_room', projectId);
        }
        socket.emit('new_user', ProjectleadInfo?.id || TeamMemberInfo?.id)
    }, [socket, projectId])


    return (
        // <DeviceCheck fallback={<SmallScreenMessage />}>
        <div className="w-full flex flex-row relative h-screen">
            <Header />
            <ProjectContextProvider>
                <SideBar />
                <Outlet />
            </ProjectContextProvider>
        </div>
        // </DeviceCheck>
    );
}

export default UserLayout;