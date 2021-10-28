export default class Model {
  constructor() {
    // this.todos = ["Tung", "Tunggg"];
    this.todos = JSON.parse(localStorage.getItem("todoList")) || [];
  }

  handleTodoChange(handler) {
    this.todoListChange = handler;
    // handleTodoChange = (todos) => {
    //   this.view.displayTodos(todos);
    // };
  }

  _reload(todos) {
    this.todoListChange(todos);
    localStorage.setItem("todoList", JSON.stringify(todos));
  }

  addTodo(todoText) {
    if (todoText.length > 0) {
      this.todos.push(todoText);
    }
    this._reload(this.todos);
  }

  removeTodo(todoText) {
    const index = this.todos.findIndex((item) => item === todoText);
    this.todos.splice(index, 1);
    this._reload(this.todos);
  }
}
