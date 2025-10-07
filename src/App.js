import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Todo from './Todo';
import SubjectTracker from './SubjectTracker';
import PersonalTracker from './PersonalTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/subject-tracker" element={<SubjectTracker />} />
        <Route path="/personal-tracker" element={<PersonalTracker />} />
      </Routes>
    </Router>
  );
}

export default App;