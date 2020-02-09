//Integración
const tasks = [];
const ulElement = document.getElementById('list');
const inputElement = document.getElementById('input');
const inputDate = document.getElementById('date');
const addButton = document.getElementById('addButton');
const log = {
    lastSort: '',
}
addButton.addEventListener('click', (e) => {
    addToDo(tasks, inputElement, inputDate, ulElement);
    document.getElementById('input').value= '';
});