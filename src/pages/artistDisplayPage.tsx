import { useNavigate, useParams } from "react-router-dom";
import { HeaderSection, ScrollableRowComponent } from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useEffect, useState } from "react";

import { AlbumCard } from "../components/card/AlbumCard";
import { Album } from "./AddMusicPage";

const ArtistDisplayPage = () => {
  const { fetchAlbumsByArtistId } = useApiCalls();
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [albums, setAlbums] = useState<Album[] | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
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
      }
    };

    if (artistId) {
      fetchAlbums();
    }
  }, [fetchAlbumsByArtistId, artistId]);

  return (
    <>
      <HeaderSection
        text="Artist"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      {albums !== null && (
        <>
          <h3>Albums</h3>
          <ScrollableRowComponent>
            {albums.map((album) => (
              <li key={album.id}>
                <AlbumCard album={album} />
              </li>
            ))}
          </ScrollableRowComponent>
        </>
      )}
    </>
  );
};

export default ArtistDisplayPage;
