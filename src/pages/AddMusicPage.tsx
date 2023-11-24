import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, HeaderSection } from '../components'

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const Button = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`

export const AddMusicPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [soundSrc, setSoundSrc] = useState<string | null>(null);
  const [songName, setSongName] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('existing'); 
  const [newAlbumName, setNewAlbumName] = useState<string>('');

  // Para el genero
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value)
  }

  // Para el nombre de la musica
  const songNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value)
  }

  // Para subir la musica
  const soundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSoundSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Para subir la imagen de la musica

  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Privado o no
  const togglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  // Esto pilla el cambio en el select del album y si seleccionas crear uno nuevo te abre un imput para ponerle nombre

  const optionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // Aqui subimos desde la API los generos pero pongo estos de momento
  const availableGenres = [
    'Pop',
    'Rock',
    'Hip Hop',
    'Jazz',
    'Classical',
    'Electronic',
  ]
  
  return (

    <section>
      <Container>
        <HeaderSection text="Add Music" />
        <ImageContainer>
          {imageSrc ? (
            <Image src={imageSrc} alt="uploaded image" />
          ) : (
            <p>There is no image</p>
          )}
        </ImageContainer>
        <input
          type="file"
          accept="image/*"
          onChange={imageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />

        <label htmlFor="image-upload">
          <Button as="span">Add cover</Button>
        </label>

        <input
          type="file"
          accept="audio/mpeg, audio/mp3"
          onChange={soundUpload}
          style={{ display: 'none' }}
          id="sound-upload"
        />

        <label htmlFor="sound-upload">
          <Button as="span">Add sound</Button>
        </label>

        <input
          type="text"
          placeholder="Enter song name"
          value={songName}
          onChange={songNameChange}
        />

        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a genre</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button onClick={togglePrivacy}>
          {isPrivate ? 'Make Public' : 'Make Private'}
        </button>


        <select value={selectedOption} onChange={optionChange}>
          <option value="existing">Select Existing Album</option>
          <option value="new">Create New Album</option>
        </select>
        {selectedOption === 'new' && (
          <input
            type="text"
            placeholder="Enter new album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
        )}
      </Container>
    </section>
  )
}
