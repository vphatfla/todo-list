const project = (function(title, description){
    this.title = title;
    this.description = description;

    this.taskOfThis = [];

    this.edit = function(title, description){
        this.title = title;
        this.description = description;
    }

    this.addTask = function(task){
        this.taskOfThis.push(task);
    }

    this.removeTask = function(indexOfTask){
        for (let i = 0; i<this.taskOfThis.length; i++){
            if (this.taskOfThis[i].index == indexOfTask) {
                this.taskOfThis.splice(i,1);
                break;
            }
        }
    }
    

});
export default project;