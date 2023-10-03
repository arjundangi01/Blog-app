const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
