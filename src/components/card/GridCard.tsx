import styled from "styled-components";
import { Button } from "../button/Button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { NavIcon } from "../NavBar/NavBar";

const GridCard = styled.li`
    width: 45vw;
    height: 15vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #6a6a6a;
    color: white;
    border-radius: 10px;
    margin: 10px;
`;

const GridCardImage = styled.img`
    width: 15vw;
    border-radius: 8px;
`

const GridCardDescription = styled.div`
    padding: 0.4rem;
   position: relative;
   width: 25vw;
   height: 15vw;
 
  `
const SongName = styled.h3`
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`
const SongArtist = styled.p`
white-space: nowrap;
  overflow: hidden;
  width: 20vw;
  text-overflow: ellipsis;
  Color: #aaaaaa;
  font-size: .5rem;
  margin: 0;
`

type Songs = {
    id: number;
    name: string;
    artist: string;
    url: string;
    thumbnail: string;
    genre: string;
    liked: boolean;
}
type SongCardProps = {
    song: Songs;
    toggleFavorite: (song: Songs) => void;
    isFavorite: (id: number) => boolean;
    addToRecents: (song: Songs) => void;
}




export function GridSongCard({ song, toggleFavorite, isFavorite, addToRecents }: Partial<SongCardProps>) {
    // La mierda esa del undefined la he resuelto con partial y esto, pero no estoy seguro
    if (!song) {
        return null;
    }
    if (!toggleFavorite || !isFavorite || !addToRecents) {
        return null;
    }

    return (
        <GridCard>
            <GridCardImage src={song.thumbnail} alt={song.name} />
            <GridCardDescription>
                <SongName>{song.name}</SongName>
                <SongArtist>{song.artist}</SongArtist> 
                <div style={{position: 'absolute', right: '0', top: '50%'}}>             
                <Button variant="StyledButtonPlay" onClick={() => addToRecents(song)} />
                </div>
             <div >
             {isFavorite(song.id) ? <NavIcon icon={AiFillHeart} onClick={()=>toggleFavorite(song)}/> : <NavIcon icon={AiOutlineHeart} onClick={()=>toggleFavorite(song)} />}
             </div>
             </GridCardDescription>
        </GridCard>
    );
}