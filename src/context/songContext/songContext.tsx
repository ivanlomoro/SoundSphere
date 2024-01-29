import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import type { Songs } from "../../Types/SongsTypes";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { Artist } from "../../Types/SongsTypes";
import axios from "axios";
import { UserContext } from "../userContext/UserContext";
import { editSongType } from "../../components/card/CardContainerButtons";
import Swal from "sweetalert2";
import { useApiCalls } from "./ApiCalls";
import { SongsContextType } from "../../Types/SongsTypes";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

export type UserInterface = {
  userId: string;
};

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  const [songs, setSongs] = useState<Songs[]>([]);
  const [recents, setRecents] = useLocalStorage<Songs[]>("recents", []);
  const [favorites, setFavorites] = useLocalStorage<Songs[]>("favorites", []);
  const [followed, setFollowed] = useLocalStorage<Artist[]>("followed", []);
  const [mySongs, setMySongs] = useState<Songs[]>([]);
  const [isModifiedSong, setIsModifiedSong] = useState<boolean>(false);
  const [editedSong, setEditedSong] = useState<Songs | null>(null);
  const [errorEditedSong, setErrorEditedSong] = useState<boolean>(true);
  const { publicSongs } = useApiCalls();

  useEffect(() => {
    setSongs(publicSongs);
    getMySongs(user);
  }, []);

  useEffect(() => {
    setIsModifiedSong(false);
  }, [isModifiedSong]);
  useEffect(() => {
    setErrorEditedSong(true);
  }, [errorEditedSong]);

  const songExists = (arr: Songs[], id: string) =>
    arr.some((song: Songs) => song.id === id);
  const artistExists = (arr: Artist[], id: string) =>
    arr.some((artist: Artist) => artist.id === id);

  const getMySongs = async (user: UserInterface | null) => {
    if (user != null) {
      const userId = user.userId;
      const URL = `${apiUrl}song/user/${userId}`;

      try {
        const response = await axios.get(URL);
        const userSongs: Songs[] = response.data;
        setMySongs(userSongs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getSongById = async (songId: string) => {
    if (songId != null) {
      const URL = `${apiUrl}song/${songId}`;
      try {
        const response = await axios.get(URL);
        const song: Songs = response.data;
        setEditedSong(song);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteSong = async (songId: string) => {
    if (songId != null) {
      const URL = `${apiUrl}song/${songId}`;

      try {
        const response = await axios.delete(URL);
        if (response.status === 204) {
          setIsModifiedSong(true);
          Swal.fire({
            title: "Deleted!",
            text: "Your song has been deleted.",
            icon: "success",
            background: "#111111",
            color: "#ffffff",
            confirmButtonColor: "#bd00ff",
          });
        } else {
          console.error(`Error deleting song: ${response.statusText}`);
          Swal.fire(
            "Error",
            "There was an error trying to delete the song.",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error",
          "There was an error trying to delete the song.",
          "error"
        );
      }
    }
  };

  const updateSong = async (songId: string, editSong: editSongType) => {
    if (songId != null) {
      const URL = `${apiUrl}song/${songId}`;
      try {
        const response = await axios.patch(URL, editSong);
        if (response.status === 201) {
          setIsModifiedSong(true);
          ({
            title: "Updated song!",
            text: "Your song has been updated.",
            icon: "success",
            background: "#111111",
            color: "#fff",
            confirmButtonColor: "#bd00ff",
          });
        } else {
          console.error(`Error updating song: ${response.statusText}`);
          setIsModifiedSong(false);
        }
      } catch (error) {
        console.error("Error catch updatesong", error);
        Swal.fire(
          "Error",
          "There was an error trying to update the song.",
          "error"
        );
        setIsModifiedSong(false);
      }
    }
  };

  const addToRecents = (song: Songs) => {
    if (!songExists(recents, song.id)) {
      setRecents([song, ...recents]);
    }
  };

  const addToFavorites = (song: Songs) => {
    if (!songExists(favorites, song.id)) {
      setFavorites([...favorites, song]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((song: Songs) => song.id !== id)
    );
  };

  const isFavorite = (id: string): boolean => songExists(favorites, id);
  const isMySong = (id: string): boolean => songExists(mySongs, id);

  const toggleFavorite = (song: Songs) => {
    isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
  };

  function addToFollowed(artist: Artist) {
    const { id } = artist;
    if (!followed.some((item: Artist) => item.id === id)) {
      setFollowed([...followed, artist]);
    }
  }

  function removeFromFollowed(id: string) {
    setFollowed((currentFollowed) =>
      currentFollowed.filter((item) => item.id !== id)
    );
  }

  function toggleFollowed(artist: Artist) {
    if (isFollowed(artist.id)) {
      removeFromFollowed(artist.id);
    } else {
      addToFollowed(artist);
    }
  }

  const isFollowed = (id: string): boolean => artistExists(followed, id);

  return (
    <SongsContext.Provider
      value={{
        setSongs,
        recents,
        isMySong,
        favorites,
        songs,
        isFavorite,
        isFollowed,
        addToRecents,
        addToFollowed,
        toggleFavorite,
        toggleFollowed,
        addToFavorites,
        removeFromFollowed,
        removeFromFavorites,
        mySongs,
        getMySongs,
        deleteSong,
        isModifiedSong,
        updateSong,
        getSongById,
        editedSong,
        errorEditedSong,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export const useSongs = () => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs must be used within a SongsProvider");
  }
  return context;
};

export default SongsProvider;
