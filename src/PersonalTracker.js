import React, { useState, useEffect } from 'react';
import './PersonalTracker.css';

function PersonalTracker() {
  const [isDark, setIsDark] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTasks = [...tasks, { text: taskInput, remark: '', showRemark: false }];
    setTasks(newTasks);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText) {
      const newTasks = [...tasks];
      newTasks[index].text = newText;
      setTasks(newTasks);
    }
  };

  const toggleRemarkBox = (index) => {
    const newTasks = [...tasks];
    newTasks[index].showRemark = !newTasks[index].showRemark;
    setTasks(newTasks);
  };

  const saveRemark = (index, remark) => {
    const newTasks = [...tasks];
    newTasks[index].remark = remark;
    newTasks[index].showRemark = false;
    setTasks(newTasks);
  };

  return (
    <div>
      <button className="theme-toggle" onClick={toggleTheme}>{isDark ? '☀️' : '🌙'}</button>
      <div className={`container ${isDark ? 'dark-mode' : ''}`}>
        <h2>🧠 Personal Tracker</h2>
        <input
          type="text"
          placeholder="Enter your personal task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>➕</button>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <strong>{item.text}</strong>
              <div className="task">
                <label><input type="checkbox" /></label>
                <div className="buttons">
                  <button onClick={() => toggleRemarkBox(index)}>✍️</button>
                  <button onClick={() => editTask(index)}>📝</button>
                  <button onClick={() => deleteTask(index)}>🗑️</button>
                </div>
              </div>
              {item.showRemark && (
                <div className="remark-box">
                  <textarea placeholder="Write remark if not completed"></textarea>
                  <button onClick={(e) => saveRemark(index, e.target.previousElementSibling.value)}>✅</button>
                </div>
              )}
              {item.remark && <div className="remark-output"><em>📝 {item.remark}</em></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PersonalTracker;
