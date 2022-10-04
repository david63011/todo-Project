/* eslint-disable no-use-before-define */
import './styles/main.scss';

const toDos = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Buy Groceries',
    completed: false,
    index: 1,
  },
  {
    description: 'Go to the gym',
    completed: false,
    index: 2,
  },
];

function showTodos() {
  const todoList = document.querySelector('.todo-list');
  toDos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
   <input class="checkbox" type="checkbox" name="" value="" <span>${todo.description}</span> `;
    todoList.appendChild(listItem);
  });
}
showTodos();
