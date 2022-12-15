'use strict'
window.addEventListener('DOMContentLoaded',() =>{
    const addForm = document.querySelector('.app__content form'),
        $addInput = addForm.querySelector(`#input`),
        taskList = document.querySelector('.content__list'),
        taskItem = document.querySelectorAll(".content__list-item"),
        $clearBtn = document.querySelector('#clear-btn');

    let amount = 0;

    addForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        const newTask = $addInput.value;
        if (newTask && newTask.trim()){
            addNewElement(newTask, taskList);
        }

        event.target.reset();
    });

    $clearBtn.addEventListener('click', deleteAllTasks);



function addNewElement(task, parent){
    if(amount < 10) {
        parent.innerHTML += `
    <li class="content__list-item">
         <span>${task}</span>
         <span class = "delete"></span>
         <span class="complete"></span>
    </li>
    <hr>
    `;

        amount++;

        document.querySelectorAll(`.delete`).forEach(item => {
            item.addEventListener(`click`, () => {
                item.parentElement.nextElementSibling.remove();
                item.parentElement.remove();
                amount--;
            });
        })

        document.querySelectorAll(`.complete`).forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('incomplete');
                item.parentElement.classList.toggle(`incomplete`)
            });
        })
    }
    else {
        alert("Можно добавить всего 10 тасков");
    }
}

function deleteAllTasks(){
    amount = 0;
    taskList.innerHTML = '';
}
});