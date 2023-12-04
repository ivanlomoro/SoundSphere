import { useInteractions } from '../../context/userContext/InteractionContext'
import { Button } from '../button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { StyledColumnContainer } from './card.styled.components';
import { useSwal } from '../../context/userContext/messages';

export default function PlaylistActionButtons() {
    const { selectedPlaylist,  } = useInteractions()
    const { handleUpdatePlaylist, handleDeletePlaylist } = useSwal()
    if (!selectedPlaylist) {
        return;
    }
  return (
      <div>
        <StyledColumnContainer>
          <Button
              content={<FaEdit />}
              variant="StyledBackButton"
              onClick={() => { handleUpdatePlaylist(selectedPlaylist.frontId) }}
          />
          <Button
              content={<FaTrash />}
              variant="StyledBackButton"
              onClick={() => { handleDeletePlaylist(selectedPlaylist.frontId) }}
          />
      </StyledColumnContainer>
      </div>
  )
};


