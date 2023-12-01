import { useContext, useEffect, useState } from "react";
import { useRenderer } from "../hooks/useRenderer";
import { useSongs } from "../context/songContext/songContext";
import { UserContext } from "../context/userContext/UserContext";
import { Link } from "react-router-dom";
import { ADDMUSICPAGE } from "../routes/paths";
import { Container, HeaderSection, WelcomeUserSection } from "../components";
import { UserContainer } from "../components/containers/UserContainer";


const MySongsPage = () => {
  const {
    mySongs,
    getMySongs,
    isFavorite,
    toggleFavorite,
    addToRecents,
    isModifiedSong,
  } = useSongs();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { renderSongs } = useRenderer({
    mySongs,
    toggleFavorite,
    isFavorite,
    addToRecents,
    layout: "list",
    isMySong: true,
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getMySongs(user);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    loadData();
  }, [isModifiedSong]);

  return (
    <>
      <Container>
        <HeaderSection text="My Songs" />
        <UserContainer>
          <WelcomeUserSection editUserLogo={true}/>
        </UserContainer>
        <div>
          <h2>My Songs</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : mySongs.length > 0 ? (
            renderSongs()
          ) : (
            <p>
              You didn`t upload any songs!{" "}
              <Link to={ADDMUSICPAGE}> upload song</Link>{" "}
            </p>
          )}
        </div>
      </Container>
    </>
  );
};

export default MySongsPage;
