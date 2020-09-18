// Functions File

let cb_value;

// Fetch data from Local Storage if it exists 
const getSavedTodos = function(){
    const todosJSON = localStorage.getItem('todos');
    if(todosJSON !== null){
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
}

// Save the todo to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get left todos summary 
const getLeftTodos = function(leftTodos){
    const summary = document.createElement('h3');
    summary.textContent = `You have ${leftTodos.length} todos left`;
    document.querySelector('#todos_div').appendChild(summary);
}

// Remove a todo from list by id
const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(item){
        return item.id === id;
    });
    if(todoIndex > -1){
        todos.splice(todoIndex, 1);
    }
}

// Updating the todo completed value
const updateTodo = function(id){
    const todo = todos.find(function(item){
        return item.id === id;
    });
    if(todo !== undefined){
        todo.completed = !todo.completed;
    }
}

// Creating a new p element for displaying todos
const generateTodoDOM = function(item){
    const todoElement = document.createElement('div');
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = item.completed;
    const spanElement = document.createElement('span');
    const textElement = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    deleteBtn.textContent = 'x';
    textElement.textContent = item.text;
    editBtn.textContent = 'Edit';
    spanElement.textContent = lastUpdated(item);

    todoElement.appendChild(check);
    todoElement.appendChild(textElement);
    todoElement.appendChild(deleteBtn);
    todoElement.appendChild(editBtn);
    todoElement.appendChild(spanElement);

    deleteBtn.addEventListener('click', function(){
        removeTodo(item.id);
        saveTodos(todos);
        renderTodos(todos, filters);      
    });

    check.addEventListener('change', function(e){
        updateTodo(item.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    editBtn.addEventListener('click', function(){
        location.assign(`${location.origin}/edit.html#${item.id}`);
    });
    
    return todoElement;
};

// Displaying todos on the browser
const renderTodos = function(todos, filters){
    let filteredTodos = todos.filter(function(item){
        return item.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    filteredTodos = filteredTodos.filter(function(item){
        if(filters.hideCompleted){
            return !item.completed
        } else {
            return true;
        }
    });

    const leftTodos = filteredTodos.filter(function(todos){
        return !todos.completed;
    });

    document.querySelector('#todos_div').innerHTML = '';

    getLeftTodos(leftTodos);

    filteredTodos.forEach(function(item){
        if(item.text.length > 0){
            const todoElement = generateTodoDOM(item);
            document.querySelector('#todos_div').appendChild(todoElement);
        }    
    });
};

// Generate last updated msg 
const lastUpdated = function(item){
    return ` Last Updated ${moment(item.updatedAt).fromNow()}`;
}