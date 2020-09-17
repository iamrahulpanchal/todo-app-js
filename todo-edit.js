const todoId = location.hash.substr(1);
const todos = getSavedTodos();
const todo = todos.find(function(item){
    return item.id === todoId;
});

console.log(todo);

if(todo === undefined){
    location.assign(`${location.origin}/index.html`);
}
    
document.querySelector('#todo-text-edit').value = todo.text;

document.querySelector('#todo-text-edit').addEventListener('input', function(e){
    todo.text = e.target.value;
    saveTodos(todos);
});
