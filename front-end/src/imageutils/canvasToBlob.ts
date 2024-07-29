function base64ToBlob(base64: string, mime: string) {
    const sliceSize = 1024;
    const byteChars = window.atob(base64);
    const byteArrays = [];

    for (
        let offset = 0, len = byteChars.length;
        offset < len;
        offset += sliceSize
    ) {
        const slice = byteChars.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
}

function convertCanvasToBlob(img: HTMLCanvasElement | null) {
    if (!img) {
        console.error("Canvas not found");
        return;
    }
    // convert canvas image back to a base64 image
    const jpegFile = img.toDataURL();
    // change base64 image to plain base64 data
    const base64 = jpegFile.replace(/^data:image\/(png|jpeg);base64,/, "");
    // convert base64 data into an jpeg image that AWS can handle
    const jpegBlob = base64ToBlob(base64, "image/jpeg");
    return jpegBlob;
}

export default convertCanvasToBlob;
