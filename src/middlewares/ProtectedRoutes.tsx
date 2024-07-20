import { RootState } from "@/app/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"



function ProtectedRoutes() {

    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    return (
        ProjectleadInfo ? <Outlet /> : <Navigate to={'/choose-role'} state={location} replace={true} />
    )
}

export default ProtectedRoutes
