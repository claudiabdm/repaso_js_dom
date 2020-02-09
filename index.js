// CHECK INPUT
function checkInput(inputElement) {
    if (inputElement.value === '') {
        alert('Empty input, please write a task.');
        return false;
    }
    return true;
}

function checkInputDate(inputDate) {
    if (inputDate.value === '') {
        alert('Empty date, please select a date.');
        return false;
    }
    return true;
}

// SORT ARRAY

function sortAbcArr(tasks) {
    tasks.sort((a, b) => a.text > b.text);
}

function sortCbaArr(tasks) {
    tasks.sort((a, b) => a.text < b.text);
}

function sortDaysLess(tasks) {
    tasks.sort((a, b) => a.end - b.end);
}

function sortDaysMore(tasks) {
    tasks.sort((a, b) => b.end - a.end);
}

// PAINT IN HTML
function pintar(ulElement, tasks) {

    // remove all children from ul dom element
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }

    // sort array by the last sorting function used
    switch (log.lastSort) {
        case 'sortAbcArr':
            sortAbcArr(tasks);
            break;
        case 'sortCbaArr':
            sortCbaArr(tasks);
            break;
        case 'sortDaysLess':
            sortDaysLess(tasks);
            break;
        case 'sortDaysMore':
            sortDaysMore(tasks);
            break;
        default:
            break;
    }

    tasks.forEach(elem => {

        // paint only if elem is visible
        if (elem.visible === true) {
            const li = document.createElement('li');
            const text = document.createTextNode(` ${elem.text}`);
            const date = document.createTextNode(` ${elem.end.locale('es').format('dddd')}, ${elem.end.locale('es').format('D')} de ${elem.end.locale('es').format('MMMM')} de ${elem.end.locale('es').format('YYYY')}`);
            const days = document.createTextNode(` ${elem.end.diff(moment(), 'days') + 1} días `);
            li.appendChild(text);
            li.appendChild(date);
            li.appendChild(days);
            li.appendChild(addEditBtnElement());
            li.appendChild(addDeleteBtnElement());
            li.appendChild(addDoneBtnElement());
            li.classList.add("task");
            li.setAttribute("data-list-id", elem.id); // to link dom element and array element
            ulElement.appendChild(li);
        }
    })
}

// ADD TO ARRAY
function addToDo(tasks, inputElement, inputDate, ulElement) {

    if (checkInput(inputElement) && checkInputDate(inputDate)) {
        const text = inputElement.value;
        const date = new Date(inputDate.value);

        tasks.push({
            id: tasks.length,
            text: text,
            end: moment(date),
            visible: true
        })

        pintar(ulElement, tasks);
    }
}

// MODIFY TASK BUTTONS 
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
    saveBtnNode.addEventListener('click', saveElement);
    saveBtnNode.setAttribute('id', 'saveBtn');
    return saveBtnNode;
}

function deleteElement(e) {
    // Remove from array
    const idLi = e.currentTarget.parentElement.getAttribute('data-list-id'); // gets list id from DOM element (see pintar())
    const idxLi = tasks.findIndex(elem => elem.id.toString() === idLi); // find index in toDo array where IDs from array obj (elem.id) and dom elem (liId) are the same
    tasks.splice(idxLi, 1); //remove element in that index
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
    input.setAttribute('id', 'inputEdit');
    input.addEventListener('keydown', saveTodoOnEnter); // with this input we can press enter to click on guardar
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
    if (checkInput(input)) {
        // Modify elem.text
        const idLi = e.currentTarget.parentElement.getAttribute('data-list-id'); // gets list id from DOM element (see pintar())
        const idxLi = tasks.findIndex(elem => elem.id.toString() === idLi); // find index in toDo array where IDs from array obj (elem.id) and dom elem (liId) are the same
        tasks[idxLi].text = text.textContent; //modify element property text with new input in that index
        // .Modify elem.text
        li.insertBefore(text, input);
        li.insertBefore(date, input);
        li.insertBefore(days, input);
        li.removeChild(input);
        li.insertBefore(btnEdit, btnSave);
        li.removeChild(btnSave);
    }
}

// BUTTONS SORT TASK


// Alphabetic order
function sortAbc(e) {
    if (abcBtn.textContent === '(A-Z)') {
        sortAbcArr(tasks);
        log.lastSort = 'sortAbcArr';
        abcBtn.textContent = '(Z-A)';
    } else {
        sortCbaArr(tasks);
        log.lastSort = 'sortCbaArr';
        abcBtn.textContent = '(A-Z)';
    }

    pintar(ulElement, tasks)
}

const abcBtn = document.getElementById('textOrderAbc');
abcBtn.addEventListener('click', sortAbc);

// Days left order
function sortDaysLeft(e) {
    if (daysLeftBtn.textContent === 'Prioritarios primero') {
        sortDaysLess(tasks);
        log.lastSort = 'sortDaysLess';
        daysLeftBtn.textContent = 'Prioritarios después';
    } else {
        sortDaysMore(tasks);
        log.lastSort = 'sortDaysMore';
        daysLeftBtn.textContent = 'Prioritarios primero';
    }

    pintar(ulElement, tasks)
}

const daysLeftBtn = document.getElementById('textOrderDays');
daysLeftBtn.addEventListener('click', sortDaysLeft);


// Default order
function sortDefault(e) {
    tasks.sort((a, b) => a.id - b.id);
    pintar(ulElement, tasks)
}

const defaultBtn = document.getElementById('textOrderId');
defaultBtn.addEventListener('click', sortDefault);

// FILTER TASKS

function filterTxt(e) {
    const input = e.currentTarget.value;
    tasks.forEach(elem => {
        const text = elem.text.replace(/^\s+/g, ''); //remove all white spaces at start
        const regex = new RegExp(`^${input}`, 'g');
        if (!regex.test(text)) {
            elem.visible = false;
        } else {
            elem.visible = true;
        }
    })
    pintar(ulElement, tasks);
}

const inputFilter = document.getElementById('textFilter');
inputFilter.addEventListener('keyup', filterTxt);


function filterDays(e) {
    const input = e.currentTarget.value;

    // if input for days is empty, make all li visible, if not then show elements that meet the condition
    if (input === '') {
        tasks.map(elem => elem.visible = true);
    } else {
        tasks.forEach(elem => {
            const daysLeft = elem.end.diff(moment(), 'days');
            if (daysLeft < parseInt(input)) {
                elem.visible = true;
            } else {
                elem.visible = false;
            }
        })
    }

    pintar(ulElement, tasks);
}

const daysFilter = document.getElementById('dateFilter');
daysFilter.addEventListener('keyup', filterDays);

// PRESS KEY

function addTodoOnEnter(e) {
    if (e.keyCode === 13) {
        addToDo(tasks, inputElement, inputDate, ulElement);
        document.getElementById('input').value = '';
    }
}

inputElement.addEventListener('keydown', addTodoOnEnter);
inputDate.addEventListener('keydown', addTodoOnEnter);

function saveTodoOnEnter(e) {
    if (e.keyCode === 13) {
        document.getElementById('saveBtn').click();
    }
}
