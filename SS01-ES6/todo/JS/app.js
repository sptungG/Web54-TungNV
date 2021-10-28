// MVC: Model View Controller
// Model: xử lý chức năng về logic Thêm, Xóa, Sửa
// View: hiển thị DOM, ...
// Controller: gắn kết Model, View, thực hiện những cái liên quan đến User
import Controller from "./Controller.js";
import Model from "./Model.js";
import View from "./View.js";

const app = new Controller(new Model(), new View());
