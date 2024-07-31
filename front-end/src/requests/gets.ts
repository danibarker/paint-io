import axios from "axios";
axios.defaults.baseURL =
    import.meta.env.VITE_APP_ENV === "development"
        ? "/api"
        : "https://us-central1-paint-io-app.cloudfunctions.net/api";
const getImageById = async (id: string) => {
    const response = await axios.get(`/images/${id}`);
    const image = response.data;
    return image;
};

export { getImageById };
