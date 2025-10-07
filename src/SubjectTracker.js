import React, { useState, useEffect } from 'react';
import './SubjectTracker.css';

function SubjectTracker() {
  const [isDark, setIsDark] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const addChapter = () => {
    if (subjectName.trim() === '' || chapterName.trim() === '' || targetDate.trim() === '') return;
    const newSubjects = [...subjects, { subject: subjectName, chapter: chapterName, date: targetDate, remark: '', showRemark: false }];
    setSubjects(newSubjects);
    setSubjectName('');
    setChapterName('');
    setTargetDate('');
  };

  const deleteChapter = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const toggleRemarkBox = (index) => {
    const newSubjects = [...subjects];
    newSubjects[index].showRemark = !newSubjects[index].showRemark;
    setSubjects(newSubjects);
  };

  const saveRemark = (index, remark) => {
    const newSubjects = [...subjects];
    newSubjects[index].remark = remark;
    newSubjects[index].showRemark = false;
    setSubjects(newSubjects);
  };

  return (
    <div>
      <button className="theme-toggle" onClick={toggleTheme}>{isDark ? '☀️' : '🌙'}</button>
      <div className={`container ${isDark ? 'dark-mode' : ''}`}>
        <h2>📘 Subject Tracker</h2>
        <input
          type="text"
          placeholder="Subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Chapter name"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <button onClick={addChapter}>➕</button>
        <ul>
          {subjects.map((item, index) => (
            <li key={index}>
              <strong>{item.subject}</strong> - {item.chapter}<br />
              <small>📅 {item.date}</small>
              <div className="chapter">
                <label><input type="checkbox" /></label>
                <div className="buttons">
                  <button onClick={() => toggleRemarkBox(index)}>✍️</button>
                  <button onClick={() => deleteChapter(index)}>🗑️</button>
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

export default SubjectTracker;
