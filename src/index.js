/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import './styles/main.scss';
// eslint-disable-next-line import/no-cycle
import saveTodo from './status';

const clear = document.querySelector('.clear-btn');
const list = document.querySelector('.todo-list');
// eslint-disable-next-line import/prefer-default-export
export const input = document.getElementById('add-input');
const form = document.getElementById('todoform');
// eslint-disable-next-line import/no-mutable-exports
export let todos = JSON.parse(localStorage.getItem('todos')) || [];
// eslint-disable-next-line no-unused-vars

// first render
renderTodos();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveTodo();
  localStorage.setItem('todos', JSON.stringify(todos));
});

export function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    list.innerHTML += `
    <div class="todo" id=${index}>
   <i class= "fa  ${
  todo.checked ? 'solid fa-check' : 'regular fa-square'
}" data-action="check"></i>
   <p class= "text "${todo.checked ? 'checked' : ''}  data-action="check">${
  todo.value
}</p>
    <input type="text" class="edit-input hidden" value=${todo.value}/>
    <i class='fas fa-ellipsis-v edit-task'  data-action="edit"></i>
 <i class="fa-solid fa-trash-can trash-btnn hidden " data-action="delete"></i></div>`;
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
});

function checkTodo(todoId) {
  const newArr = todos.map((todo, index) => {
    if (todoId === index) {
      return {
        value: todo.value,
        checked: !todo.checked,
      };
    }
    return {
      value: todo.value,
      checked: todo.checked,
    };
  });
  todos = newArr;

  localStorage.setItem('todos', JSON.stringify(todos));

  renderTodos();
}

// make array value true if true

document.body.addEventListener('click', (ev) => {
  const el = ev.target;
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
  clearCompleted();
  localStorage.setItem('todos', JSON.stringify(todos));
});

document.body.addEventListener('keyup', (ev) => {
  const el = ev.target;
  if (el.classList.contains('edit-input') && ev.keyCode === 13) {
    ev.preventDefault();
    todos[el.parentNode.id].value = el.value;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
});

document.body.addEventListener('click', (ev) => {
  const el = ev.target;
  if (el.classList.contains('fa-square')) {
    ev.preventDefault();
    el.parentNode.querySelector('.text').classList.add('linethrough');
  }
});

function clearCompleted() {
  todos = todos.filter((todo) => todo.checked === false);
  renderTodos();
}
