
import { Button } from '@/components/ui/button';
import nothingHereAnimation from '../assets/animations/nothing here animation.json'
import Lottie from "lottie-react";
import ProjectModal from '@/components/ui/ProjectModal';
import { useState } from 'react';


function EmptyProjectPage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='w-[400px] '>
                <Lottie animationData={nothingHereAnimation} loop={true} />
            </div>
            <div className='mt-8'>
                <p className='lg:text-sm font-bold text-center text-xs flex-grow'> Oops! It looks like you don't have any projects yet. Why not create one 🚀. <Button className='ml-2' variant={'outline'} onClick={() => setOpenModal(true)} > Let's get started!</Button>   </p>
            </div>
            <ProjectModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default EmptyProjectPage
