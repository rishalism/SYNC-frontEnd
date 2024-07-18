import { Outlet } from "react-router-dom"
import Header from "./Header"


function AuthLayout() {
    return (
        <div className="w-full relative h-screen">
            <Header />
            <main className="min-h-dvh">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout
