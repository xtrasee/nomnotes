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

// ********* FUNCTIONS *******
// items
submitBtn.addEventListener("click", addItem);
// clear btn
clearBtn.addEventListener('click', clearItems);


// functions
function addItem(e) {
    e.preventDefault();
    console.log('hi');
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value !== '' && editFlag === false) {
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
        container.classList.add('show-container');

        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

    } else if (value !== '' && editFlag === true ) {
        console.log('editing');
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
}

// delete function
function deleteItem() {
    
    console.log('item deleted');
}

function editItem() {
    console.log('item editd');
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// local stoage
function addToLocalStorage(id, value) {
    console.log('add to local');
}
// setup items