const html = document,
    toDoSection = html.querySelector("#to-do-section");

window.onload = renderList()

const body = html.body,
    form = html.querySelector("form"),
    input = html.querySelector("#to-do-input"),
    list = html.querySelector(".list"),
    itemInfo = html.querySelectorAll(".item-info"),
    editBtn = html.querySelectorAll("#edit"),
    deleteBtn = html.querySelectorAll("#delete");

// Calls for editItem passing the item index
editBtn.forEach(element=>element.addEventListener("click", ()=>{
    editItem(Array.prototype.slice.call(editBtn).indexOf(element))
}))

// Calls for deleteItem passing the item index
deleteBtn.forEach(element=>{
    element.addEventListener("click",()=>deleteItem(Array.prototype.slice.call(deleteBtn).indexOf(element)))
})

let edit = false,
    editIndex = 0;

function editItem(index){
    const list = getLocalStorage()
    input.value = list[index].str;
    edit = true
    editIndex = index
}

function deleteItem(index){
    const list = getLocalStorage()
    list.splice(index, 1)
    localStorage.setItem("todo", JSON.stringify(list))
    window.location.reload()
}

form.addEventListener("submit",()=>saveToLocalStorage(input.value, false))

// Calls for ischecked passing element and index
itemInfo.forEach(element=>{
    element.addEventListener("click",()=>{
        isChecked(element, Array.prototype.slice.call(itemInfo).indexOf(element))
        window.location.reload()
    })
})

function isChecked(element, index){
    const list = getLocalStorage()

    if (list[index].isChecked){
        element.querySelector("img").src = "./images/checkbox.svg"
        element.classList.remove("checked")
        changeLocalStorage(index, false)
    } else{
        element.querySelector("img").src = "./images/checkbox-checked.svg"
        element.classList.add("checked")
        changeLocalStorage(index, true)
    }
}

function saveToLocalStorage(str, boolean) {
    const list = getLocalStorage()
    if (edit){
        const itemToEdit = list[editIndex]
        itemToEdit.str = str.charAt(0).toUpperCase() + str.slice(1)
        list.splice(editIndex, 1)
        list.splice(editIndex, 0, itemToEdit)
    }else{
        list.unshift({ str:str.charAt(0).toUpperCase() + str.slice(1), isChecked:boolean })
    }
    localStorage.setItem("todo", JSON.stringify(list))
}

function changeLocalStorage(itemIndex, boolean){
    const todoList = getLocalStorage()
    if (boolean){
        let curItem = todoList[itemIndex]
        curItem.isChecked = true
        todoList.splice(itemIndex, 1)

        const index = todoList.indexOf(todoList.find(value=>value.isChecked))
        if (index === -1){
            todoList.push(curItem)
        } else{
            todoList.splice(index, 0, curItem)
        }
    } else{
        let curItem = todoList[itemIndex]
        curItem.isChecked = false
        todoList.splice(itemIndex, 1)
        todoList.splice(0, 0, curItem)
    }
    localStorage.setItem("todo", JSON.stringify(todoList))
}

function getLocalStorage(){
    if (!JSON.parse(localStorage.getItem("todo"))){
        localStorage.setItem("todo", JSON.stringify([]))
    } else{
        return JSON.parse(localStorage.getItem("todo"))
    }
}

function renderList(){
    const todoList = getLocalStorage()

    if (todoList.length > 0){
        // Create the heading element
        const heading = document.createElement('h3');
        heading.textContent = 'To-Do List';
        toDoSection.appendChild(heading);

        // Create the container div for the to-do list
        const listContainer = document.createElement('ul');
        listContainer.classList.add('list');

        // Rendering each element on the todoList
        todoList.forEach(element=>{
            const { str, isChecked } = element

            // Create the item div
            const itemDiv = document.createElement('li');
            itemDiv.classList.add('item');
    
            // Create the item-info div
            const itemInfoDiv = document.createElement('div');
            itemInfoDiv.classList.add('item-info');
    
            // Create the checkbox image
            const checkboxImg = document.createElement('img');
            checkboxImg.id = 'checkbox';
            if (isChecked){
                checkboxImg.src = './images/checkbox-checked.svg';
                itemInfoDiv.classList.add('checked')
            } else{
                checkboxImg.src = './images/checkbox.svg';
            }
            checkboxImg.alt = 'Checkbox';
    
            // Create the span element
            const spanElement = document.createElement('span');
            spanElement.textContent = str;
    
            // Append the checkbox and span to the item-info div
            itemInfoDiv.appendChild(checkboxImg);
            itemInfoDiv.appendChild(spanElement);
    
            // Create the options div
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
    
            // Create the pencil icon div
            const pencilIconDiv = document.createElement('div');
            const pencilIconImg = document.createElement('img');
            pencilIconDiv.id = "edit"
            pencilIconImg.src = './images/pencil.svg';
            pencilIconImg.alt = 'Pencil icon';
            pencilIconDiv.appendChild(pencilIconImg);
    
            // Create the trash icon div
            const trashIconDiv = document.createElement('div');
            const trashIconImg = document.createElement('img');
            trashIconDiv.id = "delete"
            trashIconImg.src = './images/trash.svg';
            trashIconImg.alt = 'Trash icon';
            trashIconDiv.appendChild(trashIconImg);
    
            // Append the pencil and trash icon divs to the options div
            optionsDiv.appendChild(pencilIconDiv);
            optionsDiv.appendChild(trashIconDiv);
    
            // Append the item-info and options divs to the item div
            itemDiv.appendChild(itemInfoDiv);
            itemDiv.appendChild(optionsDiv);
    
            // Append the item div to the list container div
            listContainer.appendChild(itemDiv);
    
            // Append the heading and list container div to the body of the HTML document
            toDoSection.appendChild(listContainer);
        })
    }
}