
function pintar(ulElement, tasks) { 
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }

    tasks.forEach(elem => {
        const li = document.createElement('li');
        const text = document.createTextNode(elem.text);
        // const text = document.createTextNode(` ${elem.text} `);
        // const date = document.createTextNode(` ${elem.end.locale('es').format('LLLL')} `);
        // const days = document.createTextNode(` ${elem.end.diff(moment(), 'days')} días`);
        li.appendChild(text);
        // li.appendChild(date);
        // li.appendChild(days);
        // li.appendChild(addEditBtnElement());
        // li.appendChild(addDeleteBtnElement());
        // li.appendChild(addDoneBtnElement());
        li.classList.add("task");
        li.setAttribute("data-list-id", elem.id); // to link dom element and array element
        ulElement.appendChild(li);
    })
}

function addToDo(tasks, inputElement, ulElement) {
    const text = inputElement.value;

    tasks.push({
        id: tasks.length,
        text: text,
        end: new Date(),
        visible: true
    })

    pintar(ulElement, tasks);
}

function addDeleteBtnElement() {

}

function addEditBtnElement() {

}

function addDoneBtnElement() {

}

function addDoneBtnElement() {

}

function doneElement(e) {

}

function editElement(e) {

}

function saveElement(e) {

}

function addTodoOnEnter(e) {

}

