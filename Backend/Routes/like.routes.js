const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");
const { LikeModel } = require("../models/like.model");
const jwtVerify = require("../middlewares/jwtverify");

const likeRouter = express.Router();

likeRouter.post("/add/:blogId", jwtVerify, async (req, res) => {
  try {
    const userID = req.userID;
    const { blogId } = req.params;
    const blog = await BlogModel.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const check = await LikeModel.findOne({ blogId, likedBy: userID });
    if (check) {
     return res.send({ message: "Already liked" });
    }

    await BlogModel.updateOne({ _id: blogId }, { $inc: { likesCount: 1 } });

    await LikeModel.create({ blogId, likedBy: userID });
    res.send({ message: "liked" });
  } catch (error) {}
});
likeRouter.delete("/delete/:blogId", jwtVerify, async (req, res) => {
  try {
    const userID = req.userID;
    const { blogId } = req.params;
    const blog = await BlogModel.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const check = await LikeModel.findOne({ blogId, likedBy: userID });
    if (!check) {
     return res.send({ message: "Already disliked" });
    }
    await BlogModel.updateOne({ _id: blogId }, { $inc: { likesCount: -1 } });
    await LikeModel.deleteOne({ blogId, likedBy: userID });
    res.send({ message: "Disliked" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = likeRouter;
