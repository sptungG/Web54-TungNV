const a = 1;
const b = 2;
console.log(a + b);

//** Sự khác biệt giữa 2 môi trường
// console.log(window);
// console.log(document);
// chạy trên cmd => ERROR
// còn trên chạy trên console ở web thì đc
// console.log(global);
// chạy trên cmd => ra kết quả
// còn trên chạy trên console ở web thì ERROR

//** mảng tasks => lọc ra những tasks đã hoàn thành
const tasks = [
  { name: "Học Js", isCompleted: true },
  { name: "Học NodeJs", isCompleted: false },
  { name: "Học ReactJs", isCompleted: true },
];
const completedTasks = tasks.filter((task) => task.isCompleted);
console.log(completedTasks);
// [
//   { name: 'Học Js', isCompleted: true },
//   { name: 'Học ReactJs', isCompleted: true }
// ]

//** string.replaceAll() ~ replace+regex ở NodeJs bản nào? 15.0
// "lớp web54 học web fullstack" => "lớp mobile54 học mobile fullstack"

//** Kiến trúc của NodeJs
// => tại sao NodeJs đơn luồng, bất đồng bộ?
// NodeJs chỉ có 1 luồng code để thực hiện (Call Stack)
// webApis là ở trên trình duyệt còn ở NodeJs là NodeJsApis (LibUv, http-parser, ...)
// event loop là cơ chế giúp Js dù là đơn luồng nhưng vấn có thể thực hiện đc nhiều tác vụ.




