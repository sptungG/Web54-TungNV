const express = require("express");
const commentController = require("./comment.functions");

const router = express.Router();

// --------------------- CRUD COMMENT ---------------------
router.get("/", async (req, res) => {
  const allComments = await commentController.getAllComments();
  res.send(allComments);
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const foundComment = await commentController.getComment(commentId);
  res.send(foundComment);
});

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const dataComment = req.body;
  const newComment = await commentController.createComment(postId, dataComment);
  res.send(newComment);
});

router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const dataUpdate = req.body;
  const updateComment = await commentController.updateComment(commentId, dataUpdate);
  res.send(updateComment);
});

router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const deleteStatus = await commentController.deleteComment(commentId);
  res.send(deleteStatus);
});
module.exports = router;
