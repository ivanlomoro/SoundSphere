import { useApiCalls } from "../../context/songContext/ApiCalls";

export const UploadForm = () => {


        const { uploadSong } = useApiCalls();

        
        const testData = {
            name: "Pan",
            isPublic: true,
            genreId: "6560712d54a3139491bfad8f",
            userCreator: "6562012b45ac8690c4290edc",
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

   
    

