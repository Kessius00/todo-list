import "./reset.css";
// import "./main.css";
import "./cleaner.sass";
import ToDo from "./todos";

// const content = document.querySelector("#content");
const dededede = new ToDo("clear room", "ded","De","d","dede");
dededede.displayDetails()

const todoList = document.querySelector("#todo-list");

const newListItem = document.createElement("li");
newListItem.classList.add("todo-item");
newListItem.id = "todo-item";
newListItem.textContent = "textext";

todoList.appendChild(newListItem);