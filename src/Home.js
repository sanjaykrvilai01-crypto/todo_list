import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  const [isDark, setIsDark] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDark);
    mainContentRef.current.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <div className="header">
        <h1>Welcome to Your Planner</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
      </div>

      <div className="main-content" ref={mainContentRef}>

        <Link to="/todo" className="card">📝 To-Do List</Link>
        <Link to="/subject-tracker" className="card">📚 Subject Tracker</Link>
        <Link to="/personal-tracker" className="card">💡 Personal Tracker</Link>
      </div>
    </div>
  );
}

export default Home;
