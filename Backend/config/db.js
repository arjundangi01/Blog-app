const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`${process.env.MONGO_URL}/medium_clone`)

exports.module = {connection}