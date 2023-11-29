import "./reset.css";
import "./cleaner.scss";
import {appendTodoList, cleanList, taskObjectToListElement, assignTaskToElement} from "./dommanipulation";
import {Task, TodoList} from "./todos";
import {placeInStorage, retrieveStorageList} from "./localStorage";

//All HTML references 
const taskList = document.querySelector("ul#todo-list");

const taskFormSubmitBtn = document.querySelector(".task-form-submit");

const projectList = document.querySelector("#projects");
let selectedProject = document.querySelector(".active");

let projectInstancesHTMLref = document.querySelectorAll("#project");


const taskTitleBtn = document.querySelector(".task-title button");




//Make projectlist, containing project objects
let homeProjectList = new TodoList("home",[]);
let workProjectList = new TodoList("work",[]);


let projects = [homeProjectList, workProjectList];




projectInstancesHTMLref.forEach((element)=>{
    element.addEventListener("click",(e)=>{

        let projectInstanceHTMLref = e.target;

        if ( !projectInstanceHTMLref.classList.contains("active") ){

            for ( let projHTML of projectInstancesHTMLref ){

                if (projHTML.classList.contains("active")){
                    projHTML.classList.remove("active");
                }

            }

            projectInstanceHTMLref.classList.add("active");
            selectedProject = projectInstanceHTMLref;

            
            console.log(selectedProject);
        }
    });
});


taskFormSubmitBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    //get form details
    const titleInput = document.getElementById("titleInputField").value;
    const dueDateInput = document.getElementById("due-date").value;
    const priority = document.querySelector("input[type='radio']:checked").value;

    // validation check for if title and date are empty
    if (titleInput ==""){
        alert("A title of the task must be written!");
        return
    }
    
    //make the object and append it to currently selected project
    const currentTask = new Task(titleInput, dueDateInput, priority );
    

    for ( let proj of projects){
        if ( selectedProject.textContent.toUpperCase() == proj.projectName.toUpperCase() ){
            proj.appendProjectList(currentTask);
        }
    }

    



    closeForm();
});

