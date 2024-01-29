import axios from "axios";

const deleteData = async (url: string) => {
  const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data: deletedPlaylist, statusText } = await axios.delete(
      fullUrl,
      config
    );
    return { deletedPlaylist, statusText };
  } catch (error) {
    return "Can't delete playlist";
  }
};

export default deleteData;
