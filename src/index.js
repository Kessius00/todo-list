import "./reset.css";
import "./main.css";
import "./cleaner.scss";
import {appendTodoList, cleanList} from "./dommanipulation";
import ToDo from "./todos";

// const content = document.querySelector("#content");
// const dededede = new ToDo("clear room", "ded","De","d","dede");
// dededede.displayDetails()

const todoList = document.querySelector("#todo-list");

cleanList(todoList);

appendTodoList("Get groceries", todoList);
appendTodoList("Add soup", todoList);
appendTodoList("Get delivery", todoList);
