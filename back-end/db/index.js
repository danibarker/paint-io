const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/paintio";
mongoose.connect(dbUrl);

module.exports = mongoose;
