import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { HeaderSection } from "../components";
import { PlaylistType } from "../interfaces/PlaylistType";
import { useRenderer } from "../hooks/useRenderer";
import { useApiCalls } from "../context/songContext/ApiCalls";


const AlbumDisplayPage = () => {
 
  const { fetchSongsByAlbumId } = useApiCalls();
  const navigate = useNavigate();
  
  return (
    <>
      <HeaderSection
        text="Album"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

     
    </>
  );
};

export default AlbumDisplayPage;