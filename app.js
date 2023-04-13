const apiUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
const todoForm = document.getElementById('todo-form')
// const addBtn = document.getElementById('addBtn')
const todoInput = document.getElementById('title')
const todoList = document.getElementById('todo-list')

function fetchTodo(){
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.forEach(todo => displayTodo(todo))
    })
}

function addTodoSubmit(e){
  e.preventDefault()
  
  const newTodo = todoInput.value.trim()

  // validate input
  if (newTodo === ''){
    return 
  }
  
  addNewTodo(newTodo)
  todoInput.value = ''
}

// Add todo to api
function addNewTodo(todo){
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      title: todo,
      completed: false
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => {
      displayTodo(data)
      // console.log(data)
    })
}

function displayTodo(todo){
  const todoDiv = document.createElement('div')
  const todoTitle = document.createTextNode(todo.title) 

  isCompleted(todoDiv, todo)

  todoDiv.appendChild(todoTitle)
  todoList.appendChild(todoDiv)


  // checks if completed
  todoDiv.addEventListener('click', (e) => {
    todo.completed = true

  isCompleted(todoDiv, todo)
  })

  todoDiv.addEventListener('dblclick', (e) => {
    todoList.removeChild(e.target)
  })
}

function isCompleted(todoDiv, todo) {
    if(todo.completed){
        todoDiv.classList = 'done'
      } 
      // console.log(todo)
}

todoForm.addEventListener('submit', addTodoSubmit)

fetchTodo()