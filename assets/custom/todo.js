'use strict';

let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search_todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#add_todo_form').addEventListener('submit', (e) => {
    e.preventDefault();
    let data = e.target.elements.add_todo_text.value;
    todos.push({
        id: uuidv4(),
        text: data,
        completed: false,
        createdAt: moment().format('D MMM YYYY, HH:mm:ss'),
        updatedAt: moment().format('D MMM YYYY, HH:mm:ss')
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.add_todo_text.value = '';
}); 

document.querySelector('#hide_completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked; 
    renderTodos(todos, filters);
});

window.addEventListener('storage', (e) => {
    if(e.key === 'todos'){
        todos = JSON.parse(e.newValue);
        saveTodos(todos);
        renderTodos(todos, filters);
    }
});
