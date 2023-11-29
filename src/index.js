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
let projectInstancesHTMLref = document.querySelectorAll("#project");
let taskTitleButtonInstances = document.querySelectorAll(".taskTitle button");

taskTitleButtonInstances.forEach((element)=>{
    element.addEventListener("click", (e)=>{
        let thisTaskTitle = e.target;
        changeTaskTitle(thisTaskTitle, "d");
    })
})


function changeTaskTitle(taskTitleText, titleEdit){
    console.log("change shit");
    // taskTitleText.style.display = "none";
    // titleEdit.style.display = "block";

}

function changeTaskDescription(taskDescriptionText, descriptionEdit){

}





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
            activeProject = projectInstanceHTMLref;

            fillRelevantProjectTasks()
            

        }
    });
});


//Make 3 projectLists
let homeProjectList = new TodoList("home",[]);
let workProjectList = new TodoList("work",[]);



let projects = [homeProjectList, workProjectList];

function fillRelevantProjectTasks(){
    //make the tasklist empty and fill with the new project
    cleanList(todoListHTMLref);
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
}

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
            proj.projectListArray.push(currentTaskInHTML);

            break;
        }

    }

    fillRelevantProjectTasks();

    
    //clean storage to fill it in with the projects array, containing the project object instances
    localStorage.clear();
    placeInStorage(projects);
    console.log(retrieveStorageList());

    taskTitlesHTML = document.querySelectorAll(".taskTitle");
    closeForm();
})



// taskTitlesHTML.forEach((element)=>{
//     element.addEventListener("click",(e)=>{
//         let taskInstance = e.target;
//         console.log("taskInstance");
        
//     });
// });