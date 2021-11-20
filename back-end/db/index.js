const mongoose = require("mongoose");
//convert to cloud mongo
const dbUrl = "mongodb://localhost:27017/paintio";
mongoose.connect(dbUrl);

module.exports = mongoose;
