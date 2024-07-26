
import { Button } from '@/components/ui/button';
import nothingHereAnimation from '../assets/animations/nothing here animation.json'
import Lottie from "lottie-react";
import ProjectModal from '@/components/ui/ProjectModal';
import { useState } from 'react';
import { getUserInfo } from '@/redux/slices/userData';
import { UserRole } from '@/types/user';


function EmptyProjectPage({ openModal, setOpenModal }: any) {

    const userdata = getUserInfo()
    return (
        <div className='flex flex-col  items-center justify-center h-screen'>
            <Lottie className='max-w-[500px]'  animationData={nothingHereAnimation} loop={true} />
            <div className='mt-8'>
                <p className="lg:text-sm font-bold text-center text-xs flex-grow">
                    Oops! It looks like you don't have any projects yet.
                    {userdata?.role === UserRole.projectlead && (
                        <>
                            Why not create one 🚀
                            <Button className="ml-2" variant="outline" onClick={() => setOpenModal(true)}>
                                Let's get started!
                            </Button>
                        </>
                    )}
                </p>            </div>
            <ProjectModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default EmptyProjectPage
