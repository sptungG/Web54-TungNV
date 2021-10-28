window.addEventListener("load", function () {
  // Variables declaration
  const form = document.querySelector(".todo-form");
  const todoList = document.querySelector(".todo-list");
  let todos = JSON.parse(localStorage.getItem("todoList")) || [];
  // console.log("localStorage", localStorage);

  // console.log("todos", todos);
  if (Array.isArray(todos) && todos.length > 0) {
    [...todos].forEach((item) => createTodoItem(item));
  }
  function createTodoItem(todo) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (todo.isCompleted) {
      todoItem.classList.add("done");
    }
    todoItem.innerHTML = `
    <input type="checkbox" id="${todo.id}" class="todo-checkbox"/>
    <label for="${todo.id}" class="todo-label"></label>
    <span class="todo-text">${todo.title}</span>
    <i class="fa fa-trash todo-remove" data-id="${todo.id}"></i>
    `;
    todoList.appendChild(todoItem);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoVal = this.elements["todo"].value;
    if (!todoVal) return;
    // Main code
    let todoData = {
      id: Date.now(),
      title: todoVal,
      isCompleted: false,
    }
    createTodoItem(todoData);
    todos.push(todoData);
    localStorage && localStorage.setItem("todoList", JSON.stringify(todos));
    // save to localStorage
    this.elements["todo"].value = "";
  });

  // Handle remove todo
  todoList.addEventListener("click", function (e) {
    if (e.target.matches(".todo-remove")) {
      // remove todo in DOM
      const todo = e.target.parentNode;
      todo.parentNode.removeChild(todo);
      // remove todo in localStorage
      const todoId = e.target.dataset.id;
      const index = todos.findIndex((item) => item.id === todoId);
      todos.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todos));
    }
    if(e.target.matches(".todo-checkbox")) {
      const todoId = parseInt(e.target.id);
      const index = todos.findIndex((item) => item.id === todoId);
      const todo = e.target.parentNode;
      if (!todos[index].isCompleted) {        
        todo.classList.add("done");
        todos[index].isCompleted = true;
        localStorage.setItem("todoList", JSON.stringify(todos));
      }else{
        todo.classList.remove("done");
        todos[index].isCompleted = false;
        localStorage.setItem("todoList", JSON.stringify(todos));
      }
    }
  });
});
