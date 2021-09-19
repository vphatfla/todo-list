import { parseISO, format } from "date-fns";
import task from "./task";
import project from "./project";
import { getToday } from "./display";



// create, save and call project - projectList
// default 2 project: all TaskList vs todayTaskList
let allTaskList = new project('All Task List', 'All Task List Description');
let todayTaskList = new project('Today Task List', 'Task List for Today');

let projectList = [];
projectList.push(allTaskList);
projectList.push(todayTaskList);

export function createProject(title, description){
    let newProject = new project(title, description);
    
    saveProject(newProject);
    
}
export function saveProject(project){
    let name = project.title;

    projectList = getProjectList();
    projectList.push(project);
    saveProjectList(projectList);

    localStorage.setItem(name, JSON.stringify(project)); 
}

export function getProject(project){
    let name =project.title;
    return JSON.parse(localStorage[name]);
}

export function saveProjectList(projectList){
    localStorage.setItem('projectList', JSON.stringify(projectList));
}

export function getProjectList(){
    try {
        return JSON.parse(localStorage['projectList']);    
    } catch (error) {
        console.log('error');
        saveProjectList(projectList);
        return JSON.parse(localStorage['projectList']);    
    }
    
}
// function set today list project
export function setTodayTask(){
    let today = getToday();
    let projectList = getProjectList();
    // clear today task
    projectList[1].taskOfThis = [];
    // get all tasks of All Task 
    let allTaskArray = projectList[0].taskOfThis;

    for (let i=0; i< allTaskArray.length; i++){
        let dueDay = format(parseISO(allTaskArray[i].dueDay), 'MM/dd/yyyy');
        // push task with the same day to today task list
        if (dueDay == today) projectList[1].taskOfThis.push(allTaskArray[i]);
    }

    saveProjectList(projectList);

}
// function remove Task 
export function removeTaskFromProject(idOfProject, indexofTaskInArray){
    let projectList = getProjectList();
    // get task information to delete in other project
    let titleOfTargetTask = projectList[idOfProject].taskOfThis[indexofTaskInArray].title;
    let dueDayOfTargetTask = projectList[idOfProject].taskOfThis[indexofTaskInArray].dueDay;
    
    projectList[idOfProject].taskOfThis.splice(indexofTaskInArray,1);
    
    // check other project
    for (let i = 0; i<projectList.length; i++){
        let taskArray = projectList[i].taskOfThis;
        for (let j = 0; j<taskArray.length; j++){
            if (taskArray[j].title == titleOfTargetTask && taskArray[j].dueDay == dueDayOfTargetTask){
                taskArray.splice(j,1);
                break;
            }
        }
    }
    saveProjectList(projectList);
}
// function remove project
export function deleteProject(idOfProject){
    let projectList = getProjectList();
    projectList.splice(idOfProject,1);
    saveProjectList(projectList);
}
// remove everything but the first 2 project
export function removeEveryButTwo(){
    projectList = getProjectList();
    projectList.splice(2, projectList.length-2);
    saveProjectList(projectList);
}
// get a project id object from its title
function projectFromTitle(title){
    projectList = getProjectList();
    for (let i = 0; i<projectList.length; i++){
        if (projectList[i].title == title) {
            return i;
        }
    }
    return false;
}
// create task

export function createTask(title, description, dueDay, check, projectId){
    projectList = getProjectList();
    let projectBelong = projectList[projectId];
    
    let newTask = new task(title, description, dueDay, check, projectId);

    
    projectBelong.taskOfThis.push(newTask);
    // sort
    sortTaskBasedOnDueDay(projectBelong.taskOfThis);
    // save to todaytaskList and all taskList
    if (projectId != [0]) {
        projectList[0].taskOfThis.push(newTask);
        sortTaskBasedOnDueDay(projectList[0].taskOfThis);
    }
    

    saveProjectList(projectList);
}
// sort task based on dueday
function sortTaskBasedOnDueDay(taskArray){
    for (let i = 0; i<taskArray.length-1; i++){
        for (let j = i+1; j<taskArray.length; j++)
            if (taskArray[i].dueDay > taskArray[j].dueDay){
                
                let terminal = taskArray[i];
                taskArray[i] = taskArray[j];            
                taskArray[j] = terminal;
        }
    }
}
export function editTask(idOfProject, indexOfTaskInArray, title, description, dueDay, check){
    let projectList = getProjectList();
    let taskEdit = projectList[idOfProject].taskOfThis[indexOfTaskInArray];
    taskEdit.title = title;
    taskEdit.description = description;
    taskEdit.dueDay = dueDay;
    taskEdit.check = check;
    saveProjectList(projectList);
}
export function saveCheckBoxTask(idOfProject, indexOfTaskInArray, valueOfCheckBox){
    projectList = getProjectList();
    let taskArray = projectList[idOfProject].taskOfThis;
    taskArray[indexOfTaskInArray].check = valueOfCheckBox;
    saveProjectList(projectList);
}
