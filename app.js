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

  // if(todo.completed){
  //   todoDiv.classList = 'done'
  // }
  isCompleted(todoDiv, todo)

  todoDiv.appendChild(todoTitle)
  todoList.appendChild(todoDiv)


  // checks if completed
  todoDiv.addEventListener('click', (e) => {
    todo.completed = true

  //     if(todo.completed){
  //   todoDiv.classList = 'done'
  // }
  isCompleted(todoDiv, todo)
  })
}

// my original isCompleted()
  // 'the todo argument that you are passing to isCompleted is an object with a completed property, not a DOM element that you can add a class to. You need to pass the actual DOM element that you want to modify as an argument to isCompleted (todoDiv)'
// function isCompleted(todo) {
//  if(todo.completed){
//    todo.classList = 'done'
// 'you are trying to set the classList property of the todo argument to 'done', but classList is a property of DOM elements, not objects. You should be using the classList property of the actual DOM element.'
//     }
//   }


function isCompleted(todoDiv, todo) {
    if(todo.completed){
        todoDiv.classList = 'done'
      } 
      // console.log(todo)
}

todoForm.addEventListener('submit', addTodoSubmit)

fetchTodo()