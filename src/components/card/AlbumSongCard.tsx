/* eslint-disable react/react-in-jsx-scope */

import {
  CommonButtonContainer,
  FaveButton,
  Plus,
} from "./card.styled.components";
import { FC, useContext } from "react";
import { Songs } from "../../Types/SongsTypes";
import styled from "styled-components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";

import { useInteractions } from "../../context/userContext/InteractionContext";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";

type Props = {
  song: Songs
}

const InlineContiner = styled.div`
position: relative;
  display: flex;
  justify-content: space-between;
  height: 3rem;
  margin: 0.2rem;
  padding-inline: 1.4em;
  background-color: var(--clr-bg-elements);
  white-space: nowrap;
  `
const ButtonsContainer = styled(CommonButtonContainer)`
  justify-content: right;
  right: 0,
`

const SongTitle = styled.div`

text-overflow: ellipsis;
`

export const AlbumSongCard: FC<Props> = ({ song }) => {
const {isFavorite, toggleFavorite} = useInteractions()
  const { name } = song
  console.log("Album song card", song)
  const { setSongForPlaylist } = useContext(PlaylistContext);
  
  return (
    <InlineContiner >
      <SongTitle><h3>{name}</h3></SongTitle>
      <ButtonsContainer>
            <FaveButton
              onClick={() => {
                toggleFavorite(song);
              }}
            >
              {isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
            </FaveButton>
            <FaveButton onClick={() => setSongForPlaylist(song)}>
              <Plus />
            </FaveButton>
          </ButtonsContainer>
    </InlineContiner>

  )
}