import axios from "axios";
const sendImage = (image) => {
    
    console.log(image)
    let body = new FormData();
    body.append("file", image);

    console.log('body',body);
    axios.post("/api/images/save", body);
};
export { sendImage };
