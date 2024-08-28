import Lottie from "lottie-react";
import error from '../../assets/animations/404.json';
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Notfound() {
    return (
        <div className='w-full h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between p-5 md:p-10'>
            <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-10 text-center md:text-left">
                <h1 className="font-semibold text-4xl md:text-5xl font-serif">
                    <span className="text-6xl md:text-7xl">404</span> - Off the Grid!
                </h1>
                <p className="text-neutral-500 font-serif px-2 md:px-0">
                    It seems like you've ventured outside the project scope! 📋 No worries, even the best plans need a course correction now and then.
                    Let's navigate you back to the main project area—return to the dashboard and keep those tasks moving forward!
                </p>
                <Button as={Link} to={'/'} className="mx-auto md:mx-0 w-full md:w-1/4 capitalize" color="primary">Go back to home!</Button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center p-5 md:p-10">
                <Lottie  className="w-3/4 md:w-[500px]  rounded-full filter mix-blend-multiply " animationData={error} loop={true} />
            </div>
        </div>
    );
}

export default Notfound;
