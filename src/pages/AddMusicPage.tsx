import React, { useState, useContext, useEffect } from "react";
import { HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import postData from "../api/postApi";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { SongUploadData } from "../context/songContext/ApiCalls";
import { genres } from "../interfaces/uploadTypes";
import {
  ImageContainer,
  Image,
  ButtonContainer,
  Input,
  Select,
  FormContainer,
  ErrorMessage,
} from "../components/uploadForm/UploadFormComponents";
import getData from "../api/getApi";
import toast from "react-hot-toast";
import { StyledButtonOutline } from "../components/button/Button";

interface Album {
  id: string;
  name: string;
  userId: string;
  thumbnail: string;
  isPublic: boolean;
}

export const AddMusicPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SongUploadData>();
  const { getAccessTokenSilently: getToken, isAuthenticated } = useAuth0();
  const { user } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [songToUpload, setSongToUpload] = useState<string | File>("");
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const [axiosLoading, setAxiosLoading] = useState(false);
  const selectedGenre = watch("genreId");
  const selectedAlbum = watch("albumId");

  useEffect(() => {
    if (user) {
      const getUserAlbums = async () => {
        const response: AxiosResponse["data"] = await getData(
          `album/user/${user.userId}`,
          getToken
        );
        setUserAlbums(response.userData);
      };
      getUserAlbums();
    }
  }, [isAuthenticated, user]);

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
    setAxiosLoading(true);
    const requestUrl = `song/${user?.userId}`;

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

    const { data: cloudinarySong } = await axios.post(
      "https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload",
      songData
    );

    const createOrSelectAlbum = async () => {
      if (selectedAlbum === "newAlbum") {
        const newAlbumData = {
          name: data.newAlbum,
          thumbnail: cloudinaryImage.secure_url,
          genreId: selectedGenre,
          isPublic: true,
        };
        const response = await postData(
          `album/${user?.userId}`,
          newAlbumData,
          getToken
        );
        console.log("THIS IS THE NEW RESPONSE:", response);
        return response;
      }
    };

    const albumResponse = await createOrSelectAlbum();

    if (
      (albumResponse &&
        albumResponse.statusText === "Created" &&
        albumResponse.incomingData.id) ||
      selectedAlbum !== "newAlbum"
    ) {
      const albumId =
        selectedAlbum === "newAlbum"
          ? albumResponse?.incomingData.id
          : selectedAlbum;

      console.log(albumId);

      const requestData = {
        thumbnail: cloudinaryImage.secure_url,
        url: cloudinarySong.secure_url,
        name: data.name,
        genreId: selectedGenre,
        isPublic: data.isPublic,
        userCreator: user?.userId,
        albumId: albumId,
      };

      try {
        await postData(requestUrl, requestData, getToken);
        setAxiosLoading(false);
        setImageSrc("");
        toast.success("Song uploaded successfully!");
        reset();
      } catch (error) {
        toast.error(
          "An error ocurred while uploading the song. Try again later."
        );
        console.error("An error occurred:", error);
      }
    }
  };

  const genreValidation = (value: string) =>
    value !== "" || "Please select a genre.";

  const albumValidation = (value: string) =>
    value !== "" || "Please select an album or create a new one.";

  const newAlbumValidation = (value: string) => {
    if (watch("albumId") == "newAlbum") {
      return (
        (value && value.length > 3) ||
        "New album name should be more than 3 characters long."
      );
    }
    return true;
  };

  return (
    <section>
      <HeaderSection text="Upload" />
      <form onSubmit={handleSubmit(submitData)}>
        <FormContainer>
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
              style={{ display: "none" }}
              id="image-upload"
              {...register("thumbnail", {
                required: {
                  value: true,
                  message: "Please upload a thumbnail",
                },
                onChange: imageUpload,
              })}
            />
            <div>
              <label htmlFor="image-upload">
                <StyledButtonOutline as="span">Add Image</StyledButtonOutline>
              </label>
              {errors.thumbnail && (
                <ErrorMessage>{errors.thumbnail.message}</ErrorMessage>
              )}
            </div>
            <Input
              type="file"
              accept="audio/mpeg, audio/mp3"
              style={{ display: "none" }}
              id="sound-upload"
              {...register("url", {
                required: {
                  value: true,
                  message: "Please upload a song",
                },
                onChange: soundUpload,
              })}
            />
            <div>
              <label htmlFor="sound-upload">
                <StyledButtonOutline as="span">Add Sound</StyledButtonOutline>
              </label>
              {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}
            </div>
          </ButtonContainer>

          <Input
            type="text"
            placeholder="Enter song name"
            {...register("name", {
              required: {
                value: true,
                message: "Song name required.",
              },
              minLength: {
                value: 4,
                message: "The song name must be at least 4 characters long.",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <Select
            {...register("genreId", {
              validate: genreValidation,
            })}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
          {errors.genreId && (
            <ErrorMessage>{errors.genreId.message}</ErrorMessage>
          )}

          <Select
            {...register("albumId", {
              validate: albumValidation,
            })}
          >
            <option value="">Select an album</option>
            <option value="newAlbum">Create new album</option>

            {userAlbums.length > 0 &&
              userAlbums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name}
                </option>
              ))}
          </Select>
          {errors.albumId && (
            <ErrorMessage>{errors.albumId.message}</ErrorMessage>
          )}

          {selectedAlbum === "newAlbum" && (
            <Input
              type="text"
              placeholder="Enter album name"
              {...register("newAlbum", {
                validate: newAlbumValidation,
              })}
            />
          )}
          {errors.newAlbum && (
            <ErrorMessage>{errors.newAlbum.message}</ErrorMessage>
          )}
          <label>
            <Input type="checkbox" {...register("isPublic")} />
            Public Song
          </label>

          <button>{axiosLoading ? "Uploading song..." : "Upload Song"}</button>
        </FormContainer>
      </form>
    </section>
  );
};
