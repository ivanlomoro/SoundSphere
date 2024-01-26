import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../components";
import { useParams } from "react-router-dom";
import { useRenderer } from "../hooks/useRenderer";
import { Album } from "./AddMusicPage";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { AlbumHeader } from "../components/albumHeader/albumHeader";

const AlbumDisplayPage = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const { albums } = useApiCalls();
  const album: Album | undefined = albums.find((album) => album.id === albumId);
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
      {album ? <AlbumHeader album={album} /> : <h3> No hay canciones</h3>}
      {album ? renderAlbumSongs() : <h3> No hay canciones</h3>}
    </>
  );
};

export default AlbumDisplayPage;
