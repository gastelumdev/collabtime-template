export interface User {
    _id?: string
    id?: string
    username: string
    email: string
    role: string
    password: string
    isAuthenticated: boolean
}

export interface UserResponse {
    user: User
    accessToken: string
    isAuthenticated: boolean
    id: string
}

export interface LoginRequest {
    email: string
    password: string
}