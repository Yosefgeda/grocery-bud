const alertContainer = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = "";


const displaAlert = (alertMsg, action) => {
    alertContainer.textContent = alertMsg;
    alertContainer.classList.add(`alert-${action}`);

    setTimeout(() => {
        alertContainer.textContent = '';
        alertContainer.classList.remove(`alert-${action}`);
    }, 2000);
}

const addItem = (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random()*10000);
    let value = grocery.value;
    
    if( value && !editFlag ){
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button class="edit-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-btn">
                    <i class="fa-solid fa-trash "></i>
                </button>
            </div>
        `;
       list.appendChild(element);

       const deleteBtn = element.querySelector('.delete-btn');
       const editBtn = element.querySelector('.edit-btn');

       deleteBtn.addEventListener('click', deleteItem);
       editBtn.addEventListener('click', editItem);

        addToLocalStorage(id, value);
        setBackToDefault();
        displaAlert('Item added successfuly', 'success');
        
    } else if( value && editFlag) {
        editElement.innerHTML = value;
        displaAlert('Value changed', 'success');
        editLocalStorage(editId, value);
        setBackToDefault();
    } else {
        displaAlert('please enter an item', 'danger');
    }
    
}

const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    displaAlert('item removed', 'success');
    setBackToDefault();
    removeFromLocalStorage(id);
}

const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    submitBtn.textContent = 'Edit';
    editId = element.dataset.id;
}

const clearItems = () => {
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0) {
        items.forEach(item => list.removeChild(item));
    };
}

const setBackToDefault = () => {
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'Submit';
}

const addToLocalStorage = (id, value) => {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    let item = items.filter(item => {
        return item.id !== id;
    });
    localStorage.setItem('list', JSON.stringify(item));
    console.log(item, items)
}

const editLocalStorage = (id, value) => {

}

const getLocalStorage = () => {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

clearBtn.addEventListener('click', clearItems);
form.addEventListener('submit', addItem);