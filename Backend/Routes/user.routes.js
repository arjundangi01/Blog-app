const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/User.model");
const jwtVerify = require("../middlewares/jwtverify");

const userRouter = express.Router();

userRouter.get("/", jwtVerify, async (req, res) => {
  try {
    const userID = req.userID;
    // console.log("token", userID)
    const findUser = await UserModel.findOne({ _id: userID });
    

    
    res.send(findUser)

  } catch (error) {
    console.log(error);
  }
});
userRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    bcrypt.hash(password, 4, async function (err, hash) {
      // Store hash in your password DB.
      await UserModel.create({ userName, email, password: hash });
      res.send("user registered");
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    // console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          const userObj = {
            userId: user.id,
          };
          //  {foo:'baa'}
          // console.log(userObj);
          console.log(process.env.JWT_SECRET_KEY)
          const token = jwt.sign(userObj, 'thisIsSecret');
          res.send({ message: "Login Successful", token });
        } else {
          res.send("Entered Wrong Detail")
        }
      });
    } else {
      res.send("NO user Found");
    }
  } catch (error) {}
});

module.exports = userRouter;
