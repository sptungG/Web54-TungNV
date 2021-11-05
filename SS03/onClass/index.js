const express = require("express");
const postCRUD = require("./postCRUD");

const app = express();
app.use(express.json());

app.get("/posts", async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send({
    data: allPosts,
  });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const foundPost = await postCRUD.getPost(String(id));
  res.send({
    data: foundPost,
  });
});

app.post("/posts", async (req, res) => {
  const post = req.body;
  // const dataPost = {
  //   imageUrl: "https://source.unsplash.com/random",
  //   title: "",
  //   desc: "",
  //   createBy: "",
  // };
  const newPost = await postCRUD.createPost(post);
  res.send({
    data: newPost,
  });
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const dataUpdate = req.body;
  // const dataUpdate = {
  //   imageUrl: "https://source.unsplash.com/random",
  //   title: "DEMO_1",
  //   desc: "DEMO_1",
  //   createBy: "DEMO_1",
  // };
  const updatePost = await postCRUD.updatePost(id, dataUpdate);
  res.send({
    data: updatePost,
  });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deleteStatus = await postCRUD.deletePost(id);
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
