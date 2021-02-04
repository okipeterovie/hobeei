
export interface RegisterContext {
    id: number;
    email: string;
    confirmPassword: string;
    password: string;
    userType: string;
}

export interface LoginContext {
    id: string;
    email: string;
    roles: string[];
    privileges: string[];
    token: string;
    userType?: string;
}
