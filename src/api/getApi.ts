import axios from "axios";

const getData = async (url: string, getToken: () => void) => {
  const token = await getToken();

  const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const { data: userData, statusText } = await axios.get(fullUrl, config);
    return { userData, statusText };
  } catch (error) {
    return error;
  }
};

export default getData;
