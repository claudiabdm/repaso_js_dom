

function pintar(ulElement, tasks) { 

    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }

    tasks.forEach(elem => {
        const li = document.createElement('li');
        const text = document.createTextNode(` ${elem.text}`);
        const date = document.createTextNode(` ${elem.end.locale('es').format('dddd')}, ${elem.end.locale('es').format('D')} de ${elem.end.locale('es').format('MMMM')} de ${elem.end.locale('es').format('YYYY')}`);
        const days = document.createTextNode(` ${elem.end.diff(moment(), 'days') + 1} días `);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(days);
        // li.appendChild(addEditBtnElement());
        li.appendChild(addDeleteBtnElement());
        // li.appendChild(addDoneBtnElement());
        li.classList.add("task");
        li.setAttribute("data-list-id", elem.id); // to link dom element and array element
        ulElement.appendChild(li);
    })
}

function addToDo(tasks, inputElement, inputDate, ulElement) {
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

function addDeleteBtnElement() {
    const deleteNode = document.createElement('button');
    deleteNode.appendChild(document.createTextNode('Borrar'));
    deleteNode.addEventListener('click', deleteElement, {
        once: true
    })
    return deleteNode;
}

function addEditBtnElement() {

}

function addDoneBtnElement() {

}

function addDoneBtnElement() {

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

}

function editElement(e) {

}

function saveElement(e) {

}

function addTodoOnEnter(e) {

}

