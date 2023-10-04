const mongoose = require("mongoose");

const connection = mongoose.connect('mongodb+srv://arjun:indore123@cluster0.k4captk.mongodb.net/assignment')

exports.module = {connection}