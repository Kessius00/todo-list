
const todoList = document.querySelector("#todo-list");


function formatTime(date, showTime = false){
    if (!showTime){
        return " " + date.getDate() + "/" +date.getMonth() + "/" +date.getFullYear()
    } else {
        if (date.getMinutes()<10){
            return date.getHours()+":0"+date.getMinutes()+ " - " + date.getDate() + "/" +date.getMonth() + "/" +date.getFullYear()
        }
        return date.getHours()+":"+date.getMinutes()+ " - " + date.getDate() + "/" +date.getMonth() + "/" +date.getFullYear()
    }
    
}

function createNewTask(title, description, dueDate, priority, timeLeft = false){
    const newListItem = document.createElement("li");
    newListItem.classList.add("todo-item");
    newListItem.id = "todo-item";

    //title creation
    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = title;

    //description creation
    const taskDescription = document.createElement("div");
    taskDescription.classList.add("taskDescription");
    taskDescription.textContent = description;

    //deadline creation
    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("dueDate");
    taskDueDate.textContent = dueDate;

    //priority creation
    const taskPriority = document.createElement("div");
    taskPriority.classList.add("taskPriority");
    taskPriority.textContent = priority;


    //edit button creation
    const taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("taskEditBtn");
    taskEditBtn.textContent = "edit";

    //append all child-elements to list item (parent)
    newListItem.appendChild(taskTitle);
    newListItem.appendChild(taskDescription);
    newListItem.appendChild(taskDueDate);
    newListItem.appendChild(taskPriority);
    newListItem.appendChild(taskEditBtn);

    return newListItem
    
}

// export function appendTodoList(text, toDos=todoList){
//     //Adds a new li element with class & id todo-item to list with text as first parameter    
//     const newListItem = createNewTask(text)


//     toDos.appendChild(newListItem);
// }

todoList.appendChild(createNewTask("Things", "I'd like to change the world etcetera and stuff", "23/23/2323", 4));


export function cleanList(toDos=todoList){
    //fully removes all childElements from parentList
    while (toDos.children.length>0){
        toDos.removeChild(toDos.children[0]);
        console.log("Child removed");
    }
    console.log("All todo-items removed");
}


