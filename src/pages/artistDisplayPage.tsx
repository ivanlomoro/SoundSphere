import { useNavigate, useParams } from "react-router-dom";
import { HeaderSection } from "../components/header/Header";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlbumCard } from "../components/card/AlbumCard";
import { Album } from "./AddMusicPage";
import Loader from "../components/Loader/Loader";
import styled from "styled-components";
import { Artist } from "../Types/SongsTypes";
import { ArtistHeader } from "../components/albumHeader/albumHeader";
import Swal from "sweetalert2";

const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ArtistDisplayPage = () => {
  const { fetchAlbumsByArtistId } = useApiCalls();
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const getArtistById = async (id: string) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}artist/`;
    try {
      const { data } = await axios.get(url);

      const allArtist: Artist[] = data;

      const artist: Artist | undefined = allArtist.find(
        (artist) => artist.id === id
      );
      setArtist(artist);
    } catch (error) {
      console.error("Failed to fetch Artist :", error);

      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        {
          artistId && (await getArtistById(artistId));
        }
      } catch (error) {
        console.error("can't load artist", error);
      }

      try {
        const response = await fetchAlbumsByArtistId(artistId!);
        if (response!) {
          setAlbums(response);
        } else {
          console.warn("No albums found for the artist.");
          setAlbums([]);
        }
      } catch (error) {
        console.error("Failed to fetch Albums:", error);
        setAlbums([]);

        Swal.fire({
          title: "Server Error!",
          text: "This artist could not exist",
          icon: "error",
          confirmButtonText: "ok",
          background: "#111111",
          color: "white",
          confirmButtonColor: "#bd00ff",
        });
      }
      setLoading(false);
    };

    if (artistId) {
      loadData();
    }
  }, [fetchAlbumsByArtistId, artistId]);

  return (
    <>
      <HeaderSection
        text="Artist"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {artist && <ArtistHeader artist={artist} />}
          {albums !== null && (
            <>
              <h3>Albums</h3>
              <AlbumsContainer>
                {albums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </AlbumsContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ArtistDisplayPage;
