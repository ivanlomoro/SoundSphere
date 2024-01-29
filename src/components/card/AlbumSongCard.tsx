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
  song: Songs;
  isPlaylist?: boolean;
};

const InlineContiner = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 3rem;
  margin: 0.2rem;
  padding-inline: 1.4em;
  background-color: var(--clr-bg-elements);
  white-space: nowrap;
`;
const ButtonsContainer = styled(CommonButtonContainer)`
  justify-content: right;
  right: 0;
`;

const SongTitle = styled.div`
  width: 65%;
`;

const SongHeading = styled.h3`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumSongCard: FC<Props> = ({ song, isPlaylist }) => {
  const { isFavorite, toggleFavorite } = useInteractions();
  const { name } = song;
  const { setSongForPlaylist } = useContext(PlaylistContext);

  return (
    <InlineContiner>
      <SongTitle>
        <SongHeading>{name}</SongHeading>
      </SongTitle>
      <ButtonsContainer>
        <FaveButton
          onClick={(event) => {
            toggleFavorite(song);
            event.stopPropagation();
          }}
        >
          {isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
        </FaveButton>
        {!isPlaylist && (
          <FaveButton
            onClick={(event) => {
              setSongForPlaylist(song);
              event.stopPropagation();
            }}
          >
            <Plus />
          </FaveButton>
        )}
      </ButtonsContainer>
    </InlineContiner>
  );
};
