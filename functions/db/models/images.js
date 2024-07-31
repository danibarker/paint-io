const mongoose = require("../index");
const ImageSchema = new mongoose.Schema({
    image: Buffer,
    title: String,
    name: String,
    date: { type: Date, default: Date.now() },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
