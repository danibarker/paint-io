import axios from "axios";

const getImageById = async (id: string) => {
    const response = await axios.get(`/api/images/${id}`);
    const image = response.data;
    return image;
};

export { getImageById };
