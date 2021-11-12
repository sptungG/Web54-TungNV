const express = require("express");
const postController = require("./post.functions");

const router = express.Router();
// --------------------- CRUD POST ---------------------
router.get("/", async (req, res) => {
  const allPosts = await postController.getAllPosts();
  res.send(allPosts);
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const foundPost = await postController.getPost(postId);
  res.send(foundPost);
});

router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const comments = await postController.getCommentsByPost(postId);
  res.send(comments);
});

router.post("/", async (req, res) => {
  const post = req.body;
  const newPost = await postController.createPost(post);
  res.send(newPost);
});

router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const dataUpdate = req.body;
  const updatePost = await postController.updatePost(postId, dataUpdate);
  res.send(updatePost);
});

router.put("/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const likeStatus = await postController.likeCount(postId);
  res.send(likeStatus);
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const deleteStatus = await postController.deletePost(postId);
  res.send(deleteStatus);
});

module.exports = router;
