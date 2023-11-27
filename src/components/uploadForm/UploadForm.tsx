import { useApiCalls } from "../../context/songContext/ApiCalls";

export const UploadForm = () => {
  const { uploadSong } = useApiCalls();

  const testData = {
    name: "Fixed",
    isPublic: true,
    genreId: "6560712d54a3139491bfad8f",
    userCreator: "65647cd431a39aa197f9ebe7",
    url: "https://example.com/song-url",
    thumbnail: "https://example.com/thumbnail-url",
  };

  const handleUpload = async () => {
    try {
      await uploadSong(testData);
      alert("Song uploaded successfully!");
    } catch (error) {
      alert("Failed to upload song");
      console.error(error);
    }
  };

  return <button onClick={handleUpload}>Upload Test Song</button>;
};
