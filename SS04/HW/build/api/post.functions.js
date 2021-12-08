const PostModel = require("./post.model");

// getAllPosts,
// getPost,
// createPost,
// updatePost,
// likeCount,
// deletePost,

const getAllPosts = async () => {
  try {
    const posts = await PostModel.find();
    return {
      success: 1,
      data: posts,
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

const getPost = async (postId) => {
  try {
    const foundPost = await PostModel.findById(postId);
    // const foundPost = await PosModel.findOne({ _id: postId });
    // const foundPost = await PosModel.findOne({ likeCount: 1 });
    return {
      success: 1,
      data: foundPost,
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

const createPost = async (dataPost) => {
  try {
    const newPost = await PostModel.create(dataPost);

    return {
      success: 1,
      data: newPost,
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

const updatePost = async (postId, dataUpdate) => {
  try {
    const updatePost = await PostModel.findByIdAndUpdate(postId, dataUpdate, { new: true });
    // { new: true } kết quả trả về là doc đã đc update
    // const updatePost = await PostModel.findOneAndUpdate({ _id: postId }, updatePostData, { new: true });

    return {
      success: 1,
      data: updatePost,
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

const likeCount = async (postId) => {
  try {
    const incrementLike = await PostModel.updateOne({ _id: postId }, { $inc: { likeCount: 1 } });
    return {
      success: 1,
      data: incrementLike,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      message: err.message || "Something went wrong",
    };
  }
};

const deletePost = async (postId) => {
  try {
    const foundPost = await PostModel.findByIdAndRemove(postId);
    return {
      success: 1,
    };
  } catch (err) {
    return {
      status: 400,
      success: 0,
      message: err.message || "Something went wrong",
    };
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  likeCount,
  deletePost,
};
