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

const getCommentsByPost = async (postId) => {
  try {
    const foundComments = await CommentModel.find({ postId: postId });

    return {
      success: 1,
      data: foundComments,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      data: [],
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
    await PostModel.findById(postId);
    const newComment = {
      postId: postId,
      ...dataComment,
    };
    await CommentModel.create(newComment);
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
  getCommentsByPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
