

export interface IProjects {
    _id?: string;
    projectName: string;
    projectOwner: string;
    description: string;
    ProjectMembers?: string[];
    BlockedMembers?: string[];
    createdAt?: Date;
    updatedAt?: Date
}


export default IProjects 