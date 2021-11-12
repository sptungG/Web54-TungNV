const CommentModel = require("./comment.model");
const PostModel = require("./post.model");

// getAllComments,
// getCommentsByPost,
// getComment,
// createComment,
// updateComment,
// deleteComment,

const getAllComments = async () => {
  try {
    const comments = await CommentModel.find();
    return {
      success: 1,
      data: comments,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    };
  }
};

const getComment = async (commentId) => {
  try {
    const foundComment = await CommentModel.findById(commentId);

    return {
      success: 1,
      data: foundComment,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    };
  }
};

const createComment = async (postId, dataComment) => {
  try {
    const existedPost = await PostModel.findById(postId);
    if (!existedPost) {
      throw new Error("Post not found.");
    }
    const newComment = await CommentModel.create({ postId, ...dataComment });
    return {
      success: 1,
      data: newComment,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    };
  }
};

const updateComment = async (commentId, dataComment) => {
  try {
    const updateComment = await CommentModel.findByIdAndUpdate(commentId, dataComment, { new: true });
    return {
      success: 1,
      data: updateComment,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    };
  }
};

const deleteComment = async (commentId) => {
  try {
    const deleteComment = await CommentModel.findByIdAndRemove(commentId);
    return {
      success: 1,
      data: deleteComment,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    };
  }
};
module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
