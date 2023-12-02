import "./reset.css";
import "./cleaner.scss";
import {appendTodoList, cleanList, taskObjectToListElement, assignTaskToElement} from "./dommanipulation";
import {Task, TodoList} from "./todos";
import {placeInStorage, retrieveStorageList} from "./localStorage";

//All HTML references 
const body = document.querySelector("body");
const taskList = document.querySelector("ul#todo-list");
const taskFormSubmitBtn = document.querySelector(".task-form-submit");
const projectList = document.querySelector("#projects");
let selectedProject = document.querySelector(".active");
let projectInstancesHTMLref = document.querySelectorAll("#project");



//Make project list, containing project objects
let homeProjectList = new TodoList("Home", [], true);
let workProjectList = new TodoList("Work", [], false);


let projects = [homeProjectList, workProjectList];
let activeProject = getActiveProject();
console.log("current project: ",activeProject);

function projectObjectInHtml(){
    const proj = getActiveProject();
    const currentProjectList = proj.projectArray;

    cleanList(taskList);
    for (let task of currentProjectList){
        taskList.appendChild(taskObjectToListElement(task));
    }
}

function getActiveProject(){
    for (let proj of projects){
        if (proj.projectActive){
            return proj
        };
    };
}

function updateProjectInArray(updatedProject, projectArray=projects){
    //update a project in the list by an updated project
    for (let proj of projectArray){
        if (updatedProject.projectName == proj.projectName){
            //find the old version of the project in the list
            let index = projectArray.indexOf(proj);

            //replace the old version with the new version
            projectArray[index] = updatedProject;
            activeProject = updatedProject;
        }
    }
}

function deactivateAllProjects(){
    for (let proj of projects){
        proj.projectActive = false;
    }
}

function updateStorage(){
    //only changes the projects list in storage

    //clean storage to fill it in with the projects array, containing the project object instances
    localStorage.clear();

    //place projects list in storage
    placeInStorage(projects);

    //monitoring
    console.log("new storage projects list: ", retrieveStorageList());
}

function acceptTitle(element, inputElement, accept, currentTitle){
    const newTaskTitle = inputElement.value;

    //change clicked element (the titleButton) and make visible again
    element.textContent = newTaskTitle;
    element.classList.remove("hidden");

    // hide the accept button and input element again
    accept.classList.add("hidden");
    inputElement.classList.add("hidden");

    // update the projects array with objects to give new names
    let updatedProject = activeProject
    for (let task of updatedProject.projectArray){
        if (task.title == currentTitle){
            //get place of the task you are changing
            const index = updatedProject.projectArray.indexOf(task);
            //change task title
            task.title = newTaskTitle;
            //make new task into the updatedProject array
            updatedProject.projectArray[index] = task;
        }
    }
    //make the title change update in the projects list and in the activeProject variable
    updateProjectInArray(updatedProject);

    // update localStorage
    updateStorage();
}

projectInstancesHTMLref.forEach((element)=>{
    element.addEventListener("click",(e)=>{

        let clickedProject = e.target;

        //if the clickedProject isn't already active
        if ( !clickedProject.classList.contains("active") ){

            for ( let projHTML of projectInstancesHTMLref ){

                if (projHTML.classList.contains("active")){

                    //make sure no active projects anywhere
                    deactivateAllProjects();
                    projHTML.classList.remove("active");
                }

            }

            const clickedProjectName = clickedProject.textContent;
            for (let proj of projects){
                if (proj.projectName == clickedProjectName){
                    // change made 
                    proj.projectActive = true;

                    //change updated in array and in activeProject object
                    updateProjectInArray(proj);
                };
            }


            clickedProject.classList.add("active");
            selectedProject = clickedProject;
            projectObjectInHtml();
            
            console.log("Change of project: ", activeProject);
        }
    });
});


function hoveringOverElement(element){
    element.addEventListener("mouseover", (e)=>{
        e.preventDefault();
        return true
    })
    return false
    
}


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

    const updatedProject = getActiveProject();

    // append currentTask to updatedProject
    updatedProject.appendProjectList(currentTask);

    // update global project to updatedProject
    updateProjectInArray(updatedProject);

    projectObjectInHtml();

    // update storage
    updateStorage()



    closeForm();
    //new HTML references
    const taskTitleBtnAll = document.querySelectorAll(".task-title-btn");
    const taskDateBtnAll = document.querySelectorAll("task-date-btn");

    taskTitleBtnAll.forEach((element)=>{
        element.addEventListener("click",()=>{
            // declare all HTML references in the task title div
            const currentTitle = element.textContent;
            const inputElement = element.parentElement.children[1];
            const accept = element.parentElement.children[2];

            element.classList.add("hidden");

            //change input element visibility and focus on it
            inputElement.value = currentTitle;
            inputElement.classList.remove("hidden");
            inputElement.focus();

            // change the accept button visibility
            accept.classList.remove("hidden");

            // if enter is pressed or accept is clicked, remove input and accept and add new value to title btn

            // if accept button is clicked
            accept.addEventListener("click", ()=>{
                acceptTitle(element, inputElement, accept, currentTitle);
            });

            // if user focuses on anything other than inputElement
            inputElement.addEventListener("blur", ()=>{
                acceptTitle(element, inputElement, accept, currentTitle);
            });

            // if enter is pressed
            inputElement.addEventListener("keydown", (e)=>{
                if (e.key=== "Enter"){
                    acceptTitle(element, inputElement, accept, currentTitle);
                }
            });

         




        })
    });



});

