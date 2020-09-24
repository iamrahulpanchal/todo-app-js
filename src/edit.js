import { getTodoByID, editTodo } from './all-functions';

const todoID = location.hash.substr(1);

const todo = getTodoByID(todoID);

document.querySelector('#todo-text-edit').addEventListener('input', (e) => {
    editTodo(todo, e);
});

