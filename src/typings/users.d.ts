export interface UserType {
    authority: string;
    name: string;
    department?: string;
    email: string;
    id: string;
    username: string; 
    avatar?: string;
    status: number;
}

export interface UserArray extends Array<UserType> {}

export interface UserObjectArray {
    [key:string]: UserType;
}