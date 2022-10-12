/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import './styles/main.scss';

const clear = document.querySelector('.clear-btn');
const list = document.querySelector('.todo-list');
const input = document.getElementById('add-input');
const form = document.getElementById('todoform');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
const LINE_THROUGH = 'lineThrough';

// first render
renderTodos();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveTodo();
  localStorage.setItem('todos', JSON.stringify(todos));
});

function saveTodo() {
  const todoValue = input.value;

  todos.push({
    value: todoValue,
    completed: false,
  });
  input.value = '';
  renderTodos();
}

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    list.innerHTML += `
    <div class="todo" id=${index}>
   <i class="fa ${
     todo.checked ? 'solid fa-check' : 'regular fa-square'
   }"  data-action="check"
    ></i>
   <p class= "text "${todo.checked ? LINE_THROUGH : ''}  data-action="check">${
      todo.value
    }</p>
    <input type="text" class="edit-input hidden" value=${todo.value} />
    <i class='fas fa-ellipsis-v edit-task'  data-action="edit">
    </i>
 <i class="fa-solid fa-trash-can trash-btnn hidden " data-action="delete">
    </i>
    </div>

    `;
  });
}

// click event listerner for all todos

list.addEventListener('click', (event) => {
  const { target } = event;
  const parentElement = target.parentNode;
  if (parentElement.className !== 'todo') return;

  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const { action } = target.dataset;

  action === 'check' && checkTodo(todoId);
  // action === 'edit' && checkTodo(todoId);
  action === 'delete' && checkTodo(todoId);
});

function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
}

document.body.addEventListener('click', (ev) => {
  const el = event.target;
  if (el.classList.contains('edit-task')) {
    ev.preventDefault();
    el.parentNode.querySelector('.trash-btnn').classList.toggle('hidden');
    el.parentNode.querySelector('.fa-ellipsis-v').classList.toggle('hidden');
    el.parentNode.querySelector('.text').classList.toggle('hidden');
    el.parentNode.querySelector('.edit-input').classList.toggle('hidden');
  }

  if (el.classList.contains('trash-btnn')) {
    ev.preventDefault();
    todos.splice(el.parentNode.id, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }

  if (el.classList.contains('edit-input')) {
    ev.preventDefault();
    todos[el.parentNode.id].value = el.value;
  }
});

clear.addEventListener('click', () => {
  todos = [];
  localStorage.clear();
  renderTodos();
});

document.body.addEventListener('keyup', (ev) => {
  const el = event.target;
  if (el.classList.contains('edit-input') && ev.keyCode === 13) {
    ev.preventDefault();
    todos[el.parentNode.id].value = el.value;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
});
