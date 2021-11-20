import axios from "axios";
import { useEffect, useState } from "react";
import '../css/Gallery.css'
function imageToBase64(image) {
    let reader = new FileReader();
    let result;
    reader.readAsDataURL(image);
    reader.onloadend = function () {
        var base64data = reader.result;
        result = base64data;
    };
    return result;
}
export default function Gallery() {
    const [images, setImages] = useState(null);
    useEffect(() => {
        const getGallery = async () => {
            const response = await axios.get("/api/images");
            setImages(response.data);
            console.log(response.data);
        };
        getGallery();
    }, []);
    return (
        <div>
            {images &&
                images.map((image) => {
                    return (
                        <img
                            className="gallery-image"
                            alt={image.title}
                            src={`data:image/jpeg;base64,${Buffer.from(
                                image.image.data
                            ).toString("base64")}`}
                        />
                    );
                })}
        </div>
    );
}
