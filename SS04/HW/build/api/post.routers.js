const express = require("express");
const postCRUD = require("./post.functions");

const router = express.Router();
// --------------------- CRUD POST ---------------------
router.get("/", async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send(allPosts);
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const foundPost = await postCRUD.getPost(postId);
  res.send(foundPost);
});

router.post("/", async (req, res) => {
  const post = req.body;
  const newPost = await postCRUD.createPost(post);
  res.send(newPost);
});

router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const dataUpdate = req.body;
  const updatePost = await postCRUD.updatePost(postId, dataUpdate);
  res.send(updatePost);
});

router.put("/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const likeStatus = await postCRUD.likeCount(postId);
  res.send(likeStatus);
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const deleteStatus = await postCRUD.deletePost(postId);
  res.send(deleteStatus);
});

module.exports = router;
