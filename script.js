'use strict'
window.addEventListener('DOMContentLoaded',() =>{
    const addForm = document.querySelector('.app__content form'),
        $addInput = addForm.querySelector(`#input`),
        taskList = document.querySelector('.content__list'),
        $clearBtn = document.querySelector('#clear-btn');
    const taskAmount = document.querySelector('#amount');

    const MAX_TASKS = 10;
    const LOCAL_STORAGE_KEY = 'taskDB';
    const taskDB =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    let amount = taskDB.length || 0;

    addForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        const newTask = $addInput.value;
        if (newTask && newTask.trim()){
            addNewElement(newTask, taskList);
        }
        event.target.reset();
    });

    $clearBtn.addEventListener('click', deleteAllTasks);


    function displayTasksFromLocalStorage() {
        taskDB.forEach((task) => {
            taskList.insertAdjacentHTML('beforeend', task);
        });
    }

    displayTasksFromLocalStorage();

    function addNewElement(task, parent){
        if(amount < MAX_TASKS) {
            const date = new Date();
            const element = `<li class="content__list-item">
                <span>${task}</span>
                <span class = "delete" data-index="${amount}"></span>
                <span class="time-create">${date.toDateString()}</span></span>
                <span class="complete"></span>
            </li>
            <hr>`;

            amount++;
            taskDB.push(element);
            parent.insertAdjacentHTML('beforeend', element);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskDB));
            changeTaskAmount();
        }
        else {
            alert("You can add only 10 tasks");
        }
    }

    function deleteParentElement(event){

        if (event.target.classList.contains('delete')){
            event.target.parentElement.nextElementSibling?.remove();
            event.target.parentElement?.remove();
            const index = +event.target.dataset.index;
            taskDB.splice(index, 1);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskDB));
            document.querySelectorAll('.delete').forEach((item, i) => item.dataset.index = i);
            amount--;
            changeTaskAmount()
        }

    }

    taskList.addEventListener('click', deleteParentElement);


    taskList.addEventListener('click', toggleTask);
    function toggleTask(event) {
        if (event.target.classList.contains('complete')) {
            const taskMsg = event.target.parentElement.firstElementChild.textContent;
            const dateMsg = event.target.previousElementSibling.textContent;
            const index = +event.target.previousElementSibling.previousElementSibling.dataset.index;
            const isComplete = event.target.classList.contains('incomplete');
            const completeClass = isComplete ? '' : 'incomplete';
            const taskHTML = `<li class="content__list-item ${completeClass}">
                        <span>${taskMsg}</span>
                        <span class="delete" data-index="${index}"></span>
                        <span class="time-create">${dateMsg}</span>
                        <span class="complete ${completeClass}"></span>
                    </li>
                    <hr>`;

            taskDB[index] = taskHTML;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskDB));

            event.target.classList.toggle('incomplete');
            event.target.parentElement.classList.toggle('incomplete');
        }
    }

    function changeTaskAmount(){
        if (amount < MAX_TASKS && amount >= 0){
            taskAmount.innerText = `0${amount}`
        }
        else{
            taskAmount.innerText = amount;
        }
    }

    changeTaskAmount()
    function deleteAllTasks(){
        amount = 0
        taskDB.length = 0;
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        taskList.innerHTML = '';
        changeTaskAmount();
    }
});