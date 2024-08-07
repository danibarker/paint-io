const mongoose = require("mongoose");
require("dotenv").config();

//convert to cloud mongo
const dbUrl = process.env.DB_CONNECT || "mongodb://localhost:27017/paintio";
mongoose.set("strictQuery", false);
mongoose.connect(dbUrl);

module.exports = mongoose;
