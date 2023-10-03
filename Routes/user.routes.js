const express = require("express");
const { model } = require("mongoose");
const { BlogModel } = require("../models/blog.model");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
      const input = req.body;
      await UserModel.create(input);
      res.send("user registered")
  } catch (error) {}
});


userRouter.post("/login", async (req, res) => {
  try {
    const input = req.body;

    const user = await UserModel.findOne(input);
    
    if (user) {
      const userObj = {
        userId: user.id
      }
    //  {foo:'baa'}
      console.log(userObj)
       const token = jwt.sign(userObj,  "secretKey");
      res.send(token)  
      
      } else {
          res.send("NO user Found")
      }
  } catch (error) {}
});

module.exports = userRouter;
