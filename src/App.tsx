import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Header from './layouts/Header'
import { ThemeProvider } from "@/components/theme-provider"
import Login from "./pages/authPages/Login"
import RolePage from './pages/RolePage'
import Signup from './pages/authPages/Signup'
import { Toaster } from 'sonner'
import Otp from "./pages/authPages/Otp"
import OverViewPage from "./pages/OverViewPage"
import UserLayout from "./layouts/UserLayout"
import AuthLayout from "./layouts/AuthLayout"
import ProtectedRoutes from "./middlewares/ProtectedRoutes"


function App() {

  return (
    <Router>
      <Toaster />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/choose-role" element={<RolePage />}></Route>
            <Route path="/signup/:role" element={<Signup />}></Route>
            <Route path="/login/:role" element={<Login />}></Route>
            <Route path="/verify-otp" element={<Otp />}></Route>
          </Route>
          <Route element={<UserLayout />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/Overview" element={<OverViewPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
