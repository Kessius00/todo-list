import "./reset.css";
import "./main.css";
import "./cleaner.scss";
import {appendTodoList, cleanList} from "./dommanipulation";
import ToDo from "./todos";

// const content = document.querySelector("#content");
// const dededede = new ToDo("clear room", "ded","De","d","dede");
// dededede.displayDetails()

const todoList = document.querySelector("#todo-list");

cleanList(todoList);


// function keyPressed()

// function addNewToDos(){
//     while (true){
//         //Write todos until

//         if (keyPressed("Enter")){
//             continue
//         } else if (keyPressed("shift-Enter")){
//             break
//         }
//     }
// }


appendTodoList("Get groceries and walk the dog on the way to the vet where I would like to work at someday", todoList);
appendTodoList("Add soup", todoList);
appendTodoList("Get delivery", todoList);

