import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    function addTodo(event) {
        event.preventDefault();
        if (task.trim() === '') return;
        const newTodo = {
            id: Date.now(),
            task,
            completed: false,
            dueDate
        };
        setTodos([...todos, newTodo]);
        setTask('');
        setDueDate('');
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function toggleCompleted(id) {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <form onSubmit={addTodo}>
                <h2>TODO LIST</h2>
                <input 
                    type="text" 
                    placeholder="Add Task...." 
                    value={task} 
                    onChange={e => setTask(e.target.value)}
                />
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={e => setDueDate(e.target.value)}
                />
                <button id="add" type="submit">ADD</button>
            </form>
            <input 
                type="text" 
                placeholder="Search Tasks..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginTop: '1rem', padding: '0.5rem', width: '100%' }}
            />
            <ul>
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </ul>
        </div>
    );
}

function TodoItem({ todo, deleteTodo, toggleCompleted }) {
    return (
        <li className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleCompleted(todo.id)}
            />
            <p className={todo.completed ? 'completed' : ''}>{todo.task}</p>
            {todo.dueDate && <p className="due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
        </li>
    );
}

export default TodoList;
