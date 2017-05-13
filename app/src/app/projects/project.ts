/* Defines the product entity */
export interface IProject {
    projectId: number;
    projectName: string;
    projectCode: string;
    category: string;
    projectOwner: string; 
    contributors: string; 
    startDate: string;
    completionDate: string;
    description: string;   
    status: string;   
}
