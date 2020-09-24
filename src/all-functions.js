import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// Default Configuration of the App
let todos = [];
const filters = {
    searchText: '',
    hideCompleted: false
}

// Getting the todos from the localStorage
const loadTodos = () => {
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

// Updating todos value with the value returned from local storage.
todos = loadTodos();

// Getting the todos for using in edit.js
// const getTodos = () => {
//     return todos;
// }

// This function is used to save todos again in local storage if anything is changed.
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Updating the filters through index.js
const setFilters = (updates) => {
    if(typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText;
    }
    if(typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted;
    }
    renderTodos(filters);
}

// Returning the filters to renderTodos in index.js
const getFilters = () => {
    return filters;
}

// Removing the todo with the help of id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((item) => item.id === id);
    if(todoIndex > -1){
        todos.splice(todoIndex, 1);
    }
    saveTodos();
    renderTodos(filters);
}

// Updating the completed properly of the todo with the help of id
const updateTodo = (id) => {
    const todo = todos.find((item) => item.id === id);
    if(todo !== undefined){
        todo.completed = !todo.completed;
    }
    saveTodos();
    renderTodos(filters);
}

// This function is used for printing message in header like how many todos are left.
const getLeftTodos = (leftTodos) => {
    const summary = document.createElement('h3');
    const plural = leftTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title');
    summary.textContent = `You have ${leftTodos.length} todo${plural} left`;
    document.querySelector('#todos_div').appendChild(summary);
}

// Used for creating dom element for each todo
const generateTodoDOM = (item) => {
    const todoElement = document.createElement('label');
    const containerEl = document.createElement('div');
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = item.completed;
    const textElement = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    deleteBtn.textContent = 'Remove';
    deleteBtn.classList.add('button', 'button--text', 'btn-rem-edit');
    textElement.textContent = item.text;
    editBtn.textContent = 'Edit';
    editBtn.classList.add('button', 'button--text', 'btn-rem-edit');

    todoElement.appendChild(containerEl);

    containerEl.appendChild(check);
    containerEl.appendChild(textElement);
    todoElement.appendChild(deleteBtn);
    todoElement.appendChild(editBtn);

    deleteBtn.addEventListener('click', () => {
        removeTodo(item.id);
    });

    check.addEventListener('change', () => {
        updateTodo(item.id);
    });

    editBtn.addEventListener('click', () => {
        location.assign(`edit.html#${item.id}`);
    });

    todoElement.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    
    return todoElement;
};

// Displaying the todos to the browser
const renderTodos = (filters) => {
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

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((item) => {
            if(item.text.length > 0){
                const todoElement = generateTodoDOM(item);
                document.querySelector('#todos_div').appendChild(todoElement);
            }    
        });
    } else {
        const msg = document.createElement('p');
        msg.classList.add('empty-message');
        msg.textContent = 'No Todos to Show!';
        document.querySelector('#todos_div').appendChild(msg);
    }
};

// For adding a new todo
const addTodo = (e) => {
    const data = e.target.elements.add_todo_text.value.trim();
    todos.push({
        id: uuidv4(),
        text: data,
        completed: false,
        createdAt: moment().format('D MMM YYYY, HH:mm:ss'),
        updatedAt: moment().format('D MMM YYYY, HH:mm:ss')
    });
    saveTodos();
    renderTodos(filters);
    e.target.elements.add_todo_text.value = '';
}



// Edit Page Functions 

const lastUpdated = (todo) => {
    return ` Last Updated ${moment(todo.updatedAt).fromNow()}`;
}

const getTodoByID = (todoID) => {
    const todo = todos.find((item) => {
        return item.id === todoID;
    });
    if(todo === undefined){
        location.assign(`${location.origin}/index.html`);
    }
    document.querySelector('#todo-text-edit').value = todo.text;
    document.querySelector('#last-edited').textContent = lastUpdated(todo);
    return todo;
}

const editTodo = (todo, e) => {
    todo.text = e.target.value;
    todo.updatedAt = moment().format('D MMM YYYY, HH:mm:ss');
    document.querySelector('#last-edited').textContent = lastUpdated(todo);
    saveTodos();
}

export { addTodo, renderTodos, getFilters, setFilters, getTodoByID, editTodo }
