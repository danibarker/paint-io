const getImageById = async (id) => {
    const response = await fetch(`/api/images/${id}`);
    const image = await response.json();
    console.log(image);
    return image
};

export { getImageById };
