const express = require("express");
const mongoose = require("mongoose");

const postsRouter = require("./api/post.routers");
const commentsRouter = require("./api/comment.routers");

const app = express();
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.listen(9001, (err) => {
  if(err) throw err;
  console.log("listening on port 9001.......");
});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/web54");
  console.log("MongoDB connected!");
}
main();
