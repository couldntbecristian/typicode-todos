const apiUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
const todoList = document.getElementById('todo-list')
const addBtn = document.getElementById('AddBtn')
const todoInput = document.getElementById('title')

function fetchTodo(){
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => data.forEach(todo => displayTodo(todo)))
}

function displayTodo(data){
  const todoDiv = document.createElement('div')
  const todoTitle = document.createTextNode(data.title) 

  todoDiv.appendChild(todoTitle)

  todoList.appendChild(todoDiv)
}


// addBtn.addEventListener('click', addTodo)

fetchTodo()