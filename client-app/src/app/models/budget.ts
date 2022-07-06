export interface Budget {
    id: string;
    name: string;
    description: string;
    dateCreated: Date;
    dateModified: Date;
    owner: string;
    categories: any[];
    accounts: any[];
}