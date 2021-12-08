const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  // console.log(__dirname);
  // thư mục hiện tại, C:\Users\ngovi\Desktop\SEFT_TAUGHT\Web54-TungNV\SS03\onClass
  // console.log(path.resolve(__dirname, "./demo.html"));
  // trả về đường dẫn tuyệt đối, C:\Users\ngovi\Desktop\SEFT_TAUGHT\Web54-TungNV\SS03\onClass\demo.html
  res.sendFile(path.resolve(__dirname, "./demo.html"));
});

app.get("/hello", (rep, res) => {
  res.send("Hellooo");
});

app.get("/obj", (rep, res) => {
  res.send({ message: "hello" }); //~json
});
// đường dẫn độ ưu tiên từ trên xuống dưới
// 

app.listen(9000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Started");
});
