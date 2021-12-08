const http = require("http");
const fs = require("fs");

const server = http.createServer(async (rep, res) => {
  const demoHTML = await fs.promises.readFile("demo.html");
  res.write(demoHTML);
  res.end();
});

server.listen(9000);

// http thuần sẽ rất dài, mất thời gian và cú pháp khó => sử dụng thư viện