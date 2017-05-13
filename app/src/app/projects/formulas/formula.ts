/* Defines the formula entity */
export interface IMaterial {
    id: number;   
    materialVolume: string;
    specifications: string;
    comments: string;       
}

export class IFormula {
    id: number;
    projectId: number;
    formulaCode: string;
    description: string;
    ipcNumber: string; 
    creator: string; 
    contributors: string;
    status: string;
    targetMarkets: string;   
    endUses: string;
    ingredients?: IMaterial[];   
}
