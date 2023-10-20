import { loginType } from "../../Types/Types";

export interface AuthState {
    isLogged: boolean;
    user: {
        id: number;
        name: string;
    } | null;
}

export type AuthAction = {
    type: string;
    payload?: {
        id: number;
        name: string;
    };
};


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case loginType.login:
            return {
                ...state,
                isLogged: true,
                user: action.payload || null
            };
        case loginType.logout:
            return {
                isLogged: false,
                user: null
            };
        default:
            return state;
    }
}

