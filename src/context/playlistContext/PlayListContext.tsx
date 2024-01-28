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
import { PlaylistType } from "../../interfaces/PlaylistType";

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
  getMusicByPlaylist: (playlistId: string, playlistName: string) => void;
  songs: Songs[];
};

const initialState = {
  userPlaylists: [],
  setUserPlaylists: () => {},
  songForPlaylist: null,
  setSongForPlaylist: () => {},
  createPlaylist: () => {},
  addSongToPlaylist: () => {},
  getMusicByPlaylist: () => {},
  songs: [],
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

  const [songs, setSongs] = useState<Songs[]>([]);

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
        await patchData(URL, data, getToken);
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

  const getMusicByPlaylist = async (
    playlistId: string,
    playlistName: string
  ) => {
    if (playlistId != null) {
      const URL = `playlist/getSongsByPlaylistId`;

      try {
        const data = { playlistId };
        const response = await postData(URL, data, getToken);

        if (
          response &&
          response.incomingData &&
          Array.isArray(response.incomingData.songs)
        ) {
          const fetchedSongs = response.incomingData.songs;

          if (Array.isArray(fetchedSongs) && fetchedSongs.length > 0) {
            setSongs(fetchedSongs);
          } else {
            console.error(`No songs found for playlist: ${playlistName}`);
          }
        } else {
          console.error(`Invalid response data format.`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        userPlaylists,
        setUserPlaylists,
        songForPlaylist,
        setSongForPlaylist,
        createPlaylist,
        addSongToPlaylist,
        getMusicByPlaylist,
        songs,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
