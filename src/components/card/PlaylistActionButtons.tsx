import { useInteractions } from '../../context/userContext/InteractionContext'
import { Button } from '../button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { StyledColumnContainer } from './card.styled.components';

export default function PlaylistActionButtons() {
    const { selectedPlaylist, handleDeletePlaylist, handleUpdatePlaylist } = useInteractions()
    if (!selectedPlaylist) {
        console.log('');
        return;
    }
  return (
      <div><StyledColumnContainer>
          <Button
              content={<FaEdit />}
              variant="StyledBackButton"
              onClick={() => { handleUpdatePlaylist(selectedPlaylist.playlistName) }}
          />
          <Button
              content={<FaTrash />}
              variant="StyledBackButton"
              onClick={() => { handleDeletePlaylist(selectedPlaylist.playlistName) }}
          />
      </StyledColumnContainer></div>
  )
}


