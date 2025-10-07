import React, { useState, useEffect } from 'react';
import './Todo.css';

function Todo() {
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const addTask = () => {
    if (taskInput.trim() === '' || taskDate.trim() === '') return;
    const newTasks = [...tasks, { text: taskInput, date: taskDate, status: 'pending' }];
    setTasks(newTasks);
    setTaskInput('');
    setTaskDate('');
  };

  const updateTaskStatus = (index, status) => {
    const newTasks = [...tasks];
    newTasks[index].status = status;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt('Edit task:', tasks[index].text);
    const newDate = prompt('Edit date:', tasks[index].date);
    if (newText && newDate) {
      const newTasks = [...tasks];
      newTasks[index] = { text: newText, date: newDate, status: 'pending' };
      setTasks(newTasks);
    }
  };

  return (
    <div>
      <div className="theme-toggle" onClick={toggleTheme}>
        <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </div>
      <div className={`container ${isDark ? 'theme-dark' : ''}`}>
        <h1>To-Do List</h1>
        <div className="date">Today: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={`${task.status === 'completed' ? 'completed' : task.status === 'missed' ? 'missed' : ''}`}>
              <div className="task-info">
                <strong>{task.text}</strong>
                <br />
                <span className="task-date">Due: {task.date}</span>
              </div>
              <div className="task-buttons">
                <button onClick={() => updateTaskStatus(index, 'completed')}>✅ Completed</button>
                <button onClick={() => updateTaskStatus(index, 'missed')}>❌ Missed</button>
                <button onClick={() => editTask(index)}>📝 Edit</button>
                <button onClick={() => deleteTask(index)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
