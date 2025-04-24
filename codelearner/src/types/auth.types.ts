export interface User {
    id: number;
    full_name: string;
    account_name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    about: string | null;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    token: string;
    user: User;
}

export interface LogoutResponse {
    message: string;
    status: number;
}