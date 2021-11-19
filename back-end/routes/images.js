const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { Image } = require("../db/models");
const storage = multer.memoryStorage({
    destination: function (req, files, callback) {
        callback(null, "");
    },
});
var singleUpload = multer({ storage: storage }).array("file");

router.post("/save", singleUpload, async (req, res) => {
    try {
        const file = req.files[0];
        const { name, title } = req.body;
        const newImage = await Image.create({
            image: file.buffer,
            name,
            title,
        });
        res.json(newImage);
    } catch (e) {
        res.send(e.message);
    }
});
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const image = await Image.findById(id);
        console.log(image)
        res.json(image);
    } catch (e) {
        console.log(e.message)
        res.sendStatus(400);
    }
});
module.exports = router;
