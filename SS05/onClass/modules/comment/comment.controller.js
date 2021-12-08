const CommentModel = require("./comment");

const getAllComments = async (req, res) => {
  try {
    const posts = await CommentModel.find();
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

module.exports = { getAllComments };
