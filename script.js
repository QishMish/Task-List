
const addItemsActions = document.querySelector('.add-todo-action');
const input = document.querySelector('.add-input');
const submit = document.querySelector('.add-button');

const displayItemsActions = document.querySelector('.display-todo-action');
const lists = document.querySelector('.diplay-todo-list');
const clear = document.querySelector('.clear-todos');



submit.addEventListener('click', addItems)
document.addEventListener('DOMContentLoaded', displayStorage);
clear.addEventListener('click', removeItems);
lists.addEventListener('click', removeSingleItem);


function addItems(Event){

    Event.preventDefault();

    const value = input.value;

    if(value ===''){
        showAction(addItemsActions,'no item typed', false)
    }else{
        showAction(addItemsActions,`${value} added to the lists`, true);
        
        createItems(value);

        updateLocalStorage(value);


    }
}

function showAction(Element, text, value){
    if(value === true){
        Element.classList.add('success');
        Element.textContent = text;
        input.value = ''
        setTimeout(() => {
            Element.classList.remove('success');
        }, 3000);
    }else{
        Element.classList.add('error');
        Element.textContent = text;
        input.value = ''
        setTimeout(() => {
            Element.classList.remove('error');
        }, 3000);
    }
    

}


function createItems(value){
    let parent = document.createElement('div');
    parent.classList.add('todo-lists');

    parent.innerHTML =  `<h4 class="todo-items">${value}</h4>
    <a class="todo-list-link">
        <i class="far fa-trash-alt fa-lg"></i>
    </a>`
    lists.appendChild(parent);
    console.log(value)
}

function updateLocalStorage(value){
    

    let tasks;

    let exist = localStorage.getItem('tasks')

    if(exist === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(value)

    localStorage.setItem('tasks', JSON.stringify(tasks))

}


function displayStorage(){

    let exist = localStorage.getItem('tasks')

    if(exist){
        let localStorageItems = JSON.parse(localStorage.getItem('tasks'));

        localStorageItems.forEach((item)=>{
            createItems(item);
        })

    }

}

function removeItems(){

    localStorage.removeItem('tasks');

    let items = document.querySelectorAll('.todo-lists');

    console.log(items);

    if(items.length > 0){
        showAction(displayItemsActions,'All Items Deleted', false)
        items.forEach((el)=>{
            lists.removeChild(el);
        })
    }else{
        showAction(displayItemsActions,'No More Items Left', false)
    }

}

function removeSingleItem(e){

    let targetElement = e.target.parentElement;
    
    if(targetElement.classList.contains('todo-list-link')){
        

        text = e.target.parentElement.previousElementSibling.innerHTML;

        showAction(displayItemsActions,`${text} Deleted From The Lists`, false)

        lists.removeChild(targetElement.parentElement);
        
        removeFromLocalStorage(text);
    }

}

 
function removeFromLocalStorage(item){

    let tasks = JSON.parse(localStorage.getItem('tasks'))

    let index = tasks.indexOf(item);
    
    tasks.splice(index, 1)

    localStorage.removeItem('tasks');

    localStorage.setItem('tasks', JSON.stringify(tasks));

}