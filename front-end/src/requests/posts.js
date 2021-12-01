import axios from "axios";
const sendImage = (image) => {
    let body = new FormData();
    body.append("file", image);
    axios.post("/api/images/save", body);
};
export { sendImage };
