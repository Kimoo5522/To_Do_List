let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// Create
let newToDo;
if (localStorage.ToDo != null) {
    newToDo = JSON.parse(localStorage.ToDo);
}else {
    newToDo = [];
}


submit.onclick = function () {
    let newObj = {
        title: title.value,
        date: date.value,
        description: description.value,
    }

    if(mood === "create"){
        newToDo.push(newObj);
        localStorage.setItem("ToDo", JSON.stringify(newToDo));
    } else{
        newToDo[tmp] = newObj; 
        mood = "create";
        submit.innerHTML = "Create";
    }
    

    clearData();
    showData();
}


function clearData() {
    title.value = "";
    date.value = "";
    description.value = "";
}


// Read
function showData() {
    table = "";
    for (let i = 0; i < newToDo.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${newToDo[i].title}</td>
        <td>${newToDo[i].date}</td>
        <td>${newToDo[i].description}</td>
        <td><button onclick = "updateData(${i})">Edit</button></td>
        <td><button onclick = "deleteData(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
}
showData();


// Delete
function deleteData(i){
    newToDo.splice(i, 1);
    localStorage.ToDo = JSON.stringify(newToDo);
    showData();
}


// Update
function updateData(i){
    title.value = newToDo[i].title;
    date.value = newToDo[i].date;
    description.value = newToDo[i].description;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


// Search 
function searchData(value){
    let table = "";
    for (let i = 0; i < newToDo.length; i++){
        if (newToDo[i].title.includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${newToDo[i].title}</td>
            <td>${newToDo[i].date}</td>
            <td>${newToDo[i].description}</td>
            <td><button onclick = "updateData(${i})">Edit</button></td>
            <td><button onclick = "deleteData(${i})">Delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
