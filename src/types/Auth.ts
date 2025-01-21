export interface School {
    id: number;
    uuid: string;
    name: string;
}

export interface AuthResponse {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    sex?: string;
    photo?: string;
    token: string;
    tokenExpire: number;
    email: string;
    school: School;
    roles: string[];
    menus: any[];
    notifications: any[];
}
