import "./scss/main.scss";
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const formTodo = $(".formTodo")
const inputTodo = $(".inputTodo")
const tasksList = $(".tasksList")


formTodo.onsubmit = (e) => {
  e.preventDefault()
  const newTask = {
    name: inputTodo.value,
  }
  
 fetch("http://localhost:3000/tasks",{
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)

      })
      .then(res=> res.json())
      .then(task => {
        createLiTask(task)
      })    
}

tasksList.onclick = (e) => {
  const deleteBtn = e.target.closest(".deleteTask")
  const updateBtn = e.target.closest(".updateTask")
  
  if(deleteBtn) {
    fetch(`http://localhost:3000/tasks/${deleteBtn.dataset.id}`,{
      method: "DELETE"
    })
    .then(res=> res.json())
    .then(task => {
        deleteBtn.parentElement.remove()
    })
  }

  if(updateBtn) {

    const taskLi = updateBtn.closest(".task-item")
    const taskName = taskLi.querySelector(".task-name")

    const input = document.createElement("input")
    input.value = taskName.textContent

    taskName.replaceWith(input)

    input.focus()

   

  }
}

tasksList.onkeydown = (e) => {
  if (e.key !== "Enter") return
  const input = e.target
  if (!input.matches(".task-item input")) return
  const taskLi = input.closest(".task-item")
  const updateBtn = taskLi.querySelector(".updateTask")

   fetch(`http://localhost:3000/tasks/${updateBtn.dataset.id}`,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: input.value
      })
    })
    .then(res=> res.json())
    .then(task => {
        const taskName = document.createElement("span")
        taskName.classList.add("task-name")
        taskName.textContent = task.name

        input.replaceWith(taskName)
      })
  
}

function createLiTask(task) {
  const taskLiElement = document.createElement("li")
  taskLiElement.classList.add("task-item")

  const taskName = document.createElement("span")
  taskName.classList.add("task-name")
  taskName.textContent = task.name

  const updateBtn = document.createElement("button")
  updateBtn.classList.add("updateTask")
  updateBtn.textContent = "Update"
  updateBtn.dataset.id = task.id

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("deleteTask")
  deleteBtn.textContent = "X"
  deleteBtn.dataset.id = task.id

  taskLiElement.append(taskName, updateBtn, deleteBtn)

  tasksList.prepend(taskLiElement)
  
}

function renderTasks(tasks) {
  tasks.forEach(task => {
    createLiTask(task)
  });
}

async function start() {
  const res = await fetch("http://localhost:3000/tasks")
  const tasks = await res.json()
  renderTasks(tasks)
} 
start()