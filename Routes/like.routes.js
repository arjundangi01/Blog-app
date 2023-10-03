const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");
const { LikeModel } = require("../models/like.model");

const likeRouter = express.Router();

likeRouter.post("/:token", (req, res) => {
  try {
    // in input we are getting 
    // {
    //   blogId
    // }
    const input = req.body;
    const { token } = req.params;
    const { blogId } = input;
    jwt.verify(token, "secretKey", async function (err, decoded) {
      // console.log(decoded.foo);
      if (err) {
        res.status(400).send("Please Login First");
      } else {
        //getting blog from blogModel
        const blog = await BlogModel.findOne({ _id: blogId });
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
       
        // incrementing like count
        let count = blog.likesCount + +1;
        await BlogModel.updateOne({ _id: blogId }, { likesCount: count });

        // getting user from database by it's id 
        // userId getting from token
        const user = await UserModel.findOne({ _id: decoded.userId });
  
        // in input we are having {blogId: } , so we are creating newObj by tagging userObj
        const newObj = {
          ...input,
          user: { userId: user.id, userName: user.userName },
        };
        await LikeModel.create(newObj);
        res.send("liked");
      }
    });
  } catch (error) {}
});
module.exports = likeRouter;
