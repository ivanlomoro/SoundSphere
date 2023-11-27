import { useApiCalls } from "../../context/songContext/ApiCalls";



export const UploadForm = () => {


        const { uploadSong } = useApiCalls();

        
        const testData = {
            name: "Wonder Wall",
            artist: "Oasis",
            genre: "Rock",
            url: "https://example.com/song-url",
            thumbnail: "https://example.com/thumbnail-url",
        };

      
        const handleUpload = async () => {
            try {
                await uploadSong(testData);
                alert('Song uploaded successfully!');
            } catch (error) {
                alert('Failed to upload song');
                console.error(error);
            }
        };

        return (
        
            <button onClick={handleUpload}>Upload Test Song</button>
        );
    };

   
    

