const task = (function(index, title, description, dueDay, check){
    this.index = index;
    this.title = title;
    this.description = description;
    this.dueDay = dueDay;
    this.check = check;

    this.edit = function(title, description, dueDay, check){
        this.title = title;
        this.description = description;
        this.dueDay = dueDay;
        this.check = check;
    }
});
export default task;