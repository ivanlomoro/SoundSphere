import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../components";
import { useParams } from "react-router-dom";
import { useRenderer } from "../hooks/useRenderer";
import { Album } from "./AddMusicPage";
import { AlbumHeader } from "../components/albumHeader/albumHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


const AlbumDisplayPage = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const [album, setAlbum] = useState<Album>()
  const [isLoading, setLoading] = useState<boolean>(true);


  const getAlbumsById = async (albumId: string) => {
    try {
      const response = await customAxios.get(
        `album/${albumId}`
      );
      const album: Album = response.data;
      setAlbum(album)
    } catch (error) {
      console.error("Failed to fetch Albums by Artist ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {

    try {
       {albumId && await getAlbumsById(albumId) }

    } catch (error) {
      console.error("can't load album", error)
    }
    setLoading(false);
  };
  loadData();
  }, [])

  console.log("DISPLAY ALBUM:", album)


  const { renderSongs: renderAlbumSongs } = useRenderer({
    songs: album?.Song,
    layout: "list",
  });

  return (
    <>
      <HeaderSection
        text=""
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />


      {isLoading
        ? <Loader />
        :
        <>
       { album && <AlbumHeader album={album} />}
       {album ? renderAlbumSongs() : (<h3> No hay canciones</h3>)}

        </>
      }

      




    </>
  );
};

export default AlbumDisplayPage;
