import IProjects from '@/types/interfaces/Iprojects';
import React, { createContext, Dispatch, SetStateAction } from 'react';

type ProjectContextType = {
    selected: IProjects | null;
    setSelected: Dispatch<SetStateAction<IProjects | null>>
    projects: IProjects[];
    setProject: Dispatch<SetStateAction<IProjects[]>>;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default ProjectContext;
