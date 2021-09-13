import { getProjectList } from "./storage";


export function display(){
    loadProject();
    displayTask(0);
}

function loadProject(){
    let projectList = getProjectList();
    const ctn = document.querySelector('.project');
    ctn.innerHTML = '';

    for (let i = 0; i<projectList.length; i++){
        let project = document.createElement('a');
        project.innerHTML = projectList[i].title;
        project.setAttribute('id', i);
        if (i==0) project.classList.add('active');
        ctn.appendChild(project);
    }
    const addProjectButton = document.createElement('button');
    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.classList.add('addProjectButton');
    ctn.appendChild(addProjectButton);

    const content = document.querySelector('.content');

    content.appendChild(ctn);
    //ctn is a project list, ctn is a add project button
    // will be display on the left of the container
}

export function displayTask(id){
    let projectList = getProjectList();
    let project = projectList[id];
    let ctn = document.querySelector('.task');
    ctn.innerHTML = '';

    let taskArray = project.taskOfThis;

    for (let  i = 0; i<taskArray.length; i++){
        let task = document.createElement('div');

        const p = document.createElement('p');
        p.innerHTML = `${taskArray[i].title}  ${taskArray[i].dueDay}`;

        const editButton = document.createElement('button');
        editButton.classList.add('editTaskButton');
        editButton.innerHTML = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteTaskButton');
        deleteButton.innerHTML = 'Delete';

        task.append(p, editButton, deleteButton);

        task.classList.add('task-item');
        // idOfProject identify which project the task belongs to
        task.setAttribute('idOfProject', id);
        task.setAttribute('indexOfTaskInArray', i);
        ctn.appendChild(task);
    }

    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('addTaskButton');
    addTaskButton.innerHTML = 'New Task';
    ctn.appendChild(addTaskButton);

    const content = document.querySelector('.content');
    content.appendChild(ctn);
}

export function updateProjectDom(){
    const ctn = document.querySelector('.project');
    
    



}