import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import postData from "../../api/postApi";
import { AxiosResponse } from "axios";
import { UserContext } from "../userContext/UserContext";

export type PlayListContextType = {
  userPlaylists: PlaylistType[] | null;
  setUserPlaylists: Dispatch<SetStateAction<PlaylistType[] | null>>;
};

const initialState = {
  userPlaylists: [],
  setUserPlaylists: () => {},
};

export const PlaylistContext = createContext<PlayListContextType>(initialState);

type PlaylistContextProviderProps = {
  children: ReactNode;
};

export const PlaylistContextProvider = ({
  children,
}: PlaylistContextProviderProps) => {
  const [userPlaylists, setUserPlaylists] = useState<PlaylistType[] | null>(
    null
  );
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId.length > 0) {
      const getUserPlaylists = async () => {
        const path = `playlist/user/${user.userId}`;
        const response: AxiosResponse["data"] = await postData(
          path,
          {},
          getToken
        );
        setUserPlaylists(response);
      };
      getUserPlaylists();
    }
  }, [user]);

  return (
    <PlaylistContext.Provider value={{ userPlaylists, setUserPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};
