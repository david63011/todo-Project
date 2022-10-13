// eslint-disable-next-line import/no-cycle, import/extensions
import { input, renderTodos, todos } from './index.js';

function saveTodo() {
  const todoValue = input.value;
  todos.push({
    value: todoValue,
    completed: false,
    id: Date.now(),
  });
  input.value = '';
  renderTodos();
}

export default saveTodo;
