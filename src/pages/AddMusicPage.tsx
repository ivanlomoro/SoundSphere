import React, { useState, useContext } from "react";
import { Container, HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import postData from "../api/postApi";
import axios from "axios";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";



import { useForm, } from 'react-hook-form';
import { SongUploadData } from "../Types/SongUploadData";

// LOGICA LISTA PARA FETCH, PERO HARDCODEADO DE MOMENTO
import { genres } from "../interfaces/uploadTypes";
import { ImageContainer, Image, ButtonContainer, Input, Button, Select } from "../components/uploadForm/UploadFormComponents";


export const AddMusicPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<SongUploadData>();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { user } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [soundSrc, setSoundSrc] = useState<string>('');
  const selectedGenre = watch('genreId');
  if (!user) {
    return console.log('missig user');
  }

  // const [isPublic, setIsPublic] = useState(false);
  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'UploadImages');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dnmoqsjh7/image/upload',
        imageData
      );
      setImageSrc(response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const soundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const songData = new FormData();
    songData.append('file', file);
    songData.append('upload_preset', 'UploadAudio');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload',
        songData
      );
      setSoundSrc(response.data.url);
    } catch (error) {
      console.error('Error uploading song:', error);
    }
  };

  const submitData = async (data: SongUploadData) => {
    console.log("clickedSubmit")
    const requestUrl = `song/${user.userId}`;

    const requestData = {
      thumbnail: imageSrc,
      url: soundSrc,
      name: data.name,
      // artist: data.artist,
      genreId: selectedGenre,
      isPublic: true,
      userCreator: "user123",
    };
 
    try {
      await postData(requestUrl, requestData, getToken);
      setSoundSrc('');
      setImageSrc('');
      reset()
    } catch (error) {
      console.error("An error occurred:", error);
    }
  
 
    
   
   

  };


  return (
    
      <section>
        <Container>
          <HeaderSection text="Upload" />
          <form onSubmit={handleSubmit(submitData)}>
          <ImageContainer>
            {imageSrc ? (
              <Image src={imageSrc} alt="uploaded image" />
            ) : (
              <AiOutlineCamera size={70} />
            )}
          </ImageContainer>

          <ButtonContainer>
            <Input
              type="file"
              accept="image/*"
              onChange={imageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button as="span">Add Image</Button>
            </label>
            {/* <Input type="text" placeholder="Enter artist name" {...register('artist')} /> */}

            <Input
              type="text"
              placeholder="Enter song name"
              {...register('name')}
            />
            <Input
              type="file"
              accept="audio/mpeg, audio/mp3"
              onChange={soundUpload}
              style={{ display: "none" }}
              id="sound-upload"
            />
            <label htmlFor="sound-upload">
              <Button as="span">Add Sound</Button>
            </label>
          </ButtonContainer>
          <Select {...register('genreId')}>
            <option value="">Select a genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Select>
          {/* <SwitchContainer onClick={() => setIsPrivate(!isPrivate)}>
            <Slider isPrivate={isPrivate} />
          </SwitchContainer>
          <Text>{isPrivate ? "Private" : "Public"}</Text> */}

          <button >Submit</button>
           </form>
        </Container>
      </section>
   
  );
};
