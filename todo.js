const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search_todo').addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#add_todo_form').addEventListener('submit', function(e){
    e.preventDefault();
    let data = e.target.elements.add_todo_text.value;
    todos.push({
        id: uuidv4(),
        text: data,
        completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.add_todo_text.value = '';
}); 

document.querySelector('#hide_completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked; 
    renderTodos(todos, filters);
});

