
const todoList = document.querySelector("#todo-list");


export function appendTodoList(text, toDos=todoList){
    //Adds a new li element with class & id todo-item to list with text as first parameter    
    const newListItem = document.createElement("li");
    newListItem.classList.add("todo-item");
    newListItem.id = "todo-item";
    newListItem.textContent = text;
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


