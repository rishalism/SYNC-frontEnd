import Lottie from "lottie-react";
import apirocket from '../assets/animations/api rocket.json'

function EmptyApiPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Lottie className='max-w-[300px]' animationData={apirocket} loop={true}></Lottie>
            <p className="text-lg mt-10  font-semibold text-center">Ready to test? Create a new endpoint to get going.</p>
        </div>
    )
}

export default EmptyApiPage
