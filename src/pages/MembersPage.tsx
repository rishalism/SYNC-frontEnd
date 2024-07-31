import { RootState } from '@/app/store'
import EmptyTeamPage from '@/components/EmptyMembersPage'
import MembersTable from '../components/Table/MembersTable.js'
import { useSelector } from 'react-redux'

function MembersPage() {
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects)

    return (
        < div className='flex flex-col p-10  w-full mt-12 h-92 ' >
            {currentProjectInfo?.ProjectMembers.length > 0 ?
                <MembersTable />
                :
                <EmptyTeamPage />
            }
        </div >
    )
}

export default MembersPage
