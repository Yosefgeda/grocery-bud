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



const addItem = (e) => {
    e.preventDefault();

    const value = grocery.value;
    
    if( value && !editFlag ){

    } else if( value && editFlag) {

    } else {
        displaAlert('please enter an item', 'alert-danger')
    }
    
}

const displaAlert = (alertMsg, action) => {
    alertContainer.textContent = alertMsg;
    alert.classList = action;

    setTimeout(() => {
        alertContainer.textContent = '';
        alert.classList.add(action);
    }, 1000);
}

form.addEventListener('submit', addItem);