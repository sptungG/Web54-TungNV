const mongoose = require("mongoose");
const express = require("express");

const PostSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: String,
    postId: mongoose.Types.ObjectId
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/web54");
  console.log("MongoDB");
  const app = express();
  app.use(express.json());

  app.get("api/posts", async (req, res) => {
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
  });

  app.get("api/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const foundPost = await PostModel.findById(postId);

      // const foundPost = await PosModel.findOne({ _id: postId });
      // const foundPost = await PosModel.findOne({ likeCount: 1 });
      // findOne đa dạng hơn, có thể tìm đc bài post theo trường mong muốn

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
  });

  app.post("api/posts/", async (req, res) => {
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
  });

  app.put("api/posts/:postId", async (req, res) => {
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
  });

  // HW
  app.put("api/posts/:postId/like", async (req, res) => {
    // gửi lên là like bài viết đó
    // $inc: tự động tăng?
  });

  app.delete("api/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const deletePost = await PostModel.findByIdAndDelete(postId);

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
  });

  app.listen(9000, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Listening on port 9000.......");
  });
}

main();
