let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// table row HTML
function createTableRow(i) {
  const statusIcon =
    newToDo[i].status === "completed"
      ? '<i class="fas fa-check"></i>'
      : '<i class="fas fa-clock"></i>';
  return `
        <tr>
        <td>${i + 1}</td>
        <td>${newToDo[i].title}</td>
        <td>${newToDo[i].description}</td>
        <td>${newToDo[i].date}</td>
        <td><button id="mybutton" onclick="toggleStatus(${i})">${statusIcon}</button></td>
        <td><button id="edit" onclick="updateData(${i})"><i class="fas fa-edit"></i></button></td>
        <td><button class="delete" onclick="deleteData(${i})"><i class="fas fa-trash"></i></button></td>
        </tr>
    `;
}

// Create
let newToDo;
if (localStorage.ToDo != null) {
  newToDo = JSON.parse(localStorage.ToDo);
} else {
  newToDo = [];
}

submit.onclick = function () {
  if (title.value.trim() === "") {
    alert("Please enter a title for the task.");
    return;
  }

  let newObj = {
    title: title.value,
    date: date.value,
    description: description.value,
    status: "pending",
  };

  if (mood === "create") {
    newToDo.push(newObj);
    localStorage.setItem("ToDo", JSON.stringify(newToDo));
  } else {
    newToDo[tmp] = newObj;
    mood = "create";
    submit.innerHTML = "Create";
  }

  clearData();
  showData();
};

function clearData() {
  title.value = "";
  date.value = "";
  description.value = "";
}

// Read
function showData() {
  table = "";
  for (let i = 0; i < newToDo.length; i++) {
    table += createTableRow(i);
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();

// Toggle Status
function toggleStatus(i) {
  if (newToDo[i].status === "pending") {
    newToDo[i].status = "completed";
  } else {
    newToDo[i].status = "pending";
  }
  localStorage.setItem("ToDo", JSON.stringify(newToDo));
  // document.getElementById("mybutton").style.backgroundColor = "yellow";
  showData();
}

// Delete
function deleteData(i) {
  let msg = confirm("Are you sure you want to delete this task!");
  if (msg) {
    newToDo.splice(i, 1);
    localStorage.ToDo = JSON.stringify(newToDo);
  }
  showData();
}

// Update
function updateData(i) {
  title.value = newToDo[i].title;
  date.value = newToDo[i].date;
  description.value = newToDo[i].description;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
function searchData(value) {
  let filteredData = newToDo.filter((item) => item.title.includes(value));
  let table = "";

  for (let item of filteredData) {
    let index = newToDo.indexOf(item);
    table += createTableRow(index);
  }

  document.getElementById("tbody").innerHTML = table;
}

// Search:
// function searchData(value) {
//     let table = "";
//     for (let i = 0; i < newToDo.length; i++) {
//         if (newToDo[i].title.includes(value)) {
//             table += createTableRow(i);
//         }
//     }
//     document.getElementById("tbody").innerHTML = table;
// }
//----------------------------------------------------------
// function searchData(value) {
//     let table = "";
//     let filteredIndices = newToDo.map((item, index) => ({ item, index }))
//                                  .filter(({ item }) => item.title.includes(value))
//                                  .map(({ index }) => index);

//     for (let i of filteredIndices) {
//         table += createTableRow(i);
//     }

//     document.getElementById("tbody").innerHTML = table;
// }
