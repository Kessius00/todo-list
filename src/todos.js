export class Task{
    constructor(title, dueDate, priority){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export class TodoList{
    constructor(projectName, projectArray, projectActive){
        this.projectName = projectName;
        this.projectArray = projectArray;
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
        this.projectArray.sort(this.sortFunction);
    }

    appendProjectList(taskObject){
        this.projectArray.push(taskObject);
        this.sortProjectList();
    }
}






