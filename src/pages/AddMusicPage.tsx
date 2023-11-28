import React, { useState, useContext } from "react";
import { Container, HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import postData from "../api/postApi";
import axios from "axios";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

// export const AddMusicPage = () => {
//   const { uploadSong } = useApiCalls();
//   const [imageSrc, setImageSrc] = useState<string>("");
//   const [soundSrc, setSoundSrc] = useState<string>("");
//  const [imageToUpload, setImageToUpload] = useState<string>("");
//   const [songToUpload, setSongToUpload] = useState<string>("");


//   const soundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     setSongToUpload(file);
//     if (!file) {
//       return null;
//     }

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSoundSrc(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Para subir la imagen de la musica

//   const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) {
//       return null;
//     }

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageSrc(reader.result as string);
//         setImageToUpload(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const availableGenres = [
//     "Pop",
//     "Rock",
//     "Hip Hop",
//     "Jazz",
//     "Classical",
//     "Electronic",
//   ];

//   const Submit = async () => {
//     const imageData = new FormData();
//     imageData.append("file", imageToUpload);
//     imageData.append("upload_preset", "UploadImages");

//     console.log("IMAGE DATA:", imageData);

//     const imageUploadedResponse = await axios.post(
//       "https://api.cloudinary.com/v1_1/dnmoqsjh7/image/upload",
//       imageData
//     );
//     console.log(imageUploadedResponse);

//     const songData = new FormData();
//     songData.append("file", songToUpload);
//     songData.append("upload_preset", "UploadAudio");
//     console.log("SONG FILE", songToUpload);

//     console.log("SONG DATA:", songData);

//     const songUploadedResponse = await axios.post(
//       "https://api.cloudinary.com/v1_1/dnmoqsjh7/video/upload",
//       songData
//     );
//     console.log(songUploadedResponse);

//     const requestData = {
//       thumbnail: imageSrc,
//       url: imageSrc,
//       name: songName,
//       genreId: selectedGenre,
//       isPublic: !isPrivate,
//       userCreator: "user123",
//     };

//     try {
//       await uploadSong(requestData);
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <section>
//       <Container>
//         <HeaderSection text="Add Music" />
//         <ImageContainer>
//           {imageSrc ? (
//             <Image src={imageSrc} alt="uploaded image" />
//           ) : (
//             <AiOutlineCamera size={70} />
//           )}
//         </ImageContainer>

//         <ButtonContainer>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={imageUpload}
//             {...register('thumbnail')}
//             style={{ display: "none" }}
//             id="image-upload"
//           />

//           <label htmlFor="image-upload">



//             <Button as="span">Add Image</Button>
//           </label>
//           <Input
//             type="text"
//             placeholder="Enter song name"
//             {...register('name')}

//           />
//           <Input
//             type="file"
//             accept="audio/mpeg, audio/mp3"
//             onChange={soundUpload}
//             style={{ display: "none" }}
//             id="sound-upload"
//             {...register('url')}
//           />

//           <label htmlFor="sound-upload">
//             <Button as="span">Add sound</Button>
//           </label>
//         </ButtonContainer>

//         <Input
//           type="text"
//           placeholder="Enter song name"
//           {...register('name')}
//         />

//         <Select >
//           <option value="">Select a genre</option>
//           {availableGenres.map((genre) => (
//             <option key={genre} value={genre}>
//               {genre}
//             </option>
//           ))}
//         </Select>

//         <Select>
//           <option value="existing">Select Existing Album</option>
//           <option value="new">Create New Album</option>
//         </Select>
//         {selectedOption === "new" && (
//           <Input
//             type="text"
//             placeholder="Enter new album name"
//       }
//           />
//         )}

//         <SwitchContainer >
//           <Slider isPrivate={isPrivate} />
//         </SwitchContainer>
//         <Text>{isPrivate ? "Private" : "Public"}</Text>

//         <ButtonSummit onClick={Submit}>Submit</ButtonSummit>
//       </Container>
//     </section>
//   );
// };

import { useForm, } from 'react-hook-form';
import { SongUploadData } from '../context/songContext/ApiCalls';

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
