const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { CommentsModel } = require("../models/comments.model");
const { UserModel } = require("../models/User.model");
const jwtVerify = require("../middlewares/jwtverify");

const commentRouter = express.Router();

commentRouter.post("/", jwtVerify, async (req, res) => {
  try {
    const userId = req.userID;
    const input = req.body;
    const { blogId, text } = input;
    const blog = await BlogModel.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // console.log(blog)
    // console.log(blog.commentsCount)
    let count = blog.commentsCount + +1;

    const user = await UserModel.findOne({ _id: userId });

    const newObj = {
      ...input,
      user: {
        userId, userName: user.name
      },
    };
    await CommentsModel.create(newObj);
    await BlogModel.updateOne({ _id: blogId }, { commentsCount: count });
    console.log(newObj);
    res.send("comment added");

  } catch (error) {
    console.log(error);
  }
});

module.exports = commentRouter;
