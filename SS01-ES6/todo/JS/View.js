export default class View {
  constructor() {
    this.app = this.getElement("body");

    this.todoWrapper = this.createElement("div", "todo");
    this.form = this.createElement("form", "todo-form");
    this.form.autocomplete = "off";

    this.input = this.createElement("input", "todo-input");
    this.input.type = "text";
    this.input.placeholder = "Enter your task";
    this.input.name = "todo";

    this.submit = this.createElement("button", "todo-submit");
    this.submit.type = "submit";
    this.submit.textContent = "Add";

    this.form.append(this.input, this.submit);

    this.todoList = this.createElement("div", "todo-list");
    this.todoWrapper.append(this.form, this.todoList);
    this.app.append(this.todoWrapper);
  }

  // createElement
  createElement(tag, className) {
    const elm = document.createElement(tag);
    if (className) elm.classList.add(className);
    return elm;
  }
  // getElement
  getElement(selector) {
    const elm = document.querySelector(selector);
    return elm;
  }
  // getter 
  get _todoValue() {
    return this.input.value;
  }
  _resetValue() {
    this.input.value = "";
  }

  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    if (todos.length > 0) {
      todos.forEach((todoText) => {
        const todoItem = this.createElement("div", "todo-item");
        todoItem.innerHTML = `<span class="todo-text">${todoText}</span>
        <i class="fa fa-trash todo-remove" data-value="${todoText}"></i>`
        this.todoList.append(todoItem);
      });
    }
  }

  viewAddTodo(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._todoValue) {
        //callback
        handler(this._todoValue);
        this._resetValue();
      }
    });
  }

  viewRemoveTodo(handler) {
    this.todoList.addEventListener("click", (e) => {
      if (e.target.matches(".todo-remove")) {
        todo.parentNode.removeChild(e.target.parentNode);
        handler(e.target.dataset.value);
      }
    });
  }
}
