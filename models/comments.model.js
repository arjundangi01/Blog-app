const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: String,
    user: {
      UserId: String,
      userName: String,
    },
    blogId: String
  },
  {
    timestamps: true,
  }
);

const CommentsModel = mongoose.model("comment", commentSchema);
module.exports = { CommentsModel };
