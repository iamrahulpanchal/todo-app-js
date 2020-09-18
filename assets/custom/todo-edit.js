const todoId = location.hash.substr(1);
let todos = getSavedTodos();
let todo = todos.find((item) => {
    return item.id === todoId;
});

if(todo === undefined){
    location.assign(`${location.origin}/index.html`);
}
    
document.querySelector('#todo-text-edit').value = todo.text;

document.querySelector('#todo-text-edit').addEventListener('input', (e) => {
    todo.text = e.target.value;
    todo.updatedAt = moment().format('D MMM YYYY, HH:mm:ss');
    saveTodos(todos);
});

window.addEventListener('storage', (e) => {
    if(e.key === 'todos'){
        todos = JSON.parse(e.newValue);
        todo = todos.find((item) => {
            return item.id === todoId;
        });
        
        if(todo === undefined){
            location.assign(`${location.origin}/index.html`);
        }
            
        document.querySelector('#todo-text-edit').value = todo.text;
    }
});
