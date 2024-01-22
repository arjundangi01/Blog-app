const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");
const { CommentsModel } = require("../models/comments.model");
const { LikeModel } = require("../models/like.model");
const CategoryModel = require("../models/category.model");
const jwtVerify = require("../middlewares/jwtverify");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const filterObj = {};
  const { q, user,filter,page } = req.query;
  if (q) {
    filterObj["_id"] = q;
    const data = await BlogModel.find(filterObj);
    const likes = await LikeModel.find({ blogId: data[0]._id })
    const allLikes = likes.map((ele) => ele.likedBy);
    
    console.log('s',allLikes)
    return res.send({data,allLikes});
  }
  if (filter) {
    // console.log(filter)
    filterObj['category'] = filter;
  }
  if (user) {
    const data = await BlogModel.find({ "author.authorId": user });
    return res.send(data);
  }
  const data = await BlogModel.find(filterObj).skip(page*4-4).limit(4);
  // console.log(data)

  res.send(data);
});


// blog content
// user -userid username
blogRouter.post("/", jwtVerify, async (req, res) => {
  try {
    // in input we are getting
    // {
    //   title :""
    //    content : ""
    //    likesCount :
    //    commentsCount :
    // }

    const input = req.body;

    // user token getting from params
    const userID = req.userID;
    const user = await UserModel.findOne({ _id: userID });
    // console.log( "user", userID)
    //creating the new Object  by tagging  author obj in it.
    const newObj = {
      ...input,
      author: {
        authorId: user.id,
        authorName: user.name,
        picture: user.picture,
      },
    };

    const newBlog = await BlogModel.create(newObj);

    // adding new documents in category model with category and blogId
    const categoryObj = { type: newBlog.category, blogId: newBlog.id };
    await CategoryModel.create(categoryObj);

    res.send({ message: "blog added", data: newBlog });
    //   console.log(title)
  } catch (error) {
    console.log(error);
  }
});
blogRouter.patch("/:blogId", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const input = req.body;
    const { blogId } = req.params;
    console.log(token, input, blogId);
    const blog = await BlogModel.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // to update blog
    await BlogModel.updateOne({ _id: blogId }, input);
    // to update category
    await CategoryModel.updateOne({ blogId }, { type: input.category });
    // const user = await UserModel.findOne({ _id: decoded.userId });

    res.send("blog updated");
  } catch (error) {}
});
blogRouter.delete("/:blogId", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { blogId } = req.params;
    console.log(token, blogId);
    const blog = await BlogModel.deleteOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // delete blog from all these four collection
    await CommentsModel.deleteMany({
      blogId: blogId,
    });
    await LikeModel.deleteMany({
      blogId: blogId,
    });
    await CategoryModel.deleteOne({ blogId });

    await BlogModel.deleteOne({ _id: blogId });
    res.send("blog deleted");
  } catch (error) {}
});

module.exports = blogRouter;
