

export default interface IProjects {
    _id?: string;
    projectName: string;
    projectOwner: string;
    description: string;
    ProjectMembers?: string[];
    createdAt?: Date;
    updatedAt?: Date
}