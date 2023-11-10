import "./reset.css";
import "./main.css";
import "./cleaner.scss";
import {appendTodoList, cleanList, createNewTask} from "./dommanipulation";
import Task from "./todos";

const todoList = document.querySelector("#todo-list");

const newTask = new Task("Clean dishes", "Have to clean the dishes","1/12/2023","2");



function assignTaskToElement(taskObject){
    const taskElement = createNewTask(taskObject.title, taskObject.description, taskObject.dueDate, taskObject.priority);
    return taskElement
}

todoList.appendChild(assignTaskToElement(newTask));

const submitBtn = document.querySelector("button[type='submit']");


submitBtn.addEventListener('click', ()=>{

    const titleInput = document.getElementById("titleInputField").value;
    const descriptionInput = document.getElementById("descriptionInputField").value;
    const dueDateInput = document.getElementById("due-date").value;
    const selectedPriority = document.querySelector("input[type='radio']:checked").value;

    //validation check for if title and date are empty
    if (titleInput == '' && dueDateInput==''){
        return
    }
    
    let currentTask = new Task(titleInput, descriptionInput, dueDateInput, selectedPriority );
    console.log(currentTask);
    closeForm() 
    // todoList.appendChild(assignTaskToElement(currentTask));

})
