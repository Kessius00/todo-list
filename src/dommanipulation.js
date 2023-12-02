export function cleanList(toDos){
    //fully removes all childElements from parentList
    while (toDos.children.length>0){
        toDos.removeChild(toDos.children[0]);
    }
}



export function taskObjectToListElement(taskObject){
    const priority = taskObject.priority;
    const dueDate = taskObject.dueDate;
    const title = taskObject.title;

    const newListItem = document.createElement("li");
    newListItem.classList.add("task");
    newListItem.id = "task";
    newListItem.value = priority;


    //title creation
    const taskStart = document.createElement("div");
    taskStart.classList.add("task-start");

    const closeTaskButton = document.createElement("div");
    closeTaskButton.classList.add("close-task");

    taskStart.appendChild(closeTaskButton);


    const taskTitleDiv = document.createElement("div");
    taskTitleDiv.classList.add("task-title");

    const taskTitleBtn = document.createElement("button");
    taskTitleBtn.classList.add("task-title-btn");
    taskTitleBtn.textContent = title;

    const taskTitleInput = document.createElement("input");
    taskTitleInput.type = 'text';
    taskTitleInput.classList.add("task-title-input", "hidden");

    const acceptTitle = document.createElement("button");
    acceptTitle.textContent = "accept";
    acceptTitle.classList.add("accept-title-btn", "hidden");


    taskTitleDiv.appendChild(taskTitleBtn);
    taskTitleDiv.appendChild(taskTitleInput);
    taskTitleDiv.appendChild(acceptTitle);

    taskStart.appendChild(taskTitleDiv);


    //date
    const acceptDate = document.createElement("button");
    acceptDate.textContent = "accept";
    acceptDate.classList.add("accept-date-btn", "hidden");

    const taskDate = document.createElement("div");
    taskDate.classList.add("task-date");

    const taskDateBtn = document.createElement("button");
    taskDateBtn.classList.add("task-date-btn");
    taskDateBtn.textContent = dueDate;

    const taskDateInput = document.createElement("input");
    taskDateInput.type = 'date';
    taskDateInput.classList.add("task-date-input", "hidden");

    
    taskDate.appendChild(acceptDate);
    taskDate.appendChild(taskDateBtn);
    taskDate.appendChild(taskDateInput);

    //append all child-elements to list item (parent)
    newListItem.appendChild(taskStart);
    newListItem.appendChild(taskDate);


    return newListItem
    
}

