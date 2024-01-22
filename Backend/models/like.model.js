const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    blogId: String,
    likedBy: {
      type: String,   
      
    }    
  },
  {
    timestamps: true,
  }
);

const LikeModel = mongoose.model("like", likeSchema);
module.exports = { LikeModel };
