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
        const userData = {
          name: auth0User.nickname,
          email: auth0User.email,
        };

        const response: any = await postData("user", userData, getToken);
        setUser(response.userData);

        setIsLogged(true);
      };
      getUser();
    }
  }, [isLogged]);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};
