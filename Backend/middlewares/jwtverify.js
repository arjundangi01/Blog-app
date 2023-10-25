const { model } = require("mongoose");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const jwtVerify = (req, res, next) => {
  const  token  = req.headers.authorization?.split(" ")[1]
  // console.log('token', token)
  // console.log(req.url)

  jwt.verify(token, "secretKey" , async function (err, decoded) {
    // console.log(decoded.foo);
    if (err) {
      res.status(400).send("Please Login First");
    } else {
      // const user = UserModel.findOne({ _id: decoded.userId });
      req.userID = decoded.userID
      // console.log(decoded.userID)
      next();
    }
  });
};

module.exports = jwtVerify;
