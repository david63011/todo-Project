// eslint-disable-next-line import/prefer-default-export, import/no-cycle, import/extensions
import { todos, list } from './index.js';

// eslint-disable-next-line import/prefer-default-export
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
      <input type="text" class="edit-input hidden" value=${todo.value} />
      <i class='fas fa-ellipsis-v edit-task'  data-action="edit"></i>
   <i class="fa-solid fa-trash-can trash-btnn hidden " data-action="delete"></i></div>`;
  });
}
