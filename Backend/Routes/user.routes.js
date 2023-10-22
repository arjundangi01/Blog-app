const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const { BlogModel } = require("../models/blog.model");
const { UserModel, UserFollowModel } = require("../models/User.model");
const jwtVerify = require("../middlewares/jwtverify");

const userRouter = express.Router();

userRouter.get("/", jwtVerify, async (req, res) => {
  try {
    const userID = req.userID;
    // console.log("token", userID)
    const findUser = await UserModel.findOne({ _id: userID });
    res.send(findUser);
  } catch (error) {
    console.log(error);
  }
});
userRouter.get("/all", async (req, res) => {
  try {
    // console.log("token", userID)
    const findUser = await UserModel.find({});
    res.send(findUser);
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
          console.log(process.env.JWT_SECRET_KEY);
          const token = jwt.sign(userObj, "thisIsSecret");
          res.send({ message: "Login Successful", token });
        } else {
          res.send("Entered Wrong Detail");
        }
      });
    } else {
      res.send("NO user Found");
    }
  } catch (error) {}
});


userRouter.post('/follow', jwtVerify, async (req, res) => {
  try {
    const {followTo} = req.body
    const  userID  = req.userID;
    // console.log(followTo,userID)
    const checkForAlreadyFollow = await UserFollowModel.findOne({ followTo, followBy: userID });
    if (checkForAlreadyFollow) {
      return res.send({message:'Already Follow'})
    }
    const addFollowToDB = await UserFollowModel.create({ followTo, followBy: userID })
    const increaseFollower = await UserModel.updateOne({_id:userID},{ $inc: { follower : 1 } })
    res.send({mes:'done'})
  } catch (error) {
    
  }
})
userRouter.delete('/follow', jwtVerify, async (req, res) => {
  try {
    const {unFollowTo} = req.body
    const { userID } = req.userID;
    const checkForAlreadyFollow = await UserFollowModel.findOne({ followTo:unFollowTo, followBy: userID });
    if (!checkForAlreadyFollow) {
      return res.send({message:'Already UnFollow'})
    }
    const deleteFollowFromDB = await UserFollowModel.deleteOne({ followTo:unFollowTo, followBy: userID })
    const decreaseFollower = await UserModel.updateOne({userID},{ $inc: { follower : -1 } })
  } catch (error) {
    
  }
})
module.exports = userRouter;
