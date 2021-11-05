const express = require("express");
const commentCRUD = require("./comment.functions");

const app = express();
app.use(express.json());

app.get("/posts/comments", async (req, res) => {
  const allComments = await commentCRUD.getAllComments();
  res.send({
    data: allComments,
  });
});

app.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const comments = await commentCRUD.getCommentsByPost(postId);
  res.send({
    data: comments,
  });
});

app.get("/posts/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const foundComment = await commentCRUD.getComment(commentId);
  res.send({
    data: foundComment,
  });
});

app.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const dataComment = req.body;
  const newComment = await commentCRUD.createComment(postId, dataComment);
  res.send({
    data: newComment,
  });
});

app.put("/posts/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const dataUpdate = req.body;
  const updateComment = await commentCRUD.updateComment( commentId, dataUpdate);
  res.send({
    data: updateComment,
  });
});

app.delete("/posts/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const deleteStatus = await commentCRUD.deleteComment(commentId);
  res.send({
    data: deleteStatus,
  });
});

app.listen(9001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Started");
});
