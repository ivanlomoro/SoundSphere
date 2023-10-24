import { ReactNode, useReducer } from "react";
import { authReducer } from "./authReducer";
import { AuthContext } from "./authContext";
import { loginType } from "../../Types/Types";


const init = () => {
    const userString = localStorage.getItem('user');

    if (userString) {
        try {
            const user = JSON.parse(userString);
            return {
                isLogged: true,
                user
            };
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }

    return {
        isLogged: false,
        user: null
    };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init)

    console.log(authState)

    const login = (name = 'Jason Momoa') => {
        const user = {
            id: 1,
            name: name,
            email: "jasonmomoa@aquaman.com",
            birthdate: "01-09-1979",
            gender: "Male",
            password: "jason123"
        }
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({ type: loginType.login, payload: user })
    }

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: loginType.logout })

    }

    return <AuthContext.Provider value={{ 
        ...authState, 
        login: login, 
        logout: logout }}>         
        {children} 
        </AuthContext.Provider>
}

