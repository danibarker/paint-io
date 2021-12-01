function base64ToBlob(base64, mime) {
    mime = mime || "";
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (
        var offset = 0, len = byteChars.length;
        offset < len;
        offset += sliceSize
    ) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
}

function convertCanvasToBlob(img) {
    // convert canvas image back to a base64 image
    let jpegFile = img.toDataURL();
    // change base64 image to plain base64 data
    let base64 = jpegFile.replace(/^data:image\/(png|jpeg);base64,/, "");
    // convert base64 data into an jpeg image that AWS can handle
    let jpegBlob = base64ToBlob(base64, "image/jpeg");
    return jpegBlob;
}

export default convertCanvasToBlob;
