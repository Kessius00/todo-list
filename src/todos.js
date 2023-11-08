

export default class ToDo{
    constructor(title, description, dueDate, priority,checklist, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.timeOfCreation = new Date();
    }

    displayDetails(){
        console.log(`Title: ${this.title}, description: ${this.description}, due date: ${this.dueDate}, priority: ${this.priority}, made on ${this.timeOfCreation}`);
        return this.title,this.description,this.dueDate,this.priority
    }

    deadline(){
        let tool = (this.dueDate-this.description);
        return tool
    }
    
}


let thing = new ToDo("Wdw",new Date("2/2/2030"),new Date("2/1/2030"));

console.log("deadlinecheck: "+thing.deadline()/(1000*24*60*60));









