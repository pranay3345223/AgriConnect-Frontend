// User model matching backend User entity
export interface User {
    id?: string;
    username: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    role: 'FARMER' | 'OWNER' | 'BOTH';
    createdAt?: Date;
    enabled?: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    user: User;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    role: 'FARMER' | 'OWNER' | 'BOTH';
}
