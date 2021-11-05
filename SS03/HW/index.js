const express = require("express");
const commentCRUD = require("./comment.functions");

const app = express();
app.use(express.json());

app.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const allComments = await commentCRUD.getAllComments(postId);
  res.send({
    data: allComments,
  });
});

app.get("/posts/:postId/comments/:id", async (req, res) => {
  const { postId, id } = req.params;
  const foundComment = await commentCRUD.getComment(postId, id);
  res.send({
    data: foundComment,
  });
});

app.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const dataComment = req.body;
  const newPost = await commentCRUD.createComment(postId, dataComment);
  res.send({
    data: newPost,
  });
});

app.put("/posts/:postId/comments/:id", async (req, res) => {
  const { postId, id } = req.params;
  const dataUpdate = req.body;
  const updatePost = await commentCRUD.updateComment(postId, id, dataUpdate);
  res.send({
    data: updatePost,
  });
});

app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const { postId } = req.params;
  const { id } = req.params;
  const deleteStatus = await commentCRUD.deleteComment(postId, id);
  res.send({
    data: deleteStatus,
  });
});

app.listen(9000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Started");
});
