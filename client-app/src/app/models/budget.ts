export interface Budget {
    id: string;
    name: string;
    description: string;
    dateCreated: string;
    dateModified: string;
    owner: string;
    categories: any[];
    accounts: any[];
}