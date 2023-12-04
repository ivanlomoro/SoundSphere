import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import postData from "../../api/postApi";
import { UserInterface } from "../songContext/songContext";
import { AxiosResponse } from "axios";

export type UserContextType = {
  user: UserInterface | null;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
};

const initialState = {
  user: {
    userId:""
  },
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const { user: auth0User, getAccessTokenSilently: getToken } = useAuth0();

  useEffect(() => {
    if (auth0User) {
      const getUser = async () => {
        const incomingData = {
          name: auth0User.nickname,
          email: auth0User.email,
        };
        const response: AxiosResponse['data'] = await postData("user", incomingData, getToken);
        setUser(response.incomingData);        
        setIsLogged(true);
      };
      getUser();
    }
  }, [isLogged,auth0User]);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};
