

export class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export class TodoList{
    constructor(projectName, projectListArray){
        this.projectName = projectName;
        this.projectListArray = projectListArray;
    }
}









