import React, { useState, ReactNode } from 'react';
import ProjectContext from './projectContext';
import IProjects from '@/types/interfaces/Iprojects';

function ProjectContextProvider({ children }: { children: ReactNode }) {
    const [openModal, setOpenModal] = useState(false);
    const [projects, setProject] = useState<IProjects[]>([]);
    const [selected, setSelected] = useState<IProjects | null>(null)

    return (
        <ProjectContext.Provider value={{ openModal, setOpenModal, projects, setProject, selected, setSelected }}>
            {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContextProvider;
