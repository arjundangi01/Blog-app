const mongoose = require("mongoose");

// const blogSchema = mongoose.Schema(
//   {
//     title: String,
  
//   }
// );
const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    likesCount: Number, 
    category: String,
    author: {
      authorId: String,
      authorName: String,
    },
   
  }, {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", blogSchema)
module.exports = {BlogModel}
