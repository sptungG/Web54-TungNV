const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: { type: String, require: true },
    postId: { type: mongoose.Types.ObjectId, require: true },
    createdBy: String,
  },
  {
    timestamp: true,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
