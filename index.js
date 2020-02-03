var arrTasks = [];
var toDo = [];

// PAINT LIST
function pintar() {

    const ul = document.getElementById('list');

    // makes ul list empty by deleting children
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    // paints tasks
    toDo.forEach(elem => {
        const li = document.createElement('li');
        const text = document.createTextNode(`${elem.text}`);
        const date = document.createTextNode(`${elem.end.locale('es').format('LL')} ${elem.end.diff(moment(), 'days')} días`);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(addEditBtnElement());
        li.appendChild(addDeleteBtnElement());
        li.appendChild(addDoneBtnElement());
        li.classList.add("task");
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

    pintar();
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
    const liTxt = e.currentTarget.parentElement.firstChild.textContent;
    const idxLi = toDo.findIndex(elem => elem.text === liTxt);
    toDo.splice(idxLi, 1);
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
    const btnEdit = li.childNodes[1];
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
    li.insertBefore(text, input);
    li.removeChild(input);
    li.insertBefore(btnEdit, btnSave);
    li.removeChild(btnSave);
}

function addTodoOnEnter(e) {
    if (e.keyCode === 13) {
        addToDo();
    }
}

input.addEventListener('keydown', addTodoOnEnter);

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
   pintar()
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
   pintar()
}

const daysLeftBtn = document.getElementById('textOrderDays');
daysLeftBtn.addEventListener('click', sortDaysLeft);


// Default order
function sortDefault(e) {
    toDo.sort((a, b) => a.id - b.id);
    pintar() 
}

const defaultBtn = document.getElementById('textOrderId');
defaultBtn.addEventListener('click', sortDefault);