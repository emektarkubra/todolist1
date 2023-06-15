const todoInput = document.querySelector("#todo");
const submitButton = document.querySelector("#add-todo");
const todoList = document.querySelector(".list-groups");
const cardBody = document.querySelector(".card-body");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filterInput = document.querySelector("#filter-todo");
const removeAllTasksButton = document.querySelector("#clear-todos");

createEvents();

function createEvents() {

    submitButton.addEventListener("click", addTodo);
    document.addEventListener("DOMContentLoaded", loadTodoToUi);
    secondCardBody.addEventListener("click", removeItem);
    filterInput.addEventListener("keyup", filterTodos);
    removeAllTasksButton.addEventListener("click", removeAllTasks);

}

function createTodo(value) {

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = value;
    const a = document.createElement("a");
    a.href = "#";
    a.id = "delete-item";
    const i = document.createElement("i");
    i.className = "fa fa-close";
    i.style.fontSize = "12px";
    todoList.appendChild(li).appendChild(a).appendChild(i);

}

function createAlert(alert, message) {

    const div = document.createElement("div");
    div.className = `alert alert-${alert}`;
    div.textContent = message;
    div.style.marginTop = "10px";
    cardBody.appendChild(div);

    setTimeout(() => {
        cardBody.lastElementChild.remove();
    }, 2000);

}

function addTodo(e) {

    if (todoInput.value.trim() === "" || todoInput.value === null) {
        createAlert("warning", "Please, enter a todo!");
    } else {
        // adding to Ui
        createTodo(todoInput.value);

        // adding to Storage
        addTodoToStorage(e);
        todoInput.value = "";

        // alert
        createAlert("success", "Added todo")
    }
    e.preventDefault();

}

function addTodoToStorage(e) {

    if (JSON.parse(localStorage.getItem("todoList")) == null) {
        let todoList = [];
        todoList.push(todoInput.value.trim());
        localStorage.setItem("todoList", JSON.stringify(todoList));
    } else {
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.push(todoInput.value.trim());
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

}

function loadTodoToUi() {

    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.forEach(todo => {
        createTodo(todo);
    });

}

function removeItem(e) {

    if (e.target.className === "fa fa-close") {
        // remove item from Ui
        e.target.parentElement.parentElement.remove();

        // remove item from storage
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        let index = todoList.indexOf(e.target.parentElement.parentElement.textContent);
        todoList.splice(index, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };
}

function filterTodos(e) {

    let filterValue = e.target.value.toLocaleLowerCase().trim();
    const todos = document.querySelectorAll(".list-group-item");
    todos.forEach((todo) => {
        if ((todo.textContent.toLocaleLowerCase().trim()).includes(filterValue)) {
            todo.setAttribute("style", "display:block");
        } else {
            todo.setAttribute("style", "display:none");
        }
    });
}

function removeAllTasks(e) {
    // remove from Ui
    const todos = document.querySelectorAll(".list-group-item");
    todos.forEach((todo) => {
        todo.remove();
    })

    // remove from storage
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.splice(0, todoList.length);
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // alert
    createAlert("danger", "Removed all tasks!");
}