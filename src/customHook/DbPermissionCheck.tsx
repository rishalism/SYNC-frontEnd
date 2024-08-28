import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectMembers from '@/types/interfaces/IprojejectMembers';
import { accessLevel } from '@/types/user';

const usecheckDBdesignpermission = () => {
    const { currentProjectInfo } = useSelector((state: RootState) => state.projects);
    const { TeamMemberInfo } = useSelector((state: RootState) => state.auth);
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        if (!currentProjectInfo || !projectId) return;
        const currentUserId = TeamMemberInfo?.id;
        const matchedMember: ProjectMembers = currentProjectInfo.ProjectMembers.find(
            (member: ProjectMembers) => member._id === currentUserId
        );
        if (matchedMember && matchedMember.permissions?.dbDesign == accessLevel.restrict) {
            setIsBlocked(true);
        } else {
            setIsBlocked(false);
        }
    }, [currentProjectInfo, projectId, TeamMemberInfo, navigate]);

    return { isBlocked };
};

export default usecheckDBdesignpermission;
