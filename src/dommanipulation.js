



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

export function createNewTask(title, description, dueDate, priority, timeLeft = false){
    const newListItem = document.createElement("li");
    newListItem.classList.add("todo-item");
    newListItem.id = "todo-item";

    //title creation
    const taskTitle = document.createElement("div");
    taskTitle.classList.add("taskTitle");

    const taskTitleText = document.createElement("button");
    taskTitleText.textContent = title;
    

    const titleEdit = document.createElement("input");
    titleEdit.type=Text;
    titleEdit.value=title;
    titleEdit.classList.add("input-task-title");

    // taskTitleText.addEventListener("click", changeTaskTitle(taskTitleText, titleEdit));

    taskTitle.appendChild(taskTitleText);
    taskTitle.appendChild(titleEdit);

    

    //description creation
    const taskDescription = document.createElement("div");
    taskDescription.classList.add("taskDescription");

    const taskDescriptionText = document.createElement("button");
    taskDescriptionText.textContent = description;

    const descriptionEdit = document.createElement("input");
    descriptionEdit.type=Text;
    descriptionEdit.value=description;
    descriptionEdit.classList.add("input-task-description");

    taskDescription.appendChild(taskDescriptionText);
    taskDescription.appendChild(descriptionEdit);
    

    //deadline creation
    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("dueDate");
    taskDueDate.textContent = "due date: " + dueDate;

    //priority creation
    const taskPriority = document.createElement("div");
    taskPriority.classList.add("taskPriority");
    taskPriority.textContent = "priority: " + priority;


    //edit button creation
    const taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("taskEditBtn");
    taskEditBtn.textContent = "delete";

    //append all child-elements to list item (parent)
    newListItem.appendChild(taskTitle);
    newListItem.appendChild(taskDescription);
    newListItem.appendChild(taskDueDate);
    newListItem.appendChild(taskPriority);
    newListItem.appendChild(taskEditBtn);

    return newListItem
    
}


export function cleanList(toDos){
    //fully removes all childElements from parentList
    while (toDos.children.length>0){
        toDos.removeChild(toDos.children[0]);
    }
}


export function assignTaskToElement(taskObject){
    const taskElement = createNewTask(taskObject.title, taskObject.description, taskObject.dueDate, taskObject.priority);
    return taskElement
}
