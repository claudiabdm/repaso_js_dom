//Integración
const tasks = [];
const ulElement = document.getElementById('list');
const inputElement = document.getElementById('input');
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', (e) => {
    addToDo(tasks, inputElement, ulElement);
});