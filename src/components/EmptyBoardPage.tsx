import React from 'react'
import Lottie from 'lottie-react'
import emptyBoard from '.././assets/animations/Animation - 1723265705188.json'

function EmptyBoardPage() {
    return (
        <div className='flex flex-col items-center w-full mt-12'>
            <Lottie className='max-w-[500px]' animationData={emptyBoard} loop={true}></Lottie>
            <p className='text-center mt-3 cursor-default font-semibold'>Your board is looking a bit empty! Start by selecting a project to get things moving and bring your ideas to life.</p>
        </div>
    )
}

export default EmptyBoardPage
