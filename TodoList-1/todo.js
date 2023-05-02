const todoInput = document.querySelector("#todo");
const submitButton = document.querySelector("#add-todo");
const todoList = document.querySelectorAll(".card-body")[1].children[3];
const cardBody = document.querySelector(".card-body");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearAllTasksButton = document.querySelector("#clear-todos");
const filterButton = document.querySelector("#filter-todo");


submitButton.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", getFromStoragetoUi);
secondCardBody.addEventListener("click", removeItem);
clearAllTasksButton.addEventListener("click", clearAllTasks);
filterButton.addEventListener("keyup", filterTodo)


function filterTodo(e) {
    let filterValue = e.target.value.toLocaleLowerCase().trim();
    const todos = document.querySelectorAll(".list-group-item");

    if (todos.length > 0) {

        todos.forEach((todo) => {
            if ((todo.textContent.trim().toLocaleLowerCase()).includes(filterValue)) {
                todo.setAttribute("style", "display:block")
            } else {
                todo.setAttribute("style", "display:none !important");
            }
        })

    } else {
        createAlert("warning", "At least one todo is required to filter");
    }
}


function clearAllTasks(e) {

    //clear from Ui
    const todos = document.querySelectorAll(".list-group-item");
    todos.forEach((todo) => {
        todo.remove();
    })

    //clear from Storage

    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.splice(0, todoList.length);
    localStorage.setItem("todoList", JSON.stringify(todoList));

    createAlert("danger", "Clear all todos");

}

function removeItem(e) {
    // remove item from Ui
    if (e.target.className === "fa fa-close") {
        e.target.parentElement.parentElement.remove();
    }
    // remove item from Storage
    removeItemFromStorage(e);

}


function removeItemFromStorage(e) {
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    if (e.target.className === "fa fa-close") {
        let index = todoList.indexOf(e.target.parentElement.parentElement.textContent);
        todoList.splice(index, 1);
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


function getFromStoragetoUi() {
    let todos = JSON.parse(localStorage.getItem("todoList"));
    todos.forEach((todo) => {
        createTodo(todo);
    })
}

function createAlert(alert, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${alert}`;
    div.textContent = message;
    div.style.marginTop = "10px";
    cardBody.appendChild(div);

    setTimeout(() => {
        cardBody.lastChild.remove();
    }, 2000);
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


function addTodo(e) {
    // adding todo to Ui
    if (todoInput.value === "" || todoInput.value === null) {
        createAlert("warning", "Lütfen bir todo giriniz.");

    } else {
        createTodo(todoInput.value);
        //adding todo to Storage
        addTodotoStorage();
    }
    todoInput.value = "";
    e.preventDefault();
    createAlert("success", "Added todo");
}



function addTodotoStorage() {

    if (localStorage.getItem("todoList") === null) {
        let todoList = [];
        todoList.push(todoInput.value);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    } else {
        let todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.push(todoInput.value);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}