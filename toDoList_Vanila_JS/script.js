const addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    toDo = document.querySelector('.todo')


let toDoList = []

if (localStorage.getItem('tasker')) {
    toDoList = JSON.parse(localStorage.getItem('tasker'))
    displayMEssages(toDoList)
}

addButton.addEventListener('click', () => {
    if (!addMessage.value) return;
    let newTask = {
        task: addMessage.value,
        checked: false,
        important: false
    }

    toDoList.push(newTask)
    displayMEssages(toDoList)
    localStorage.setItem('tasker', JSON.stringify(toDoList))
    addMessage.value = ''
})

function displayMEssages(listOfTasks) {
    let displayMessage = ''
    listOfTasks.forEach((elem, index) => {
        displayMessage += `
        <li>
            <input type="checkbox" id='item_${index}' ${elem.checked ? 'checked' : ''}>
            <label for="item_${index}" class="${elem.important ? 'important':''}">${elem.task}</label>
        </li>
        `;
        toDo.innerHTML = displayMessage;
    })

    if (listOfTasks.length === 0) toDo.innerHTML = ''

}

toDo.addEventListener('change', (e) => {
    let idInput = e.target.getAttribute('id')
    let forLable = toDo.querySelector('[for=' + idInput + ']')
    let valueLable = forLable.innerHTML;
    console.log(valueLable);
    console.log(toDoList);

    toDoList.forEach((item) => {
        if (item.task === valueLable) {

            item.checked = !item.checked
            localStorage.setItem('tasker', JSON.stringify(toDoList))
        }

    })
    //let idInput = document.querySelector()
})

toDo.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();

    toDoList.forEach((item, index) => {
        if (item.task === ev.target.innerHTML) {

            if (ev.ctrlKey || ev.metaKey) {
                toDoList.splice(index, 1);

                console.log(toDoList);
            } else item.important = !item.important;
            displayMEssages(toDoList);
            localStorage.setItem('tasker', JSON.stringify(toDoList))
        }

    })
})