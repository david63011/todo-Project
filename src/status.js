// eslint-disable-next-line import/no-cycle, import/extensions
import { input, todos } from './index.js';
import { renderTodos } from './rendertodos.js';

function saveTodo() {
  const todoValue = input.value;
  todos.push({
    value: todoValue,
    checked: false,

    id: Date.now(),
  });
  input.value = '';
  renderTodos();
}

export default saveTodo;
