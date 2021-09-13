import { updateProjectDom } from "./display";
import task from "./task";
import project from "./project";



// create, save and call project - projectList
// default 2 project: all TaskList vs todayTaskList
let allTaskList = new project('All Task List', 'All Task List Description');
let todayTaskList = new project('Today Task List', 'Task List for Today');

let projectList = [];
projectList.push(allTaskList);
projectList.push(todayTaskList);

export function createProject(title, description){
    let newProject = new project(title, description);
    updateProjectDom(newProject);
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
    return JSON.parse(localStorage['projectList']);
}
// function remove Task 
export function removeTaskFromProject(idOfProject, indexofTaskInArray){
    let projectList = getProjectList();
    projectList[idOfProject].taskOfThis.splice(indexofTaskInArray,1);
    saveProjectList(projectList);
}
// function remove project
export function removeProject(title){
    projectList = getProjectList();
    if (projectFromTitle(title) == false) return console.log('false infor');
    projectList.splice(projectFromTitle,1);
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
    
    // save to todaytaskList and all taskList
    if (projectId != [0]) projectList[0].taskOfThis.push(newTask);
    
    
    saveProjectList(projectList);
}