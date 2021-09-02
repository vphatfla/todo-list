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
    saveProject(newProject);
    saveProjectList(projectList);
}
export function saveProject(project){
    let name = project.title;

    projectList.push(project);

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
export function removeTaskFromProject(index){
    for (let i = 0; i< projectList.length; i++){
        projectList[i].removeTask(index);
        console.log(projectList[i]);
    }
    saveProjectList(projectList);
}
// function remove project
export function removeProject(title){
    if (projectFromTitle(title) == false) return console.log('false infor');
    projectList.splice(projectFromTitle,1);
    saveProjectList(projectList);
}
// get a project id object from its title
function projectFromTitle(title){
    for (let i = 0; i<projectList.length; i++){
        if (projectList[i].title == title) {
            return i;
        }
    }
    return false;
}
// create task
let index = 0;
export function createTask(title, description, dueDay, check, projectTitle){
    projectList = getProjectList();
    let projectBelong = projectList[projectFromTitle(projectTitle)];
    if (projectBelong == false){
        return console.log('false return project');
    }
    let newTask = new task(index, title, description, dueDay, check);
    index++; //index is a unique number identify task
    if (projectBelong.title != allTaskList.title && projectBelong.title != todayTaskList.title){
        projectBelong.taskOfThis.push(newTask);
        //saveProject(projectBelong);
    }
    // save to todaytaskList and all taskList
    projectList[0].taskOfThis.push(newTask);
    projectList[1].taskOfThis.push(newTask);
    
    saveProjectList(projectList);
}