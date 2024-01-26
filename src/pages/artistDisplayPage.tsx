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
  const [albums, setAlbums] = useState<Album[] | null>(null); // Initialize as null

  useEffect(() => {
    // Use an effect to fetch albums when the component mounts
    const fetchAlbums = async () => {
      try {
        const response = await fetchAlbumsByArtistId(artistId!);
        if (response!) {
          setAlbums(response); // Set the fetched albums in state if there is data
        } else {
          // Handle the case when there is no data returned
          console.warn("No albums found for the artist.");
          setAlbums([]); // Set albums as an empty array
        }
      } catch (error) {
        console.error("Failed to fetch Albums:", error);
        setAlbums([]); // Set albums as an empty array in case of error
      }
    };

    if (artistId) {
      fetchAlbums(); // Fetch albums when artistId is available
    }
  }, [fetchAlbumsByArtistId, artistId]);

  return (
    <>
      <HeaderSection
        text="Artist"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      {albums !== null && ( // Check if albums is not null
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
