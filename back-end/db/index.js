const mongoose = require("mongoose");
require("dotenv").config();

//convert to cloud mongo
const dbUrl =
    "mongodb+srv://admin:Z6VW3NNlbWd35fNv@cluster0.tgqfjfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);

module.exports = mongoose;
