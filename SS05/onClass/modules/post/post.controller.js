const PostModel = require("./post");
const CommentModel = require("../comment/comment");

// getAllPost,
// getPost,
// createPost,
// updatePost,
// incLikePost,
// getCommentsByPost,
// deletePost 

const getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    // => array
    res.send({
      success: 1,
      data: posts,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const foundPost = await PostModel.findById(postId);

    res.send({
      success: 1,
      data: foundPost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const newPostData = req.body;
    const newPost = await PostModel.create(newPostData);

    res.send({
      success: 1,
      data: newPost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatePostData = req.body;
    // { new: true } kết quả trả về là doc đã đc update
    const updatePost = await PostModel.findByIdAndUpdate(postId, updatePostData, { new: true });
    // const updatePost = await PostModel.findOneAndUpdate({ _id: postId }, updatePostData, { new: true });

    res.send({
      success: 1,
      data: updatePost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const incLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletePost = await PostModel.findOneAndDelete({ _id: postId }, { $inc: { likeCount: 1 } }, { new: true });

    res.send({
      success: 1,
      data: deletePost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatePost = await PostModel.findByIdAndDelete(postId);

    res.send({
      success: 1,
      data: updatePost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.find({ postId });

    res.send({
      success: 1,
      data: comments,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = { 
  getAllPost,
  getPost,
  createPost,
  updatePost,
  incLikePost,
  getCommentsByPost,
  deletePost };
