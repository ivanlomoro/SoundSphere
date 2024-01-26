import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../components";
import { useParams } from "react-router-dom";
import { Album } from "./AddMusicPage";
import { AlbumHeader } from "../components/albumHeader/albumHeader";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { AlbumSongCard } from "../components/card/AlbumSongCard";
import { useInteractions } from "../context/userContext/InteractionContext";
import { PlayerContext } from "../context/playerContext/playerContext";
import styled from "styled-components";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const ListSongsContainer = styled.ul`
list-style: none;
`

const AlbumDisplayPage = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const [album, setAlbum] = useState<Album>()
  const [isLoading, setLoading] = useState<boolean>(true);

  const { addToRecents } = useInteractions();
  const { setCurrentSong, setCurrentList, setPlaying } =
    useContext(PlayerContext);


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
        { albumId && await getAlbumsById(albumId) }

      } catch (error) {
        console.error("can't load album", error)
      }
      setLoading(false);
    };
    loadData();
  }, [])

  console.log("DISPLAY ALBUM:", album)

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
          {album ? <AlbumHeader album={album} /> : (<h3> No hay canciones</h3>)}

          {album &&
            <ListSongsContainer className="list-none">
              {album.Song.map((song, index) => (
                <li key={index} onClick={() => {
                  addToRecents(song);
                  setCurrentList(album.Song);
                  setCurrentSong(song);
                  setPlaying(true);
                }}>
                  <AlbumSongCard song={song} />
                </li>
              ))}
            </ListSongsContainer>


          }

        </>
      }






    </>
  );
};

export default AlbumDisplayPage;
