import axios, { AxiosResponse } from "axios";


const postData = async (url: string, data: AxiosResponse['data'], getToken: () => Promise<string>) => {
  const token = await getToken();
  const fullUrl = `http://localhost:8080/${url}`;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(fullUrl, data, config);
    return { incomingData: response.data, statusText: response.statusText };
  } catch (error) {
    console.error("Error in postData:", error);
    throw error;
  }
};

export default postData;

