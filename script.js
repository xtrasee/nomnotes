// select items
const grocery = document.getElementById('item-input');
const groceryList = document.getElementById('grocery-list');
const container = document.querySelector('.container');

// buttons
const submitBtn = document.querySelector('.submit-btn');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const clearBtn = document.querySelector('.clear-btn');
const done = document.querySelector('.finish-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ********* EVENT LISTENERS *******
// items
submitBtn.addEventListener("click", addItem);
// clear btn
clearBtn.addEventListener('click', clearItems);
// load items
window.addEventListener('DOMContentLoaded', setupItems);


// functions
function addItem(e) {
    e.preventDefault();
    console.log('hi');
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value !== '' && editFlag === false) {
        container.classList.add('show-container');
        createListItem(id, value);
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

    } else if (value !== '' && editFlag === true ) {
        editElement.innerHTML = value;
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        console.log('empty');
    }
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            groceryList.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    groceryList.removeChild(element);
    if (groceryList.length === 0) {
        container.classList.remove('show-container');
    }
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit';
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// local stoage
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}

// setup items
function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}

function createListItem(id, value) {
    const element = document.createElement('li');
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    
    element.innerHTML =
    `
    <input type = "checkbox">
    <p>${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
    `
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    // append child to list
    groceryList.appendChild(element);
}
