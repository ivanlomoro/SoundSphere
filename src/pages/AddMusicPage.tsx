import React, { useState, useContext, useEffect } from "react";
import { Container, HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import postData from "../api/postApi";
import axios from "axios";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

import { useForm } from "react-hook-form";
import { SongUploadData } from "../context/songContext/ApiCalls";

// LOGICA LISTA PARA FETCH, PERO HARDCODEADO DE MOMENTO
import { genres } from "../interfaces/uploadTypes";
import {
  ImageContainer,
  Image,
  ButtonContainer,
  Input,
  Button,
  Select,
} from "../components/uploadForm/UploadFormComponents";
import getData from "../api/getApi";

export const AddMusicPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<SongUploadData>();
  const { getAccessTokenSilently: getToken, isAuthenticated } = useAuth0();
  const { user } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [songToUpload, setSongToUpload] = useState<string | File>("");
  const selectedGenre = watch("genreId");

  useEffect(() => {
    if (user) {
      const getUserAlbums = async () => {
        const response = await getData(`album/${user.userId}`, getToken);
        console.log(response);
      };
      getUserAlbums();
    }
  }, [isAuthenticated]);

  // const [isPublic, setIsPublic] = useState(false);
  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const soundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setSongToUpload(file);
  };

  const submitData = async (data: SongUploadData) => {
    console.log("clickedSubmit");
    const requestUrl = `song/${user.userId}`;

    const imageData = new FormData();
    imageData.append("file", imageSrc);
    imageData.append("upload_preset", "UploadImages");

    const { data: cloudinaryImage } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmoqsjh7/image/upload",
      imageData
    );

    const songData = new FormData();
    songData.append("file", songToUpload);
    songData.append("upload_preset", "UploadAudio");
    console.log("SONG FILE", songToUpload);

    const { data: cloudinarySong } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload",
      songData
    );

    console.log(cloudinarySong);

    const requestData = {
      thumbnail: cloudinaryImage.secure_url,
      url: cloudinarySong.secure_url,
      name: data.name,
      // artist: data.artist,
      genreId: selectedGenre,
      isPublic: true,
      userCreator: "user123",
    };

    console.log(requestData);

    try {
      await postData(requestUrl, requestData, getToken);
      setImageSrc("");
      reset();
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
              {...register("name")}
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
          <Select {...register("genreId")}>
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
          {/* <SwitchContainer onClick={() => setIsPrivate(!isPrivate)}>
            <Slider isPrivate={isPrivate} />
          </SwitchContainer>
          <Text>{isPrivate ? "Private" : "Public"}</Text> */}

          <button>Submit</button>
        </form>
      </Container>
    </section>
  );
};
