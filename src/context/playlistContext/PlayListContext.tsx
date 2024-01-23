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
import { AxiosResponse, isAxiosError } from "axios";
import { UserContext } from "../userContext/UserContext";
import { Songs } from "../../Types/SongsTypes";
import patchData from "../../api/patchApi";
import toast from "react-hot-toast";

export type PlayListContextType = {
  userPlaylists: PlaylistType[] | null;
  setUserPlaylists: Dispatch<SetStateAction<PlaylistType[] | null>>;
  songForPlaylist: Songs | null;
  setSongForPlaylist: Dispatch<SetStateAction<Songs | null>>;
  createPlaylist: (songId: string, name: string, thumbnail?: string) => void;
  addSongToPlaylist: (
    songId: string,
    thumbnail: string,
    playlistId: string,
    playlistName: string
  ) => void;
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
        await postData(URL, data, getToken);
        setSongForPlaylist(null);
        setPlaylistsToUpdate(true);
        toast.success(`Added to ${name}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addSongToPlaylist = async (
    songId: string,
    thumbnail: string,
    playlistId: string,
    playlistName: string
  ) => {
    if (songId != null) {
      const URL = `playlist/addsong/${playlistId}`;
      const data = {
        songId: songId,
        thumbnail: thumbnail,
      };

      try {
        const response = await patchData(URL, data, getToken);
        setSongForPlaylist(null);
        setPlaylistsToUpdate(true);
        toast.success(`Added to ${playlistName}.`);
      } catch (error) {
        if (isAxiosError(error) && error.response)
          toast.error(error.response.data.error);
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
