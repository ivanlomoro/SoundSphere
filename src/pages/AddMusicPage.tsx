import { SongUploadData } from "../context/songContext/ApiCalls";
import { UserContext } from "../context/userContext/UserContext";
import React, { useState, useContext, useEffect } from "react";
import { Container, HeaderSection } from "../components";
import { genres } from "../interfaces/uploadTypes";
import { AiOutlineCamera } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import postData from "../api/postApi";
import {
  ImageContainer,
  Image,
  ButtonContainer,
  Input,
  Button,
  Select,
} from "../components/uploadForm/UploadFormComponents";
import getData from "../api/getApi";
interface Album{
  id: string,
  name: string,
  userId: string,
  thumbnail: string,
  isPublic: boolean,
}
export const AddMusicPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<SongUploadData>();
  const { getAccessTokenSilently: getToken, isAuthenticated } = useAuth0();
  const { user } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [songToUpload, setSongToUpload] = useState<string | File>("");
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const selectedGenre = watch("genreId");
  const selectedAlbum = watch("albumId");
  const [albumToUpload, setAlbumToUpload] = useState<string>("");
  // const [albumCreated, setAlbumCreated] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const getUserAlbums = async () => {
        const response: AxiosResponse['data'] = await getData(`album/user/${user.userId}`, getToken);
        setUserAlbums(response.userData);
      };
      getUserAlbums();
    }
  }, [isAuthenticated, user]);

  // const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImageSrc(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const soundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) {
  //     return;
  //   }
  //   setSongToUpload(file);
  // };

  const submitData = async (data: SongUploadData) => {
    const requestUrl = `song/${user?.userId}`;

    // const imageData = new FormData();
    // // imageData.append("file", imageSrc);
    // imageData.append("upload_preset", "UploadImages");

    // const { data: cloudinaryImage } = await axios.post(
    //   "https://api.cloudinary.com/v1_1/dnmoqsjh7/image/upload",
    //   imageData
    // );

    // const songData = new FormData();
    // songData.append("file", songToUpload);
    // songData.append("upload_preset", "UploadAudio");

    // const { data: cloudinarySong } = await axios.post(
    //   "https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload",
    //   songData
    // );

    const createOrSelectAlbum = async () => {
      if (!selectedAlbum) {
        return console.log("No album selected")
      }
      if (selectedAlbum === "newAlbum") {
        const newAlbumData = {
          name: data.name,
          thumbnail: "cloudinaryImage.secure_url",
          genreId: '6564f6c8cdafe12787660bf0',
          isPublic: true,
        };
        const response: AxiosResponse['data'] = await postData(
          `album/${user?.userId}`,
          newAlbumData,
          getToken
        );
        setAlbumToUpload(response.userData.id);
        return response;
      }

      if (selectedAlbum !== "newAlbum") setAlbumToUpload(selectedAlbum);
    };

    const albumResponse: AxiosResponse['data'] = await createOrSelectAlbum();

    if (
      albumResponse.statusText === "Created" ||
      selectedAlbum !== "newAlbum"
    ) {
      const albumId = albumResponse?.userData?.id || albumToUpload;

      const requestData = {
        thumbnail: "cloudinaryImage.secure_url",
        url:" cloudinarySong.secure_url",
        name: data.name,
        genreId: '6564f6c8cdafe12787660bf0',
        isPublic: true,
        userCreator: user?.userId,
        albumId: albumId,
      };

      try {
        await postData(requestUrl, requestData, getToken);
        setImageSrc("");
        reset();
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(submitData)}><Container>
        {/* <HeaderSection text="Upload" />
     
          <ImageContainer>
            {imageSrc ? (
              <Image src={imageSrc} alt="uploaded image" />
            ) : (
              <AiOutlineCamera size={70} />
            )}
          </ImageContainer>
          <label>
            <input
              type="checkbox"
              {...register("isPublic")}
            />
            Make Public
          </label>
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
            </label> */}

            <Input
              type="text"
              placeholder="Enter song name"
              {...register("name")}
            />
            {/* <Input
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
          </Select> */}
          <Select {...register("albumId")}>
            <option value="">Select an album</option>
            <option value="newAlbum">Create new album</option>

            {userAlbums.length > 0 && userAlbums.map((album) => (


            <option key={album.id} value={album.id}>
              {album.name}
            </option>
            ))}
          </Select>
          <Input
            type="text"
            placeholder="Enter album name"
            {...register("newAlbum")}
          />

          <button>Submit</button>   </Container>
        </form>
   
    </section>
  );
};
