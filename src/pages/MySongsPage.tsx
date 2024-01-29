import { useContext, useEffect, useState } from "react";
import { useRenderer } from "../hooks/useRenderer";
import { useSongs } from "../context/songContext/songContext";
import { UserContext } from "../context/userContext/UserContext";
import { Link } from "react-router-dom";
import { ADDMUSICPAGE } from "../routes/paths";
import { WelcomeUserSection } from "../components/welcomeUserSection";
import { Container } from "../components/containers/Container";
import { HeaderSection } from "../components/header/Header";
import { UserContainer } from "../components/containers/UserContainer";
import Loader from "../components/Loader/Loader";

const MySongsPage = () => {
  const { mySongs, getMySongs, isModifiedSong } = useSongs();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { renderSongs: renderMySongs } = useRenderer({
    songs: mySongs,
    layout: "list",
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getMySongs(user);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    loadData();
  }, [isModifiedSong]);

  return (
    <>
      <HeaderSection text="My Sphere" />
      <UserContainer>
        <WelcomeUserSection editUserLogo={true} />
      </UserContainer>
      <Container>
        <div>
          {isLoading ? (
            <Loader />
          ) : mySongs.length > 0 ? (
            renderMySongs()
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
