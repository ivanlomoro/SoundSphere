import { createContext } from "react";

export interface AuthContextType {
    isLogged: boolean
    user: {
        id: number
        name: string
        email: string
        birthdate: string,
        gender: string,
        password: string
    } | null;
    login: (username: string) => void
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);