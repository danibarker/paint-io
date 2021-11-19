const express = require("express");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const imageRouter = require("./routes/images");

app.use(express.static("front-end/build"));

app.use("/api/images", imageRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
