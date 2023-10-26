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
    likesCount: {
      type: Number,
      default:0
    }, 
    commentsCount: {
      type: Number,
      default:0
    },
    category: String,
    author: {
      authorId: String,
      authorName: String,
      picture:String
    },
    bannerImage:String
   
  }, {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", blogSchema)
module.exports = {BlogModel}
