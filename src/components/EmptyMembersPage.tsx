import Lottie from 'lottie-react'
import TeamPageAnimation from '../assets/animations/TeamPageAnimation.json'
import { Button } from './ui/button'
import { useState } from 'react'
import InviteModal from './ui/InviteModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'


function EmptyMembersPage() {

    const [openModal, setOpenModal] = useState(false)
    const { ProjectleadInfo } = useSelector((state: RootState) => state.auth)


    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <Lottie className='max-w-[500px] h-96 ' animationData={TeamPageAnimation} loop={true} ></Lottie>
                <p className='text-center mt-3 cursor-default font-semibold' >Your team page looks a bit lonely!  "Teamwork makes the dream work." – John C. Maxwell.<br /> {ProjectleadInfo && <Button onClick={() => setOpenModal(!openModal)} className='ml-2 mt-4' variant={'outline'}>invite a Member !</Button>}</p>
            </div >
            <InviteModal openModal={openModal} setOpenModal={setOpenModal} />
        </>
    )
}

export default EmptyMembersPage
