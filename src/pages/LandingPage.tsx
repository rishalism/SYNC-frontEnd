import { BackgroundBeams } from "../components/ui/background-beams";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";


import boardpage from '../assets/Board page.png'
import { Link } from "react-router-dom";
import { getUserInfo } from "@/redux/slices/userData";

function LandingPage() {

    const user = getUserInfo()

    return (
        <div className="h-screen w-full rounded-md relative  lg:flex-row flex flex-col px-4 gap-x-10 items-center justify-evenly lg:justify-between ">
            <div className="max-w-2xl flex flex-col items-center lg:items-start lg:w-[50%] ">
                <h1 className="relative z-10 text-4xl text-center lg:text-left  lg:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   font-sans font-bold">
                    Manage projects like never before
                </h1>
                <p></p>
                <p className="text-neutral-500 max-w-lg text-center lg:mt-3 lg:text-left my-2 text-xs lg:text-sm  relative z-10">
                    From API testing to database design and Kanban boards to communication tools, we organize your work so teams know what to do, why it matters, and how to get it done.                </p>
                <div className="mt-3">
                    <Link to={'/choose-role'}><HoverBorderGradient> <span className="text-neutral-200">{user ? 'view Projects ' : "get started !"}</span></HoverBorderGradient></Link>
                </div>
            </div>
            <div className="mockup-phone w-full max-w-2xl shadow-2xl z-10 lg:w-[50%]">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-horizontal phone-2 p-1 pb-5 "> <img className='rounded-badge w-full' src={boardpage} alt="" /></div>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    )
}

export default LandingPage
