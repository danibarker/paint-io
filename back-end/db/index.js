const mongoose = require("mongoose");
require('dotenv').config()

//convert to cloud mongo
// const dbUrl = process.env.DB_CONNECT || "mongodb://localhost:27017/paintio";
const dbUrl = "mongodb://localhost:27017/paintio";
mongoose.connect(dbUrl,()=>{
    console.log(`connected to db@${dbUrl}`)
});

module.exports = mongoose;
