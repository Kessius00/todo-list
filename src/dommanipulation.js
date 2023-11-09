
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

export function appendTodoList(text, toDos=todoList){
    //Adds a new li element with class & id todo-item to list with text as first parameter    
    const newListItem = document.createElement("li");
    newListItem.classList.add("todo-item");
    newListItem.id = "todo-item";
    newListItem.textContent = text;
    const date = new Date();
    const dateElement = document.createElement("div");
    dateElement.classList.add("task-date");
    dateElement.textContent = formatTime(date,true);
    newListItem.appendChild(dateElement);


    toDos.appendChild(newListItem);
}

export function cleanList(toDos=todoList){
    //fully removes all childElements from parentList
    while (toDos.children.length>0){
        toDos.removeChild(toDos.children[0]);
        console.log("Child removed");
    }
    console.log("All todo-items removed");
}


