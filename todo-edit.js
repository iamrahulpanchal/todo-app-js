const todoId = location.hash.substr(1);
let todos = getSavedTodos();
let todo = todos.find(function(item){
    return item.id === todoId;
});

if(todo === undefined){
    location.assign(`${location.origin}/index.html`);
}
    
document.querySelector('#todo-text-edit').value = todo.text;

document.querySelector('#todo-text-edit').addEventListener('input', function(e){
    todo.text = e.target.value;
    saveTodos(todos);
});

window.addEventListener('storage', function(e){
    if(e.key === 'todos'){
        todos = JSON.parse(e.newValue);
        todo = todos.find(function(item){
            return item.id === todoId;
        });
        
        if(todo === undefined){
            location.assign(`${location.origin}/index.html`);
        }
            
        document.querySelector('#todo-text-edit').value = todo.text;
    }
});
