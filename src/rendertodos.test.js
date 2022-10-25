import { renderTodos } from './rendertodos';
import { list, todos } from './index';

test('the todos are being rendered to the page', () => {
  const todo = {
    value: 'test',
    checked: false,
  };
  todos.push(todo);
  renderTodos();
  expect(list.innerHTML).toContain(todo.value);
});
