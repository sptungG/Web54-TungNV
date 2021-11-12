require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const PostRouter = require("./modules/post/post.router");
const CommentRouter = require("./modules/comment/comment.router");
const AuthRouter = require("./modules/auth/auth.router");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected!");

  const app = express();
  app.use(express.json());

  app.use("/api/posts", PostRouter);
  app.use("/api/comments", CommentRouter);
  app.use("/api/auth", AuthRouter);

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Listening on port 9000.......");
  });
}

main();
