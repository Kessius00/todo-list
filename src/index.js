import "./reset.css";
import "./main.css";
import "./cleaner.scss";
import {appendTodoList, cleanList} from "./dommanipulation";
// import ToDo from "./todos";

const todoList = document.querySelector("#todo-list");



function openForm(){
    const popupForm = document.querySelector(".form-popup");
    popupForm.style.display = "block";


}


function closeForm(){
    const popupForm = document.querySelector(".form-popup");
    popupForm.style.display = "none";

}