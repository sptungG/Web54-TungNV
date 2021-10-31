# Session_02 NodeJS

- [Session_02 NodeJS](#session_02-nodejs)
  - [1. Bất đồng bộ trong JS](#1-bất-đồng-bộ-trong-js)
    - [Callback](#callback)
    - [Promise](#promise)
    - [Async/Await](#asyncawait)
  - [2. REST API](#2-rest-api)
    - [Khái niệm](#khái-niệm)
    - [Ràng buộc của REST](#ràng-buộc-của-rest)
    - [Quy tắc, quy chuẩn thiết kế API](#quy-tắc-quy-chuẩn-thiết-kế-api)
    - [Một số http status code](#một-số-http-status-code)
  - [3. Express](#3-express)
    - [Khái niệm](#khái-niệm-1)
    - [Tính năng.](#tính-năng)
    - [Tác dụng.](#tác-dụng)
    - [Ví dụ.](#ví-dụ)

## 1. Bất đồng bộ trong JS

Javascript xử lý đơn luồng, tức là tại một thời điểm thì chỉ thực hiện đc một chức năng.

Xử lý bất đồng bộ là khi A bắt đầu thực hiện, chương trình tiếp tục thực hiện B mà không đợi A kết thúc. Việc mà bạn cần làm ở đây là cung cấp một phương thức để chương trình thực hiện khi A hoặc B kết thúc.

Cơ chế giúp bạn thực hiện việc này trong JavaScript có thể là sử dụng `Callback`, `Promise` hoặc `Async/await`.

### Callback

Callback là kỹ thuật truyền 1 function vào 1 function khác để làm tham số

Thứ tự chạy:

- hàm chính chạy trước
- hàm chính kết thúc
- hàm callback (là hàm được truyền vào làm parameter của hàm chính) được gọi
- hàm callback (là hàm được truyền vào làm parameter của hàm chính) kết thúc

```js
const hello = {
  sayHello: function () {
    console("Hello, World");
  },
};
const name = function () {
  console.log("My name is ...");
};
hello.sayHello(name);
// Hello, World
// My name is ...
```

Vấn đề: Callback hell.

- Khi thực hiện nhiều việc bất đồng bộ liên tiếp nhau
- Những callback gọi lồng vào nhau, khó hiểu, khó debug

```js
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      // ....
    });
  });
});
```

```js
const verifyUser = function (username, password, callback) {
  database.verifyUser(username, password, (error, userInfo) => {
    if (error) {
      callback(error);
    } else {
      database.getRoles(username, (error, roles) => {
        if (error) {
          callback(error);
        } else {
          database.logAccess(username, (error) => {
            if (error) {
              callback(error);
            } else {
              callback(null, userInfo, roles);
            }
          });
        }
      });
    }
  });
};
```

### Promise

Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ.

Promise sinh ra để xử lý kết quả của một hành động cụ thể, kết quả của mỗi hành động sẽ là thành công hoặc thất bại.

```js
let promise = new Promise(function (resolve, reject) {
  // Code here
});
```

- Hàm được truyền vào new Promise dược gọi là **executor**

- Ban đầu, Promise có state là pending và kết quả là undefined

- Khi **executor** kết thúc công việc, nó sẽ gọi đến 1 trong 2 hàm được truyền vào:

  - `resolve(value)`: để xác định rằng công việc đã thực hiện thành công
    - State chuyển thành fulfilled
    - Kết quả là value
  - `reject(error)`: để xác định rằng đã có lỗi xảy ra
    - State chuyển thành rejected
    - Kết quả là error

  => Vậy Promise có 3 trạng thái:

  - **Pending**: promise đang chưa thực hiện xong
  - **Full filled**: trạng thái đã thực hiện xong, kết quả thành công
  - **Rejected**: trạng thái đã thực hiện xong, kết quả thất bại

![promise-state](https://firebasestorage.googleapis.com/v0/b/anonystick-83a85.appspot.com/o/img%2F1552272366081?alt=media&token=abccf254-336e-40be-9976-8e30ff511136)

_Ví dụ:_

```js
const verifyUser = function (username, password) {
  database
    .verifyUser(username, password)
    .then((userInfo) => database.getRoles(userInfo))
    .then((rolesInfo) => database.logAccess(rolesInfo))
    .then((finalResult) => {
      //do whatever the 'callback' would do
    })
    .catch((err) => {
      //do whatever the error handler needs });
    });
};
```

- Các method của Promise

  - `then()`
    - Được gọi khi call API thành công
    - Nhận parameter
  - `catch()`
    - Được gọi khi xảy ra lỗi
  - `finally()`
    - Luôn đc thực hiện cuối cùng
  - `Promise.all`
    - Gộp nhiều API vào chạy cùng 1 lúc
    - Sử dụng nhiều trong việc call các API để lấy dữ liệu tổng hợp
    - Sử dụng trong việc gửi email hàng loạt

### Async/Await

Async / Await giúp làm việc với các chức năng không đồng bộ thú vị hơn và dễ hiểu hơn nhiều. Nó được xây dựng dựa trên Promise và tương thích với tất cả các API dựa trên Promise hiện có.

- **Async**: Khai báo (`async function someName(){...}`)

  - Tự động chuyển một function thành một Promise()
  - Các chức năng Async cho phép sử dụng await.

- **Await**: tạm dừng thực thi các chức năng không đồng bộ (`const result = await someAsyncCall();`)

  - Await chỉ được hoạt động và sử dụng khi có khai báo Async. Không khai báo lỗi ráng chịu.
  - Await nó chỉ hoạt động với Promise chứ không thèm chơi với các function có callback

```js
const verifyUser = async function (username, password) {
  try {
    const userInfo = await database.verifyUser(username, password);
    const rolesInfo = await database.getRoles(userInfo);
    const logStatus = await database.logAccess(userInfo);
    return userInfo;
  } catch (e) {
    //handle errors as needed
  }
};
```

Có những trường hợp không nên sử dụng async/await mà phải quay lại nhờ Promise().

Bài toán: Hãy tìm họ tên F1, F2, F3 của chiếc SH 125i của anh A.

- Sử dụng async/await.

  ```js
  async function layChuXe() {
    let F1 = await getInfoF1(); // Lay info F1 thong qua F2, F3 mat 4 second
    let F2 = await getInfoF2(); // Lay info F2 thong qua F3 mat 3 second
    let F3 = await getInfoF3(); // Lay info F3 2 second

    return F1 + "-" + F2 + "-" + F3; // get info
  }
  ```

Vậy khi muốn có thông tin toàn bộ các chủ xe thì phải tìm chủ đầu tiên rồi mới biết bán cho ai,

cứ lần lượt như vậy cho nên,tìm F1 lại tốn thời gian hơn.

Như vậy muốn biết hết thông tin thì layChuXe() tiêu tốn chúng ta (4+3+2) = 9 second. Lúc đó mới return về result

- Sử dụng Promise.all().

  ```js
  async function layChuXe() {
    // Promise.all() cho phép request nhiều trong cùng một thời gian
    let results = await Promise.all([getInfoF1, getInfoF2, getInfoF3]);

    return results.reduce((total, value) => total + "-" + value);
  }
  ```

Với Promise.all 3 request trên được thực hiện cùng một lúc cho nên F2, và F3 chỉ đợi F1 chạy xong là return thôi. và chính là 4 second.

## 2. REST API

### Khái niệm

API (Application Programming Interface) hay còn được gọi là giao diện lập trình ứng dụng trong tiếng Việt. API là tập các định nghĩa phương thức, giao thức và công cụ xây dựng phần mềm ứng dụng, nó là phương thức để trao đổi dữ liệu giữa các hệ thống.

REST là từ viết tắt của Representational State Transfer. Đó là kiến trúc tiêu chuẩn web và Giao thức HTTP. Hiểu đơn giản thì các ứng dụng RESTful sử dụng các yêu cầu HTTP để thực hiện bốn hoạt động được gọi là CRUD (C: Create, R: Read, U: Update, và D: Delete)

![api](https://topdev.vn/blog/wp-content/uploads/2019/04/restful-api.jpg)

### Ràng buộc của REST

- **Client-Server**: Hoạt động theo mô hình Client - Server, việc tách biệt này nhằm đơn giản hóa việc thực hiện các thành phần (kiểu chia để trị), giảm sự phức tạp của ngữ nghĩa kết nối, nâng cao hiệu quả của việc điều chỉnh hiệu năng, tăng khả năng mở rộng của máy chủ.
- **Stateless**: Server và Client không lưu trạng thái của nhau. Với mỗi một request được gửi đi đều phải được đóng gói đầy đủ thông tin để server có thể nhận và hiểu được. Điều này giúp hệ thống dễ phát triển, bảo trì, mở rộng vì không tốn công CRUD trạng thái của Client. Tuy nhiên có mặt hạn chế là làm tăng lưu lượng thông tin cần truyền tải giữa client và server.
- **Cacheable**: Mọi thứ trên web đều có thể được lưu trữ, do đó response phải xác định rõ ràng liệu chúng có thể lưu trữ được hay không, tránh lưu trữ bộ nhớ đệm không phù hợp hoặc lưu trữ các thông tin cũ, không cần thiết.
- **Layered system**: Giảm mức độ phức tạp của hệ thống, giúp các thành phần tách biệt nhau từ đó dễ dàng mở rộng. Với mỗi một lớp chỉ trao đổi trực tiếp với lớp ngay dưới và trên nó.
- **Code on demand**: Đây là "optional" duy nhất trong ràng buộc của REST. Máy chủ có thể tạm thời mở rộng hoặc tùy chỉnh các chức năng của một máy khách bằng cách chuyển mã thực thi, như Javascript.

### Quy tắc, quy chuẩn thiết kế API

1. Sử dụng HTTP Method để mô tả chức năng của resource

   Chúng ta thường sử dụng 4 chức năng như: GET, POST, PUT, DELETE tương đương với các chức năng là đọc, tạo, sửa, xóa.

   Sử dụng danh từ số nhiều, không sử dụng động từ

   _Ví dụ:_ GET

   **/homes**: sử dụng **ĐÚNG**

   **/getHomes**: sử dụng **SAI**

2. Chỉ sử dụng danh từ số nhiều

   Chúng ta sẽ dùng các REST API như **/cars** thay vì cho **/car**

3. Liên kết trong resource

   Trong các resource có rất nhiều các quan hệ, vì thế thiết kế REST API sẽ rất đau đầu.

   Chúng ta cần phải chia các quan hệ theo các cấp độ của quan hệ.

   _Ví dụ:_ chúng ta cần lấy thông tin của comment trong 1 bài đăng của 1 user.

   Như vậy, chúng ta thấy user là đối tượng lớn nhất, sau đó đến bài đăng và cuối cùng là comment.

   Ta sẽ có 1 API như sau: _GET/users/1/posts/3/comments/10_

4. Tìm kiếm

   Sử dụng attribute là **“q” (query)**

   _Ví dụ:_ _GET/cars?q=mercedes_

   Tìm tất cả ô tô có tên là mercedes

5. Lựa chọn trường trả về

   Sử dụng attribute là **“field”**

   _Ví dụ:_ _GET/user?field=id,name,address_

   (Lấy danh sách tất cả các user với các thông tin bao gồm id, name, address)

### Một số http status code

Chuẩn HTTP cung cấp cho ta rất nhiều status code. Chúng ta sẽ không cần biết hết tất cả nhưng ít nhất nên biết đến những status code:

- **200 OK** — Đây là mã HTTP được sử dụng phổ biến nhất để cho thấy rằng hoạt động được thực hiện là thành công.201 CREATED — This can be used when you use POST method to create a new resource.
- **202 ACCEPTED** — Điều này có thể được sử dụng để xác nhận yêu cầu được gửi đến máy chủ.
- **400 BAD REQUEST** — Điều này có thể được sử dụng khi xác nhận đầu vào phía khách hàng không thành công.
- **401 UNAUTHORIZED / 403 FORBIDDEN** — Điều này có thể được sử dụng nếu người dùng hoặc hệ thống không được phép thực hiện một số thao tác nhất định.
- **404 NOT FOUND** — Điều này có thể được sử dụng nếu bạn đang tìm kiếm một số tài nguyên nhất định và nó không có sẵn trong hệ thống.
- **500 INTERNAL SERVER ERROR** — Điều này không bao giờ nên được ném một cách rõ ràng nhưng có thể xảy ra nếu hệ thống bị lỗi.
- **502 BAD GATEWAY** — Điều này có thể được sử dụng nếu máy chủ nhận được phản hồi không hợp lệ từ máy chủ ngược dòng.

## 3. Express

### Khái niệm

Express là một framework giành cho Nodejs. Nó cung cấp cho chúng ta rất nhiều tính năng mạnh mẽ trên nền tảng web cũng như trên các ứng dụng di động.

Express hỗ trợ các phương thức HTTP và middleware tạo ra môt API vô cùng mạnh mẽ và dễ sử dụng.

### Tính năng.

- Cho phép thiết lập các lớp trung gian để trả về các HTTP request.
- Định nghĩa routing có thể được sử dụng với các hành động khác nhau dựa trên phương thức HTTP và URL.
- Cho phép trả về các trang HTML dựa vào các tham số truyền vào đến template.

### Tác dụng.

- Mỗi khi bạn bắt đầu một dự án, có một môi trường cơ bản mà bạn có thể cần để bắt đầu phát triển. Bạn có thể sử dụng các framework như Express để giảm bớt công việc của bạn.
- Ngoài ra khi bạn cố gắng viết mã trong Nodejs core, nó thực sự dài và phức tạp. Express js làm cho mọi thứ thực sự dễ dàng bằng cách tạo một trình bao bọc trên logic Nodejs để bạn có thể đạt được điều tương tự sẽ ít mã hơn.
- Điều hay ho về nhất về ExpressJs là nó rất đơn giản và nó là nguồn mở.

### Ví dụ.

- Ứng dụng này trả về **Hello World** ở trang chính, đối với các đường dẫn khác, nó sẽ trả về một **404 Not Found**

  ```js
  // server.js
  const express = require("express");
  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port);
  });
  // node server.js
  // mở http://127.0.0.1:3000/
  ```

- Request & response

  Express sử dụng một hàm callback có các tham số là các đối tượng request và response.

  ```js
  app.get("/", function (req, res) {
    //
  });
  ```

  - Request: Biểu diễn một HTTP request và có các thuộc tính cho các request như các chuỗi truy vấn, tham số, body, HTTP header và những phần khác.
  - Response: Biểu diễn một HTTP response được ứng dụng Express gửi đi khi nó nhận về một HTTP request.

- Route cơ bản.

  Trong Express, router được tích hợp sẵn và dễ dàng sử dụng

  ```js
  const express = require("express");
  const app = express();

  // Phuong thuc get() phan hoi mot GET Request
  app.get("/", function (req, res) {
    console.log("GET Request");
    res.send("Hello GET");
  });

  // Phuong thuc post() phan hoi mot POST Request
  app.post("/", function (req, res) {
    console.log("POST Request");
    res.send("Hello POST");
  });

  // Phuong thuc delete() phan hoi mot DELETE Request.
  app.delete("/delete", function (req, res) {
    console.log("DELETE Request");
    res.send("Hello DELETE");
  });

  // Phuong thuc nay phan hoi mot GET Request có dạng abcd, abxcd, ab123cd, ...
  app.get("/ab*cd", function (req, res) {
    console.log("GET request /ab*cd");
    res.send("Page Pattern Match");
  });

  const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port);
  });
  // node server.js
  // mở http://127.0.0.1:3000/
  ```

* Hoàn thiện các hàm CRUD danh sách users đã liệt kê trong buổi học.
* Ôn tập lại kĩ các cách xử lý bất đồng bộ trong JS.
* Cài đặt Postman, tìm hiểu trước các từ khoá Express, REST API
