import axios, { AxiosResponse } from "axios";

const patchData = async (
  url: string,
  data: AxiosResponse["data"],
  getToken: () => Promise<string>
) => {
  const token = await getToken();
  const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.patch(fullUrl, data, config);
    return { incomingData: response.data, statusText: response.statusText };
  } catch (error) {
    console.error("Error in patchData:", error);
    throw error;
  }
};

export default patchData;

 