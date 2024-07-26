import EmptyTeamPage from '@/components/EmptyMembersPage'
import React from 'react'

function MembersPage() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            {/* <div className='w-[500px] h-[500px] bg-green-300' >
                   hey world
            </div> */}
            <EmptyTeamPage />
        </div>
    )
}

export default MembersPage
