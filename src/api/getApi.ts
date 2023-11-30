import axios from "axios";

const getData = async (url: string, getToken: () => void) => {
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
    const { data: userData, statusText } = await axios.get(fullUrl, config);
    return { userData, statusText };
  } catch (error) {
    return error;
  }
};

export default getData;