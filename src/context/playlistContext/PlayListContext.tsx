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
import patchData from "../../api/patchApi";

export type PlayListContextType = {
  userPlaylists: PlaylistType[] | null;
  setUserPlaylists: Dispatch<SetStateAction<PlaylistType[] | null>>;
  songForPlaylist: Songs | null;
  setSongForPlaylist: Dispatch<SetStateAction<Songs | null>>;
  createPlaylist: (songId: string, name: string, thumbnail?: string) => void;
  addSongToPlaylist: (songId: string, playlistId: string) => void;
};

const initialState = {
  userPlaylists: [],
  setUserPlaylists: () => {},
  songForPlaylist: null,
  setSongForPlaylist: () => {},
  createPlaylist: () => {},
  addSongToPlaylist: () => {},
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
  const [playlistsToUpdate, setPlaylistsToUpdate] = useState(false);
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
        setSongForPlaylist(null);
        setPlaylistsToUpdate(true);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addSongToPlaylist = async (songId: string, playlistId: string) => {
    console.log("INIT");
    console.log(playlistId);

    if (songId != null) {
      console.log(songId);
      const URL = `playlist/addsong/${playlistId}`;
      const data = {
        songId: songId,
      };

      try {
        const response = await patchData(URL, data, getToken);
        console.log(response);
        setSongForPlaylist(null);
        setPlaylistsToUpdate(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getUserPlaylists = async () => {
    if (user && user.userId.length > 0) {
      const path = `playlist/user/${user.userId}`;
      const response: AxiosResponse["data"] = await postData(
        path,
        {},
        getToken
      );
      setUserPlaylists(response.incomingData);
    }
  };

  useEffect(() => {
    getUserPlaylists();
  }, [user]);

  useEffect(() => {
    if (playlistsToUpdate) {
      getUserPlaylists();
      setPlaylistsToUpdate(false);
    }
  }, [playlistsToUpdate]);

  return (
    <PlaylistContext.Provider
      value={{
        userPlaylists,
        setUserPlaylists,
        songForPlaylist,
        setSongForPlaylist,
        createPlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
