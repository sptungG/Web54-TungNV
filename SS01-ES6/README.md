# Session_01

- [Session_01](#session_01)
  - [1. Kiểm tra các loại dữ liệu trong JavaScript](#1-kiểm-tra-các-loại-dữ-liệu-trong-javascript)
    - [Strings](#strings)
    - [Number](#number)
    - [Null and Undefined](#null-and-undefined)
    - [Array](#array)
    - [Function](#function)
  - [2. Event loop](#2-event-loop)
    - [Ví dụ](#ví-dụ)
    - [Khái niệm](#khái-niệm)
  - [3. Deep copy và Shallow copy](#3-deep-copy-và-shallow-copy)
    - [Khái niệm](#khái-niệm-1)
    - [Copy object](#copy-object)
      - [Shallow copy.](#shallow-copy)
      - [Deep copy.](#deep-copy)
    - [Ví dụ](#ví-dụ-1)

## 1. Kiểm tra các loại dữ liệu trong JavaScript

Cách kiểm tra một biến x cho trước là **function, array, number, string, undefined**

### Strings

Chuỗi là giá trị nguyên thủy và kiểm tra giá trị nhập vào có phải chuỗi hay ko thì chỉ cần sử dụng toán tử `typeof`.

```js
if (typeof a === "string") {}
```

Tuy nhiên, nếu chuỗi được khởi tạo bằng cách sử dụng hàm tạo String trực tiếp thì `typeof` sẽ trả ra `object`.

Để đảm bảo rằng một giá trị đã cho là một chuỗi, dù là nguyên thủy hay đối tượng thì lúc này sẽ sử dụng kết hợp các toán tử `instanceof` và `typeof`:

```js
const isString = (value) => typeof value === "string" || value instanceof String;

const message1 = "This is a string primitive";
const message2 = new String("This is a string object");

console.log(typeof message1); //=> string
console.log(typeof message2); //=> object
console.log(isString(message1)); //=> true
console.log(isString(message2)); //=> true
```

### Number

Number thực sự giống với Chuỗi. Để kiểm tra kiểu dữ liệu Number, thì chỉ cần sử dụng toán tử `typeof`:

```js
if (typeof a === "number") {}
```

Nhưng, trong trường hợp không chỉ các giá trị nguyên thủy thì có thể kết hợp `typeof` và ` instanceof`:

```js
const isNumber = (value) => typeof value === "number" || value instanceof Number;

const num1 = 5;
const num2 = new Number("5");

console.log(typeof num1); // => number
console.log(typeof num2); // => object
console.log(isNumber(num1)); //=> true
console.log(isNumber(num2)); //=> true
```

### Null and Undefined

- `undefined` là giá trị mặc định cho các biến chưa được khởi tạo
- `null` luôn được đặt rõ ràng thành một biến

```js
console.log(typeof undefined); //=> "undefined"
console.log(typeof null); //=> "object"
```

Để kiểm tra null hoặc undefined, thì chỉ cần sử dụng toán tử `===`:

```js
if (a === undefined) {}
if (a === null) {}
if (a == null) {} // ~ (a === undefined || a === null)

let a;
let b = null;
let c = []; // "", 0
console.log(a == null); // true
console.log(b == null); // true
console.log(c == null); // false

console.log(a === null); // false
console.log(a === undefined); // true
```

### Array

Mảng là đối tượng. Nếu sử dụng toán tử `typeof` với một mảng thì sẽ nhận được kết quả là `object`.

Cách đúng để kiểm tra xem một biến có phải là một mảng hay không bằng cách sử dụng phương thức tĩnh `Array.isArray()`.

```js
Array.isArray(x);
Array.isArray([11, 22, 33]); //=> true
Array.isArray({}); //=> false
```

### Function

Function cũng là đối tượng. Tuy nhiên, khác với mảng, có thể kiểm tra các hàm bằng cách sử dụng toán tử `typeof`:

```js
const f = function () {};
console.log(typeof f === "function"); //=> true
```

## 2. Event loop

### Ví dụ
Javascript xử lý đơn luồng, tức là tại một thời điểm thì chỉ thực hiện đc một chức năng.

```js
// single thread
function task(message) {
  let number = 10000000;
  while (number > 0) {
    number--;
  }
  console.log(message);
}
console.log("Start");
task("Loading");
console.log("End");
// main
// Call stack
/**
 * Start ->
 * task ->
 * End ->
 */
// => "Start",sau đó chờ cái vòng while chạy xong "Loading", rồi mới ra "End"
```

lúc này task("Loading") đc gọi là Blocking Script, chương trình phải chờ vòng lặp ở task rồi mới chạy xuống dưới đc

Để ngăn chặn vấn đề này thì có thể sử dụng Callbacks

```js
// Callbacks
console.log("Start");
// Start ->
setTimeout(() => {
  task("Loading");
}, 2000);
// Rời khỏi callstack và chạy qua Web APIs -> Callback queue -> Khi callstack empty -> chạy xong -> rời khỏi callstack
console.log("End"); // chạy xong và rời khỏi call stack
// => Start -> End (2s)-> Loading
```

Giải thích ví dụ:

- Đầu tiên sẽ chạy log ra "Start" và thoát khỏi Callstack,
- Rồi đến đoạn setTimeout, vì setTimeout thuộc webAPIs nên phần task("Loading") trong đó sẽ đc chuyển qua WebAPIs với timer chờ là 2s và rời khỏi Callstack,
- Trong khoảng thời gian timer 2s, lúc này Callstack đang còn "End" thì log "End" trước.
- Sau khi hết timer 2s đó chương trình sẽ gọi vào task("Loading") và để nó trong Callback queue
- Khi log "End" xong, lúc này Callstack đã trống(empty) nên task("Loading") ở Callback queue sẽ đc chạy và rời khỏi Callstack

Note: Web APIs: timer(setTimeout, setInterval), fetch request, DOM Event(click, hover,...)

### Khái niệm
    Vòng lặp sự kiện(event loop) sẽ kiểm tra xem ngăn xếp(call stack) cuộc gọi có trống không và nếu đang trống, sẽ xem xét hàng đợi sự kiện (event queue). Nếu có một cái gì đó trong đó, nó sẽ đc thêm vào ngăn xếp(call stack) cuộc gọi và thực hiện nó. Vòng lặp sự kiện(event loop) liên tục chạy cho đến khi hết ca (nội dung trình duyệt được tải / trình duyệt bị đóng).

**Ví dụ để dễ hình dung hơn: [DEMO: Event loop](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)**

![gif](https://wesbos.com/440cc02f41b4dfbda348b5258b7acbf7/loupe-gif.gif)

```js
// giải thích tại sao đoạn code sau chữ Một lại hiện sau chữ Hai
setTimeout(function () {
  console.log("Một");
}, 0);
function second() {
  console.log("Hai");
}
second();
```

- Mặc dù thời gian chờ xảy ra sau 0 giây, Javascript vẫn thêm WebAPI, chạy setTimeout và đưa log\_"Một" vào CallbackQueue, sẽ đc gọi sau 0 giây.
- Trong 0s đó, chạy dòng tiếp theo (log\_"Hai") và rời khỏi Callstack.
- Khi log*"Hai" xong, lúc này Callstack đã trống, log*"Một" đang ở trong CallbackQueue sẽ vào Callstack và chạy, rồi rời khỏi Callstack.
- Callstack trở về trạng thái trống nên chương trình đã chạy xong.

## 3. Deep copy và Shallow copy

### Khái niệm
- **Shallow copying** nhiệm vụ của nó chỉ copy những giá trị nông, nghĩa là nó chỉ sao chép các giá trị đối tượng bình thường nhưng các giá trị lồng nhau(nested) vẫn sử dụng reference đến một đối tượng ban đầu.
- **Deep copy** đơn giản là cũng giống như clone shallow nhưng các giá trị reference trong object gốc không thay đổi trong object clone.

Notes: reference type trong javascript tổng thể có 3 loại: Array, function và object

### Copy object

#### Shallow copy.

- Object.assign()
  ```js
  const obj = { a: 1, b: 2, c: 3 };
  const clone = Object.assign({}, obj);
  console.log(clone); // {a:1,b:2,c:3};
  ```
- Spread Operator
  ```js
  const obj = { a: 1, b: 2, c: 3 };
  const clone = { ...obj };
  console.log(clone); // {a:1,b:2,c:3};
  ```
- Nhưng với các đối tượng lồng nhau.
  ```js
  const obj = { a: 1, b: 2, c: { d: 3 } };
  const shallowClone = { ...obj };
  obj.c.d = 34; // chúng ta thay đổi giá trị d của object gốc
  console.log(obj); // kết quả cho chúng ta thấy {a:1,b:2,c:{d:34}}
  console.log(shallowClone); 
  // nhưng object mà chúng ta clone ra cũng bị thay đổi theo {a:1,b:2,c:{d:34}}
  ```

#### Deep copy.

- `JSON.parse()` và `JSON.stringify()`
  ```js
  const obj = { a: 1, b: 2, c: { d: 3 } };
  const deepClone = JSON.parse(JSON.stringify(obj));
  console.log(deepClone); // {a:1,b:2,c:3};

  //làm tương tự như trên, update d = 34
  obj.c.d = 34;
  console.log(obj); // {a:1,b:2,c:{d:34}}
  console.log(deepClone); // {a:1,b:2,c:{d:3}}
  // khi update d = 34 thì object gốc đã thay đổi nhưng object clone thì không 
  // bởi vì nó không phải là reference type của object gốc nữa rồi.
  ```
  Hạn chế của JSON.stringify/parse là chỉ hoạt động với Number, String, Array và Object mà không có thuộc tính function hoặc Symbol
  ```js
  const arrOfFunction = [
    () => 2,
    {test: () => 3,},
    Symbol("4"),
  ];
  // JSON replace function with null and function in object with undefined
  console.log(JSON.parse(JSON.stringify(arrOfFunction))); //[ null, {}, null ]
  ```
- Deep clone với thư viên **lodash**

  **[https://lodash.com/docs](https://lodash.com/docs/4.17.15#clone)**

  ```html
  <script src="https://unpkg.com/lodash@4.17.15/lodash.js"></script>
  ```
  ```js
  console.log(_.cloneDeep(arrOfFunction)); 
  //[() => 2, {test: ƒ}, Symbol(4)]
  ```

### Ví dụ
```js
// Giải thích kết quả của đoạn code sau.
const macbooks = ["macbook2015", { model: "macbook2014" }, "macbook2017"];
const apples = [...macbooks];

apples[0] = "air";
apples[1].model = "m1";

console.log(macbooks); // ['macbook2015', { model: 'm1' }, 'macbook2017']
console.log(apples); // ['air', { model: 'm1' }, 'macbook2017']
```
- Spread operator đc sử dụng để shallow clone **macbooks** vào **apples**.
- Các giá trị nông của **macbooks** (như String, Number) sẽ đc sao chép vào **apples**, nên việc thay đổi `apples[0] = "air"` sẽ ko ảnh hưởng lên array gốc **macbooks**.
- Chúng ta thay đổi giá trị `model: 'm1'` của array clone **apples** và array gốc **macbooks** cũng bị thay đổi theo,
  
  bỏi vì **apples** vẫn giữ những giá trị reference là object `{model: "macbook2014"}` của array gốc.
