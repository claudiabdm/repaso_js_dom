// var arrTasks = []; Esto era para la Iteración 1
var toDo = [];
const ul = document.getElementById('list');

// PAINT LIST
function pintar(arr) {

    // makes ul list empty by deleting children
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    // paints tasks
    arr.forEach(elem => {
        const li = document.createElement('li');
        const text = document.createTextNode(` ${elem.text} `);
        const date = document.createTextNode(` ${elem.end.locale('es').format('LLLL')} `);
        const days = document.createTextNode(` ${elem.end.diff(moment(), 'days')} días`);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(days);
        li.appendChild(addEditBtnElement());
        li.appendChild(addDeleteBtnElement());
        li.appendChild(addDoneBtnElement());
        li.classList.add("task");
        li.setAttribute("data-list-id", elem.id); // to link dom element and array element
        ul.appendChild(li);
    })
}

// BUTTONS TASK ACTIONS
function addToDo() {
    const input = document.getElementById('input');
    const endDate = new Date(document.getElementById('date').value);
    const nameTask = input.value;

    // add task obj to TODO array
    toDo.push({
        id: toDo.length,
        text: nameTask,
        end: moment(endDate),
        visible: true
    })

    pintar(toDo);
}

function addDeleteBtnElement() {
    const deleteNode = document.createElement('button');
    deleteNode.appendChild(document.createTextNode('Borrar'));
    deleteNode.addEventListener('click', deleteElement, {
        once: true
    })
    return deleteNode;
    // return document.createElement('button').appendChild(document.createTextNode('Borrar'));
}

function addEditBtnElement() {
    const editNode = document.createElement('button');
    editNode.appendChild(document.createTextNode('Editar'))
    editNode.addEventListener('click', editElement, {
        once: true
    });
    return editNode;
}

function addDoneBtnElement() {
    const doneBtnNode = document.createElement('button');
    doneBtnNode.appendChild(document.createTextNode('Done'));
    doneBtnNode.addEventListener('click', doneElement, {
        once: true
    });
    return doneBtnNode;
}

function addSaveBtnElement() {
    const saveBtnNode = document.createElement('button');
    saveBtnNode.appendChild(document.createTextNode('Guardar'));
    saveBtnNode.addEventListener('click', saveElement, {
        once: true
    });
    return saveBtnNode;
}

function deleteElement(e) {
    // Remove from array
    const idLi = e.currentTarget.parentElement.getAttribute('data-list-id'); // gets list id from DOM element (see pintar())
    const idxLi = toDo.findIndex(elem => elem.id.toString() === idLi); // find index in toDo array where IDs from array obj (elem.id) and dom elem (liId) are the same
    toDo.splice(idxLi, 1); //remove element in that index
    // Remove from DOM
    list.removeChild(e.currentTarget.parentElement);
}

function doneElement(e) {
    e.currentTarget.parentElement.classList.add('task--done');
    e.currentTarget.parentElement.removeChild(e.currentTarget)
}

function editElement(e) {
    const li = e.target.parentElement;
    const liText = li.childNodes[0];
    const btnEdit = li.childNodes[3];
    const btnSave = addSaveBtnElement();
    const input = document.createElement('input');
    input.setAttribute("id", "inputEdit");
    input.value = liText.textContent;
    li.removeChild(liText);
    li.removeChild(btnEdit);
    li.prepend(btnSave);
    li.prepend(input);
}

function saveElement(e) {
    const li = e.target.parentElement;
    const input = li.childNodes[0];
    const inputValue = input.value;
    const btnSave = li.childNodes[1];
    const btnEdit = addEditBtnElement();
    const text = document.createTextNode(inputValue);
    const date = li.childNodes[2];
    const days = li.childNodes[3];
    // Modify elem.text
    const idLi = e.currentTarget.parentElement.getAttribute('data-list-id'); // gets list id from DOM element (see pintar())
    const idxLi = toDo.findIndex(elem => elem.id.toString() === idLi); // find index in toDo array where IDs from array obj (elem.id) and dom elem (liId) are the same
    toDo[idxLi].text = text.textContent; //modify element property text with new input in that index
    // .Modify elem.text
    li.insertBefore(text, input);
    li.insertBefore(date, input);
    li.insertBefore(days, input);
    li.removeChild(input);
    li.insertBefore(btnEdit, btnSave);
    li.removeChild(btnSave);
}

// BUTTONS SORT TASK

// Alphabetic order
function sortAbc(e) {
    if (abcBtn.textContent === '(A-Z)') {
        toDo.sort((a, b) => a.text > b.text);
        abcBtn.textContent = '(Z-A)';
    } else {
        toDo.sort((a, b) => a.text < b.text);
        abcBtn.textContent = '(A-Z)';
    }
    pintar(toDo)
}

const abcBtn = document.getElementById('textOrderAbc');
abcBtn.addEventListener('click', sortAbc);

// Days left order
function sortDaysLeft(e) {
    if (daysLeftBtn.textContent === 'Prioritarios primero') {
        toDo.sort((a, b) => a.end - b.end);
        daysLeftBtn.textContent = 'Prioritarios después';
    } else {
        toDo.sort((a, b) => b.end - a.end);
        daysLeftBtn.textContent = 'Prioritarios primero';
    }
    pintar(toDo)
}

const daysLeftBtn = document.getElementById('textOrderDays');
daysLeftBtn.addEventListener('click', sortDaysLeft);


// Default order
function sortDefault(e) {
    toDo.sort((a, b) => a.id - b.id);
    pintar(toDo)
}

const defaultBtn = document.getElementById('textOrderId');
defaultBtn.addEventListener('click', sortDefault);

// FILTER TASKS

function filterTxt(e) {
    const input = e.currentTarget.value;
    toDo.forEach(elem => {
        const text = elem.text.replace(/^\s+/g, ''); //remove all white spaces at start
        const regex = new RegExp(`^${input}`, 'g');
        if (!regex.test(text)) {
            elem.visible = false;
        } else {
            elem.visible = true;
        }
    })
    pintar(toDo.filter(elem => elem.visible === true));
}

const inputFilter = document.getElementById('textFilter');
inputFilter.addEventListener('keyup', filterTxt);


function filterDays(e) {
    const input = parseInt(e.currentTarget.value);
    toDo.forEach(elem => {
        const daysLeft = elem.end.diff(moment(), 'days');
        if (daysLeft <= input) {
            elem.visible = true;
        } else {
            elem.visible = false;
        }
    })
    input === '' ? pintar(toDo) : pintar(toDo.filter(elem => elem.visible === true));

}

const daysFilter = document.getElementById('dateFilter');
daysFilter.addEventListener('keyup', filterDays);

// PRESS KEY

function addTodoOnEnter(e) {
    if (e.keyCode === 13) {
        addToDo();
    }
}

document.getElementById('input').addEventListener('keydown', addTodoOnEnter);
document.getElementById('date').addEventListener('keydown', addTodoOnEnter);
document.getElementById('textFilter').addEventListener('keydown', addTodoOnEnter);
document.getElementById('dateFilter').addEventListener('keydown', addTodoOnEnter);