// select items
const grocery = document.getElementById('item-input');
const groceryList = document.getElementById('grocery-list');
const foodItem = document.getElementsByClassName('title');

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

// event listeners
submitBtn.addEventListener("click", addItem);


// functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value !== '' && editFlag === false) {
        console.log('add');
    } else if (value !== '' && editFlag === true ) {
        console.log('editing');
    } else {
        console.log('empty');
    }
}

// local stoage

// setup items