import { saveProject, saveProjectList, getProject, getProjectList } from "./storage";
import task from "./task";
import project from "./project";



let index =0;
export function createNewTask(title, description, dueDay, check, projectBelong){
    let newTask = new task(index, title, description, dueDay, check);
    index++;
    projectBelong.taskOfThis.push(newTask);
    saveProject(projectBelong);
}

export function createNewProject(title, description){
    let projectList = getProjectList();
    let newProject = new project(title, description);
    saveProject(newProject);
    saveProjectList(projectList);
}