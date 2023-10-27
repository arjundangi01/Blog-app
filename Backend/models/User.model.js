const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/8344/8344923.png",
    },
    email: String,
    follower: {
      type: Number,
      default: 0,
    },
    password: String,
    google: {
      type: Boolean,
      default:false
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
module.exports = { UserModel, UserFollowModel };
