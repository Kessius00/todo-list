import "./reset.css";
import "./cleaner.scss";
import {appendTodoList, cleanList, taskObjectToListElement, assignTaskToElement} from "./dommanipulation";
import {Task, TodoList} from "./todos";
import {placeInStorage, retrieveStorageList, updateStorage} from "./localStorage";

//All HTML references 
const body = document.querySelector("body");
const taskList = document.querySelector("ul#todo-list");
const taskFormSubmitBtn = document.querySelector(".task-form-submit");
const projectList = document.querySelector("#projects");
let selectedProject = document.querySelector(".active");
let projectInstancesHTMLref = document.querySelectorAll("#project");
const projectPopUpForm = document.querySelector(".popUpProject");

const enterProjectBtn = document.querySelector(".EnterProjectBtn");
const cancelProjectBtn = document.querySelector(".CancelProjectBtn");



//Make project list, containing project objects
let homeProjectList = new TodoList("Home", [], true);
let workProjectList = new TodoList("Work", [], false);

let projects = [homeProjectList, workProjectList];

fillProjectList();
let activeProject = getActiveProject();
console.log("current project: ",activeProject);

//projectBtn changes
const openProjectForm = document.querySelector("button.addNewProject");
// console.log(" heurhfeh",projectInstancesHTMLref);


openProjectForm.addEventListener("click", ()=>{

    // openForm
    projectPopUpForm.classList.remove("hidden");

    // remove the <button class="addNewProject">+ project</button> 
    openProjectForm.classList.add("hidden");


});

enterProjectBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    //get form details
    const projectTitle = document.getElementById("titleProject").value;

    console.log(projectTitle);
    // validation check for if title and date are empty
    if (projectTitle ==""){
        alert("A title of the project must be written!");
        return
    }
    
    //make the object and append it to currently selected project
    const newProject = new TodoList(projectTitle, [], false );

    if (!projectNameAvailable(newProject)){
        alert("Title already taken");
        return

    }
    addNewProject(newProject);
    fillProjectList();

    // update storage
    updateStorage(projects);


    projectPopUpForm.classList.add("hidden");
    openProjectForm.classList.remove("hidden");


});

cancelProjectBtn.addEventListener("click", (e)=>{

    e.preventDefault();
    //     const popupForm = document.querySelector(".form-popup");


    //     popupForm.style.display = "none";
    projectPopUpForm.classList.add("hidden");
    //     document.getElementById("myForm").reset();
    document.getElementById("projectForm").reset();
    openProjectForm.classList.remove("hidden");

});

function fillProjectList(){
    cleanList(projectList);

    for (let proj of projects){
        
        const projectItem = document.createElement("li");
        projectItem.classList.add("project");
        projectItem.setAttribute("id", "project");
        projectItem.textContent = proj.projectName;

        // how to deal with the activeProject
        if (proj.projectActive){
            projectItem.classList.add("active");
        }

        projectList.appendChild(projectItem);



    }

    projectInstancesHTMLref = document.querySelectorAll("#project");
    projectToggle();

}

function addNewProject(projectObject){
    //for adding a new project to the project list, fully changing the DOM and all

    //check if projectName is not already used
    if (projectNameAvailable(projectObject)){
        // add new project to projects list
        projects.push(projectObject);

        //clear the current projectList
        cleanList(projectList);
    

        fillProjectList();

    }
}

function projectNameAvailable(projectObject){
    //put all current projectnames in a list
    let currentProjectNames = [];
    for (let proj of projects){
        currentProjectNames.push(proj.projectName);
    }

    if (currentProjectNames.includes(projectObject.projectName)){
        // already a project with this name
        // projectNameTaken();
        return false
    }

    return true

}




//task things
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
    updateStorage(projectArray);


}

function deactivateAllProjects(){
    for (let proj of projects){
        proj.projectActive = false;
    }
}

function acceptTaskTitleEdit(element, inputElement, accept, currentTitle){
    const newTaskTitle = inputElement.value;

    //change clicked element (the titleButton) and make visible again
    element.textContent = newTaskTitle;
    element.classList.remove("hidden");

    // hide the accept button and input element again
    accept.classList.add("hidden");
    inputElement.classList.add("hidden");

    // update the projects array with objects to give new names
    let updatedProject = activeProject;
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
    updateStorage(projects);

}



function taskBtnEvents(){
    //new HTML references
    const taskTitleBtnAll = document.querySelectorAll(".task-title-btn");
    const taskDateBtnAll = document.querySelectorAll(".task-date-btn");

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

            //DOIET HET NIET GOED
            accept.addEventListener("click", (e)=>{
                
                acceptTaskTitleEdit(element, inputElement, accept, currentTitle);
            });

            // if user focuses on anything other than inputElement
            inputElement.addEventListener("focusout", (e)=>{
                
                acceptTaskTitleEdit(element, inputElement, accept, currentTitle);
                
            });

            // if enter is pressed
            inputElement.addEventListener("keydown", (e)=>{
                if (e.key=== "Enter"){
                    
                    acceptTaskTitleEdit(element, inputElement, accept, currentTitle);
                }
            });
            

            // weird thing: everytime you click, the times new storage projects list shows up increments. fix this

            // it depends on the button clicked. if i click btn 1 three times, i get four messages next, but 1 if i click btn 2
         




        });
    });

    taskDateBtnAll.forEach((element)=>{
        element.addEventListener("click", ()=>{
            // make date button dissapear
            const taskDateBtn = element;
            taskDateBtn.classList.add("hidden");

            const acceptDateBtn = element.parentElement.children[0];
            const inputDate = element.parentElement.children[2];
            
            acceptDateBtn.classList.remove("hidden");

            const currentDate = taskDateBtn.textContent;
            inputDate.value = currentDate;
            inputDate.classList.remove("hidden");
            inputDate.focus();


            // if user focuses on anything other than inputElement
            inputDate.addEventListener("focusout", (e)=>{

                acceptTaskDateEdit(taskDateBtn, acceptDateBtn, inputDate, activeProject, currentDate);

            });

            // if enter is pressed
            inputDate.addEventListener("keydown", (e)=>{
                if (e.key=== "Enter"){
                    acceptTaskDateEdit(taskDateBtn, acceptDateBtn, inputDate, activeProject, currentDate);
                    
                }
            });

            


            
        });
    });
}

function acceptTaskDateEdit(taskDateBtn, acceptDateBtn, inputDate, activeProject, currentDate){
    const newDate = inputDate.value;
    taskDateBtn.textContent = newDate;

    acceptDateBtn.classList.add("hidden");
    inputDate.classList.add("hidden");
    taskDateBtn.classList.remove("hidden");


    // update the projects array with objects to give new names
    let updatedProject = activeProject;
    for (let task of updatedProject.projectArray){
        if (task.dueDate == currentDate){
            //get place of the task you are changing
            const index = updatedProject.projectArray.indexOf(task);
            //change task title
            task.dueDate = newDate;
            //make new task into the updatedProject array
            updatedProject.projectArray[index] = task;
        }
    }
    //make the title change update in the projects list and in the activeProject variable
    updateProjectInArray(updatedProject);
}


function projectToggle(){
    //enables toggling between projects

    projectInstancesHTMLref.forEach((element)=>{
        // if project is clicked, turn to that project
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

                //task buttons should be interact-able 
                taskBtnEvents();
                
                console.log("Change of project: ", activeProject);
            }
        });
    });
}

//enables toggling between projects
projectToggle();


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
    updateStorage(projects);

    closeForm();
    
    taskBtnEvents();


});

