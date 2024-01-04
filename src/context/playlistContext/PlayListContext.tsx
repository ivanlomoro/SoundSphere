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
import { Songs } from "../../Types/SongsTypes";

export type PlayListContextType = {
  userPlaylists: PlaylistType[] | null;
  setUserPlaylists: Dispatch<SetStateAction<PlaylistType[] | null>>;
  songForPlaylist: Songs | null;
  setSongForPlaylist: Dispatch<SetStateAction<Songs | null>>;
  createPlaylist: (songId: string, name: string, thumbnail?: string) => void;
};

const initialState = {
  userPlaylists: [],
  setUserPlaylists: () => {},
  songForPlaylist: null,
  setSongForPlaylist: () => {},
  createPlaylist: (songId: string) => {
    return songId;
  },
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
  const [songForPlaylist, setSongForPlaylist] = useState<Songs | null>(null);
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { user } = useContext(UserContext);

  const createPlaylist = async (
    songId: string,
    name: string,
    thumbnail?: string
  ) => {
    if (songId != null && name != null) {
      const URL = `playlist/create/${user?.userId}`;
      const data = {
        playlistSongs: [songId],
        playlistName: name,
        thumbnail: thumbnail,
      };

      try {
        const response = await postData(URL, data, getToken);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user && user.userId.length > 0) {
      const getUserPlaylists = async () => {
        const path = `playlist/user/${user.userId}`;
        const response: AxiosResponse["data"] = await postData(
          path,
          {},
          getToken
        );
        setUserPlaylists(response.incomingData);
      };
      getUserPlaylists();
    }
  }, [user]);

  return (
    <PlaylistContext.Provider
      value={{
        userPlaylists,
        setUserPlaylists,
        songForPlaylist,
        setSongForPlaylist,
        createPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
