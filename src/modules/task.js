const task = (function(title, description, dueDay, check, idOfProject){
    this.title = title;
    this.description = description;
    this.dueDay = dueDay;
    this.check = check;
    this.idOfProject = idOfProject;
    this.edit = function(title, description, dueDay, check){
        this.title = title;
        this.description = description;
        this.dueDay = dueDay;
        this.check = check;
    }
});
export default task;