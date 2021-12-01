const getImageById = async (id) => {
    const response = await fetch(`/api/images/${id}`);
    const image = await response.json();
    return image;
};

export { getImageById };
