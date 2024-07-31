import axios from "axios";
axios.defaults.baseURL = "https://us-central1-paint-io-app.cloudfunctions.net/";
const getImageById = async (id: string) => {
    const response = await axios.get(`/api/images/${id}`);
    const image = response.data;
    return image;
};

export { getImageById };
