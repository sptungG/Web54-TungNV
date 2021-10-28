// MVC: Model View Controller
// Model: xử lý chức năng về logic Thêm, Xóa, Sửa
// View: hiển thị DOM, ...
// Controller: gắn kết Model, View, thực hiện những cái liên quan đến User
import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";

const app = new Controller(new Model(), new View());
