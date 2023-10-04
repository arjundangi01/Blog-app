const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    type: String,
    blogId:String
})
const CategoryModel = mongoose.model('category', categorySchema);
module.exports = CategoryModel
