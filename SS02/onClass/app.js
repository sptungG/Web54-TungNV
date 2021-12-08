//** Module trên NodeJs
const fs = require("fs");
// Common Js
// Import/Export -> ES Module
// NodeJs14 mới hỗ trợ chuẩn ES Module
// Tuy nhiên ta vẫn tuân theo chuẩn cũ vì nhiều thư viên đang dùng chuẩn cũ

// console.log(1);
// fs.readFile("hello.txt",
//  { encoding: "utf-8" },
//   (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });
// console.log(2);

const wait = (timeSec) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeSec * 1000);
  });
};
console.log(1);
wait(3).then(() => {
  console.log("after 3s");
});

// fs.promises
//   .readFile("hello.txt")
//   .then((data) => console.log(data.toString()))
//   .catch((err) => console.log(err));
// clear hơn callback
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
readFile("hello.txt")
  .then((data) => console.log(data.toString()+ " promise"))
  .catch((err) => console.log(err));

// async/await đi với nhau
// async khai báo hàm, trong hàm async thì mới sử dụng đc await, chỉ await đc một promise
// kết quả trả về hàm async là một promise
async function showFileData() {
  // await promise
  try {
    const data = await readFile("hello.txt");
    // dừng cho đến khi promise thành công hoặc thất bại
    console.log(data.toString() + " async/await");
  } catch (err) {
    console.log(err);
  }
}
showFileData();

// 1
// Xin chào! promise
// Xin chào! async/await
// after 3s