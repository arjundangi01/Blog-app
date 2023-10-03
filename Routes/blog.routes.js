const express = require("express");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");

const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");
const { CommentsModel } = require("../models/comments.model");
const { LikeModel } = require("../models/like.model");
const CategoryModel = require("../models/category.model");

const blogRouter = express.Router();

blogRouter.get("/:token", async (req, res) => {
  const { token } = req.params;
  console.log(token);
  jwt.verify(token, "secretKey", async function (err, decoded) {
    // console.log(decoded.foo);
    if (err) {
      res.status(400).send("Please Login First");
    } else {
      const data = await BlogModel.find({});
      // console.log(data)

      res.send(data);
    }
  });
});

// blog content
// user -userid username
blogRouter.post("/:token", async (req, res) => {
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
    const { token } = req.params;

    jwt.verify(token, "secretKey", async function (err, decoded) {
      // console.log(decoded.foo);
      if (err) {
        res.status(400).send("Invalid User");
      } else {
        const user = await UserModel.findOne({ _id: decoded.userId });

        //creating the new Object  by tagging  author obj in it. 
        const newObj = {
          ...input,
          author: { authorId: user.id, authorName: user.userName },
        };

        const newBlog = await BlogModel.create(newObj);

        // adding new documents in category model with category and blogId
        const categoryObj = { type: input.category, blogId: newBlog.id };       
        await CategoryModel.create(categoryObj);

        res.send("blog added");
      }
    });
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
    jwt.verify(token, "secretKey", async function (err, decoded) {
      // console.log("dec", decoded.userId);
      if (err) {
        res.status(400).send("Invalid User");
      } else {
        const blog = await BlogModel.findOne({ _id: blogId });
        if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
        }
        // to update blog
        await BlogModel.updateOne({ _id: blogId }, input);
        // to update category
        await CategoryModel.updateOne({ blogId }, { type: input.category });
        // const user = await UserModel.findOne({ _id: decoded.userId });

      
      }
    });

    res.send("blog updated");
  } catch (error) {}
});
blogRouter.delete("/:blogId", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { blogId } = req.params;
    console.log(token, blogId);
    jwt.verify(token, "secretKey", async function (err, decoded) {
      // console.log("dec", decoded.userId);
      if (err) {
        res.status(400).send("Invalid User");
      } else {
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

        // res.send("comment added");
      }
    });
    res.send("blog deleted");
  } catch (error) {}
});

module.exports = blogRouter;
