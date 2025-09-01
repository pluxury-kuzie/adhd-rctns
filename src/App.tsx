import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from '../src/pages/HomePage';
import PlayerPage from '../src/pages/PlayerPage';
import ProfilePage from '../src/pages/ProfilePage';
import AdminPage from '../src/pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player" element={<PlayerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
