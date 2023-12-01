import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {

  const [songByGenre , setSongByGenre] = useState()
  const {genreId} = useParams();

    useEffect(() =>{
      
      const fetchSongsByGenre = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/song/public/genre/${genreId}`);
          setSongByGenre(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Failed to fetch Songs:", error);
        }
      };
      fetchSongsByGenre();
    }, []);

  return(
      <>
      <h3></h3>
      <ul>
           {songByGenre && songByGenre.map(song => {
        return(
          <li key= {song.id}>{song.name}</li>
        )
      })}
      </ul>
    </>
  )
};
export default GenrePage;
