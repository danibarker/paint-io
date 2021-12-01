import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Gallery.css";

export default function Gallery() {
    const [images, setImages] = useState(null);
    useEffect(() => {
        const getGallery = async () => {
            const response = await axios.get("/api/images");
            setImages(response.data);
        };
        getGallery();
    }, []);
    return (
        <div className="gallery-container">
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
