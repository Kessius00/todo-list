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



//Make projectlist, containing project objects
let homeProjectList = new TodoList("home", [], true);
let workProjectList = new TodoList("work", [], false);


let projects = [homeProjectList, workProjectList];

function projectObjectInHtml(){
    for ( let proj of projects){
        if ( selectedProject.textContent.toUpperCase() == proj.projectName.toUpperCase() ){

            const currentProjectList = proj.projectListArray;

            cleanList(taskList);
            for (let task of currentProjectList){
                taskList.appendChild(taskObjectToListElement(task));
            }
        }
    }
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
            selectedProject = projectInstanceHTMLref;
            projectObjectInHtml();
            
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

        //HIER BEGINNEN MET DE VERANDERING IN ACTIVE PROJECTS KIEZEN

        if ( selectedProject.textContent.toUpperCase() == proj.projectName.toUpperCase() ){

            //append taskObject to project
            proj.appendProjectList(currentTask);
        }
    }

    projectObjectInHtml();

    //clean storage to fill it in with the projects array, containing the project object instances
    localStorage.clear();
    placeInStorage(projects);
    console.log(retrieveStorageList());



    closeForm();

    const taskTitleBtnAll = document.querySelectorAll(".task-title-btn");
    console.log(taskTitleBtnAll);

    taskTitleBtnAll.forEach((element)=>{
        element.addEventListener("click",()=>{
            const currentTitle = element.textContent;
            element.classList.add("hidden");
            const inputElement = element.parentElement.children[1];
            inputElement.value = currentTitle;
            inputElement.classList.remove("hidden");
            // inputElement.select();

            console.log(element.parentElement)

            const accept = element.parentElement.children[2];
            accept.classList.remove("hidden");

            // if enter is pressed or accept is clicked, remove input and accept and add new value to titlebtn

            accept.addEventListener("click", ()=>{
                element.textContent = inputElement.value;
                element.classList.remove("hidden");

                accept.classList.add("hidden");
                inputElement.classList.add("hidden");

                const newTaskTitle = element.textContent;

                active



                // update the projects array with objects to give new names
            })



        })
    });

});

