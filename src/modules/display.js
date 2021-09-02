import { getProjectList } from "./storage";


function display(){
    loadProject();
    displayTask(0);
}

function loadProject(){
    let projectList = getProjectList();
    const ctn = document.createElement('div');
    ctn.classList.add('project');

    for (let i = 0; i<projectList.length; i++){
        let project = document.createElement('a');
        project.innerHTML = projectList[i].title;
        project.setAttribute('id', i);
        if (i==0) project.classList.add('active');
        ctn.appendChild(project);
    }
    
    const content = document.querySelector('.content');
    content.appendChild(ctn);
}

function displayTask(id){
    let projectList = getProjectList();
    let project = projectList[id];

    const ctn = document.createElement('div');
    ctn.classList.add('task');

    let taskArray = project.taskOfThis;

    for (let  i = 0; i<taskArray.length; i++){
        let task = document.createElement('a');
        task.innerHTML = taskArray[i].title;
        task.setAttribute('id', task.index);
        
        ctn.appendChild(task);
    }
    const content = document.querySelector('.content');
    content.appendChild(ctn);
}
export default display;