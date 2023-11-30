export class Task{
    constructor(title, dueDate, priority){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export class TodoList{
    constructor(projectName, projectListArray, projectActive){
        this.projectName = projectName;
        this.projectListArray = projectListArray;
        this.projectActive = projectActive;
    }

    sortFunction(x,y){
        if (x.priority > y.priority) {
            return 1;
        }
        if (x.priority < y.priority) {
            return -1;
        }
            return 0;
    }

    sortProjectList(){
        this.projectListArray.sort(this.sortFunction);
    }

    appendProjectList(taskObject){
        this.projectListArray.push(taskObject);
        this.sortProjectList();
    }
}









