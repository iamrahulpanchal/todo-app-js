// Functions File

let cb_value;

// Fetch data from Local Storage if it exists 
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try{
        if(todosJSON !== null){
            return JSON.parse(todosJSON);
        } else {
            return [];
        }
    } catch(e) {
        return [];
    }
}

// Save the todo to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get left todos summary 
const getLeftTodos = (leftTodos) => {
    const summary = document.createElement('h3');
    summary.textContent = `You have ${leftTodos.length} todos left`;
    document.querySelector('#todos_div').appendChild(summary);
}

// Remove a todo from list by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if(todoIndex > -1){
        todos.splice(todoIndex, 1);
    }
}

// Updating the todo completed value
const updateTodo = (id) => {
    // const todo = todos.find(function(item){
    //     return item.id === id;
    // });
    const todo = todos.find((item) => item.id === id);
    if(todo !== undefined){
        todo.completed = !todo.completed;
    }
}

// Creating a new p element for displaying todos
const generateTodoDOM = (item) => {
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

    deleteBtn.addEventListener('click', () => {
        removeTodo(item.id);
        saveTodos(todos);
        renderTodos(todos, filters);      
    });

    check.addEventListener('change', () => {
        updateTodo(item.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    editBtn.addEventListener('click', () => {
        location.assign(`${location.origin}/edit.html#${item.id}`);
    });
    
    return todoElement;
};

// Displaying todos on the browser
const renderTodos = (todos, filters) => {
    let filteredTodos = todos.filter((item) => {
        return item.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    filteredTodos = filteredTodos.filter((item) => {
        if(filters.hideCompleted){
            return !item.completed
        } else {
            return true;
        }
    });

    const leftTodos = filteredTodos.filter((todos) => {
        return !todos.completed;
    });

    document.querySelector('#todos_div').innerHTML = '';

    getLeftTodos(leftTodos);

    filteredTodos.forEach((item) => {
        if(item.text.length > 0){
            const todoElement = generateTodoDOM(item);
            document.querySelector('#todos_div').appendChild(todoElement);
        }    
    });
};

// Generate last updated msg 
const lastUpdated = (item) => {
    return ` Last Updated ${moment(item.updatedAt).fromNow()}`;
}