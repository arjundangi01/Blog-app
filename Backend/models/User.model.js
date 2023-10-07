const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    sub: String,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
