const express = require("express");
const path = require("path");
const cors = require("cors");
const postCRUD = require("./public/controller/post.functions");

let staticPath = path.join(__dirname, "public");
const app = express();
app.use(cors());

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

// 404 route
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

//home route
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(staticPath, "dashboard.html"));
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(staticPath, "add.html"));
});

app.get("/:blog", (req, res) => {
  res.sendFile(path.join(staticPath, "blog.html"));
});

// --------------------- CRUD POST ---------------------
app.get("/api/posts", async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send(allPosts);
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const foundPost = await postCRUD.getPost(String(id));
  res.send(foundPost);
});

app.post("/api/posts", async (req, res) => {
  const post = req.body;
  const newPost = await postCRUD.createPost(post);
  res.send(newPost);
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  const updatePost = await postCRUD.updatePost(id, dataUpdate);
  res.send(updatePost);
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deleteStatus = await postCRUD.deletePost(id);
  res.send(deleteStatus);
});

app.use((req, res) => {
  res.redirect("404");
});

app.listen(9000, () => {
  console.log("listening on port 9000.......");
});
