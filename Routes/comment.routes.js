const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { CommentsModel } = require("../models/comments.model");
const { UserModel } = require("../models/User.model");

const commentRouter = express.Router();

commentRouter.post("/:token", async (req, res) => {
  try {
    const { token } = req.params;
     // input --  {text : "", blogId: ""}
    const input = req.body;
    const { blogId } = input;
    // console.log(token, input);
    jwt.verify(token, "secretKey", async function (err, decoded) {
      // console.log("dec", decoded.userId);
      if (err) {
        res.status(400).send("Please Login First");

      } else {
        const blog = await BlogModel.findOne({ _id: blogId });
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        // console.log(blog)
        // console.log(blog.commentsCount)
        let count = blog.commentsCount + +1;
        await BlogModel.updateOne({ _id: blogId }, { commentsCount: count });
        //  blogId
        // userId
        // input -- comment text input = {text : "nice",blogId: }

        const user = await UserModel.findOne({ _id: decoded.userId });

        // in input we are having { commentText: , blogId: } , so we are creating newObj by tagging userObj
        const newObj = {
          ...input,
          user: { UserId: user.id, userName: user.userName },

        };
       
        // console.log("newObj",newObj)
        await CommentsModel.create(newObj);
        res.send("comment added");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = commentRouter;
