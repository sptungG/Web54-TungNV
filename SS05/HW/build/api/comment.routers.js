const express = require("express");
const commentCRUD = require("./comment.functions");

const router = express.Router();

// --------------------- CRUD COMMENT ---------------------
router.get("/", async (req, res) => {
  const allComments = await commentCRUD.getAllComments();
  res.send(allComments);
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const foundComment = await commentCRUD.getComment(commentId);
  res.send(foundComment);
});

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const dataComment = req.body;
  const newComment = await commentCRUD.createComment(postId, dataComment);
  res.send(newComment);
});

router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const dataUpdate = req.body;
  const updateComment = await commentCRUD.updateComment(commentId, dataUpdate);
  res.send(updateComment);
});

router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const deleteStatus = await commentCRUD.deleteComment(commentId);
  res.send(deleteStatus);
});
module.exports = router;
