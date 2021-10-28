export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // this.model.addTodo("Tung");
    // this.view.displayTodos(this.model.todos);

    this.model.handleTodoChange(this.handleTodoChange);
    this.view.viewAddTodo(this.handleAddTodo);
    this.view.viewRemoveTodo(this.handleRemoveTodo);

    this.handleTodoChange(this.model.todos);
  }

  handleTodoChange = (todos) => {
    this.view.displayTodos(todos);
  };

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handleRemoveTodo = (todoText) => {
    this.model.removeTodo(todoText);
  };
}
