import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../components";
import { useEffect, useState } from "react";
import { Songs } from "../Types/SongsTypes";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRenderer } from "../hooks/useRenderer";
const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const AlbumDisplayPage = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [albumSong, setAlbumSong] = useState<Songs[]>([]);
  const { renderSongs: renderAlbumSongs } = useRenderer({
    songs: albumSong,
    layout: "list",
  });

  const fetchSongsByAlbumId = async (albumId: string) => {
    try {
      const response = await customAxios.get(
        `song/getSongsByAlbumId/${albumId}`
      );
      const songs: Songs[] = response.data;
      setAlbumSong(songs);
    } catch (error) {
      console.error("Failed to fetch Songs by Album ID:", error);
    }
  };

  useEffect(() => {
    {
      albumId && fetchSongsByAlbumId(albumId);
    }
  }, []);

  return (
    <>
      <HeaderSection
        text="Album"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />
      {albumSong ? renderAlbumSongs() : <h3> No hay canciones</h3>}
    </>
  );
};

export default AlbumDisplayPage;
