import { useState } from "react"
import React, {  useContext } from "react";
import { Container, HeaderSection } from "../components";
import { AiOutlineCamera } from "react-icons/ai";
import postData from "../api/postApi";
import axios from "axios";
import { UserContext } from "../context/userContext/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm, } from 'react-hook-form';
import { ImageContainer, Image, Input, Button, Select } from '../components/uploadForm/UploadFormComponents';
import { useSongs } from "../context/songContext/songContext";
import { PlaylistFormData, Playlist } from "../Types/PlaylistFormData";

 const PlaylistPage = () => {



    const { register, handleSubmit, reset } = useForm<PlaylistFormData>();
    const { getAccessTokenSilently: getToken } = useAuth0();
    const { user } = useContext(UserContext);
    const {songs} = useSongs()
    const [imageSrc, setImageSrc] = useState<string>('');
    const [selectedSongs, setSelectedSongs]= useState<string[]>()
    const [playlist, setPlaylist] = useState<Playlist[]>()
    if (!user) {
        return console.log('missig user');
    }
     const playlist1 = ['656464e951b7864e3f0dae90', '656470cacf95ca79f2493b12']


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


     const submitData = async (data: PlaylistFormData) => {
        setSelectedSongs(playlist1)
         console.log("clickedSubmit");
         const url = `playlist/create/${user.userId}`;
         const requestData = {
             thumbnail: imageSrc,
             playlistName: data.playlistName, 
             playlistSongs: selectedSongs, 
         };

         try {
             const response = await postData(url, requestData, getToken);
             if (response.incomingData && response.statusText === 'OK') {
                 const newPlaylist = response.incomingData;
                 setPlaylist(prevPlaylists => [...(prevPlaylists || []), newPlaylist]);
                 setImageSrc('');
                 reset();
                 setSelectedSongs([]);
             } else {
                 console.error("No response or error in response");
             }
         } catch (error) {
             console.error("An error occurred:", error);
         }
     };

    return (
        <section>
           
                <HeaderSection text="Upload" />
                <form onSubmit={handleSubmit(submitData)}> <Container>
                    <ImageContainer>
                        {imageSrc ? (
                            <Image src={imageSrc} alt="uploaded image" />
                        ) : (
                            <AiOutlineCamera size={70} />
                        )}
                    </ImageContainer>
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
                    <Select  {...register('songs')}>
                        <option value="">Select a genre</option>
                        {songs.map(song => (
                            <option key={song.id} value={song.id}>{song.name}</option>
                        ))}
                    </Select>
                  <Input
                        type="text"
                        placeholder="Enter song name"
                        {...register('playlistName')}
                    />
                    <button >Submit</button>
               </Container>  </form>
           
        </section>

    );
};


export default PlaylistPage;