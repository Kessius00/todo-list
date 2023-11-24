import "./reset.css";
import "./cleaner.scss";
import {appendTodoList, cleanList, createNewTask, assignTaskToElement} from "./dommanipulation";
import {Task, TodoList} from "./todos";
import {placeInStorage, retrieveStorageList} from "./localStorage";

//All HTML references 
const todoListHTMLref = document.querySelector("#todo-list");
const submitBtn = document.querySelector("button[type='submit']");
const projectsHTMLref = document.querySelector("#projects");
let activeProject = document.querySelector(".active");

//Make 3 projectLists
let homeProjectList = new TodoList("home",[]);
let workProjectList = new TodoList("work",[]);

let projects = [homeProjectList, workProjectList];


// projectBtn.addEventListener("click"){
//     // make this project active and change basic todoList in HTML to this object array (containing the elements)
// }


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const titleInput = document.getElementById("titleInputField").value;
    const descriptionInput = document.getElementById("descriptionInputField").value;
    const dueDateInput = document.getElementById("due-date").value;
    const selectedPriority = document.querySelector("input[type='radio']:checked").value;

    let currentTask = new Task(titleInput, descriptionInput, dueDateInput, selectedPriority );
    let currentTaskInHTML = assignTaskToElement(currentTask);

    // validation check for if title and date are empty
    if (titleInput ==""){
        alert("A title of the task must be written!");
        return
    }

    //for alle projects object instances in de array projects
    for (let proj of projects){

        //zorg dat we de active project selecteren in array project om deze array te manipuleren
        if (proj.projectName.toUpperCase() == activeProject.textContent.toUpperCase()){

            //voeg nieuwe taak toe (in HTML vorm) aan deze projectarray
            console.log(currentTaskInHTML);

            proj.projectListArray.push(currentTaskInHTML);

            break;
        }

    }
    
    //clean the HTML basic todoList
    cleanList(todoListHTMLref);


    //clean storage to fill it in with the projects array, containing the project object instances
    localStorage.clear();
    placeInStorage(projects);
    console.log(retrieveStorageList())

    //for alle projects object instances in de array projects
    for (let proj of projects){
        //zorg dat we de active project selecteren in array project om deze array te manipuleren
        if (proj.projectName.toUpperCase() == activeProject.textContent.toUpperCase()){
            //voeg alle taken in actieve project toe aan HTML doc
            for (let task of proj.projectListArray){
                todoListHTMLref.appendChild(task);
            }
        }

    }


   
    closeForm();
})

