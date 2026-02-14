const card = document.querySelector(".container-person");
const showcard = document.querySelector(".add");
const btncan = document.querySelector(".cancel");
const input = document.querySelector(".taskName");
const descInput = document.querySelector(".taskdescription");
function Cardapper() {
  card.classList.add("up");
  document.body.classList.add("modal-open");
}

showcard.onclick = Cardapper;

function closecard() {
  card.classList.remove("up");
  document.body.classList.remove("modal-open");

  input.value = "";
  descInput.value = "";
}
btncan.onclick = closecard;

// ----------------------------------------------------------------- TASK-Section
const taskList = document.querySelector(".task-section");
let arrTask = JSON.parse(localStorage.getItem("List")) || [];
let editIndex;
showTasks();
function showTasks() {
  taskList.innerHTML = "";
  arrTask.forEach((tasks, i) => {
    taskList.innerHTML += `
 <div class="task-context d-flex justify-content-between align-items-center p-3 border rounded-3 bg-light shadow-sm">
        <div class="txt-con">
                <p class="m-0 fw-bold fs-5" style="text-decoration:${tasks.Pending ? "line-through" : ""}; color : ${tasks.Pending ? "#6c757d" : "#212529"}">${tasks.Name}</p>
                <p class="taskDesc m-0 ">${tasks.Description}</p>
                <div class="mt-1">
                    <span class="badge ${tasks.Pending ? "bg-success" : "bg-warning text-dark"}">${tasks.Pending ? "Done" : "Pending"}</span>
                    <small class="ms-2 text-info" style="font-size: 0.7rem;">${tasks.Date}</small>
                </div>
        </div>
            <div class="action-btn d-flex align-items-center gap-2">
                <label class="custom-checkbox">
                    <input type="checkbox" ${tasks.Pending ? "checked" : ""} onclick="changestatus(${i})" />
                    <span class="checkmark"></span>
                </label>
                <button class="btn btn-outline-danger btn-sm border-0 fs-4" onclick="delTask(${i})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class="btn btn-outline-info btn-sm border-0 fs-4" onclick="editCard(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
             </div>
    </div>
    `;
  });
}
const submitTask = document.querySelector(".add-task");
const count = document.querySelector(".count");
submitTask.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value == "" || descInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Empty Filed",
    });
    return;
  }
  let currentTime = new Date().toLocaleString();
  const user = {
    Name: input.value,
    Description: descInput.value,
    Date: currentTime,
    Pending: false,
  };
  arrTask.push(user);
  showTasks();
  closecard();
  console.log(arrTask);
});

function delTask(x) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      arrTask.splice(x, 1);
      showTasks();
      saveData();
      Swal.fire({
        title: "Deleted!",
        text: "Your Task has been deleted.",
        icon: "success",
      });
    }
  });
}

function changestatus(i) {
  if (arrTask[i].Pending == true) {
    arrTask[i].Pending = false;
  } else {
    arrTask[i].Pending = true;
  }
  showTasks();
  saveData();
}
// ---------------------------------------------------- Edit-Section
const editcard = document.querySelector(".containers");
const editName = document.querySelector(".editName");
const editdesc = document.querySelector(".editdesc");
const closeEdit = document.querySelector(".cancels");

function editCard(i) {
  editIndex = i;
  editName.value = arrTask[editIndex].Name;
  editdesc.value = arrTask[editIndex].Description;
  editcard.classList.add("active");
  document.body.classList.add("modal-open");
}
function closeEditCard() {
  editcard.classList.remove("active");
  document.body.classList.remove("modal-open");

  editName.value = "";
  editdesc.value = "";
}

function editTask() {
  if (editName.value == "" || editdesc.value == "") {
    Swal.fire({
      icon: "error",
      title: "Empty Filed",
    });
    return;
  }
  arrTask[editIndex].Name = editName.value;
  arrTask[editIndex].Description = editdesc.value;

  showTasks();
  saveData();
  closeEditCard();
}

function saveData() {
  localStorage.setItem("List", JSON.stringify(arrTask));
  showTasks();
}
