export interface User {
    id: number;
    full_name: string;
    account_name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: Date;
    updated_at: Date;
    about: string | null;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    token: string;
    user: User;
}

export interface LogoutResponse {
    message: string;
    status: number;
}