const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    blogId: String,
    user: {
      userId: String,
      userName: String,
    }
    
  },
  {
    timestamps: true,
  }
);

const LikeModel = mongoose.model("like", likeSchema);
module.exports = { LikeModel };
