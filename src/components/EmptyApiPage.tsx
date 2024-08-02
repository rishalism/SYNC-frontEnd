import Lottie from "lottie-react";
import apirocket from '../assets/animations/api rocket.json'

function EmptyApiPage() {
    return (
        <div className="flex flex-col border items-center justify-center">
            <Lottie className='max-w-[100px]' animationData={apirocket} loop={true}></Lottie>
        </div>
    )
}

export default EmptyApiPage
