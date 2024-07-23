import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
    const { ProjectleadInfo, TeamMemberInfo } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    // If neither ProjectleadInfo nor TeamMemberInfo is present, redirect to /choose-role
    if (!TeamMemberInfo && !ProjectleadInfo) {
        return <Navigate to="/choose-role" state={{ from: location }} replace />;
    }

    // If the user is authenticated, render the Outlet component
    return <Outlet />;
}

export default ProtectedRoutes;
