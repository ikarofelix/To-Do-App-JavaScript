const html = document
const toDoSection = html.querySelector("#to-do-section")

window.onload = renderList()

const body = html.body,
    form = html.querySelector("form"),
    input = html.querySelector("#to-do-input"),
    // list = html.querySelector(".list"),
    item = html.querySelectorAll(".item"),
    itemInfo = html.querySelectorAll(".item-info"),
    checkbox = html.querySelectorAll("#checkbox");



// itemInfo.addEventListener("click",()=>{
//     if(item.classList.contains("active")){
//         item.classList.remove("active")
//     } else{
//         item.classList.add("active")
//     }
// })


// savingto local Storage
// let str = element.querySelector("span").textContent
//         let index = Array.prototype.slice.call(itemInfo).indexOf(element)
//         saveToLocalStorage(str, index)


form.addEventListener("submit",()=>{
    let str = input.value
    // let index = Array.prototype.slice.call(itemInfo).indexOf(element)
    saveToLocalStorage(str, false)
})

itemInfo.forEach(element=>{
    element.addEventListener("click",()=>{
        let str = element.querySelector("span").textContent
        let index = Array.prototype.slice.call(itemInfo).indexOf(element)
        isChecked(element, index)
    })
})

function isChecked(element, index){
    let list = getLocalStorage()


    if (list[index].isChecked){
        list[index].isChecked = false
        element.querySelector("img").src = "./images/checkbox.svg"
        element.classList.remove("checked")
    } else{
        list[index].isChecked = true
        element.querySelector("img").src = "./images/checkbox-checked.svg"
        element.classList.add("checked")
    }

    // let a = []

    // list.filter(value=>value.isChecked===false).forEach(element=>{
    //     a.unshift(element)
    // })
    
    // list.filter(value=>value.isChecked).forEach(element=>{
    //     a.push(element)
    // })

    // localStorage.setItem("todo", JSON.stringify(a))

    localStorage.setItem("todo", JSON.stringify(list))

    console.log(a);
}

function saveToLocalStorage(str, boolean) {

    let list = getLocalStorage()
    list.push({ str:str, isChecked:boolean })

    localStorage.setItem("todo", JSON.stringify(list))
}

function getLocalStorage(){
    if (!JSON.parse(localStorage.getItem("todo"))){
        localStorage.setItem("todo", JSON.stringify([]))
    } else{
        return JSON.parse(localStorage.getItem("todo"))
    }
}

function renderList(){
    // Only renders the list if the localStorage has some value
    let todoList = []

    getLocalStorage().forEach(element=>{
        todoList.push(element)
    })

    let a = []

    todoList.filter(value=>value.isChecked===false).forEach(element=>{
        a.push(element)
    })
    
    todoList.filter(value=>value.isChecked).forEach(element=>{
        a.push(element)
    })

    // console.log(todoList.filter(value=>value.isChecked));

    // for (let i = 0; i<todoList.length; i++){
    //     let a = 0;
    //     if (todoList[i].isChecked){

    //     }
    // }

    if (todoList.length > 0){
        // Create the heading element
        const heading = document.createElement('h3');
        heading.textContent = 'To-Do List';
        toDoSection.appendChild(heading);

        // Create the container div for the to-do list
        const listContainer = document.createElement('div');
        listContainer.classList.add('list');

        todoList.forEach(element=>{
            const { str, isChecked } = element

            // Create the item div
            const itemDiv = document.createElement('div');
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
            pencilIconImg.src = './images/pencil.svg';
            pencilIconImg.alt = 'Pencil icon';
            pencilIconDiv.appendChild(pencilIconImg);
    
            // Create the trash icon div
            const trashIconDiv = document.createElement('div');
            const trashIconImg = document.createElement('img');
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


let test = [{str:"oi", isChecked:false},
{str:"oiiiiiii", isChecked:true},
{str:"tchau", isChecked:false},
{str:"oi", isChecked:true}]

// console.log(test.filter(
//     value => value.isChecked
// ));

console.log(test);

let a = []

console.log(a);

// test.splice(test.length, 1, test.filter(value=>value.isChecked))














// TRYING TO WORK WHEN ONE IS SELECTED, IT MUST GO TO THE END OF THE LIST
// IF UNSELECTED MUST GO TO THE TOP

// TRYING TO DO THAT IN THE ISCHECKED FUNCTION