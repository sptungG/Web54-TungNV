const express = require("express");
const path = require("path");

let staticPath = path.join(__dirname, "public");

const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//home route
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// 404 route
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(9000, () => {
  console.log("listening on port 9000.......");
});
