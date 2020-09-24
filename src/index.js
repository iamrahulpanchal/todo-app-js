import { addTodo, renderTodos, getFilters, setFilters } from './all-functions';

const filters = getFilters();
renderTodos(filters);

document.querySelector('#search_todo').addEventListener('input', (e) => {
    setFilters({
        searchText : e.target.value,
    });
});

document.querySelector('#hide_completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted : e.target.checked,
    });
});

document.querySelector('#add_todo_form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(e);
}); 
