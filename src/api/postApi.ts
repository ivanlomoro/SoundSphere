import axios from "axios";


const postData = async (url: string, data: any , getToken: () => void) => {
  const token = await getToken();

  const fullUrl = `http://localhost:8080/${url}`;
  console.log(fullUrl);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const { data: userData, statusText } = await axios.post(
      fullUrl,
      data,
      config
    )
    return { userData, statusText };
  } catch (error) {
    return error;
  }
};

export default postData;
