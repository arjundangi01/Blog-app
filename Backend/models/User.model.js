const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    sub: String,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
    email: String,
    follower: {
      type: Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
);
const userFollowSchema = mongoose.Schema({
  followTo: String,
  followBy: String,
});

const UserModel = mongoose.model("user", userSchema);
const UserFollowModel = mongoose.model("userFollow", userFollowSchema);
module.exports = { UserModel,UserFollowModel };
