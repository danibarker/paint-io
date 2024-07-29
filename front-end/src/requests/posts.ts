import axios from "axios";
const sendImage = (image: Blob | undefined) => {
    if (!image) {
        console.error("Image not found");
        return;
    }
    const body = new FormData();
    body.append("file", image);
    axios.post("/api/images/save", body);
};
export { sendImage };
