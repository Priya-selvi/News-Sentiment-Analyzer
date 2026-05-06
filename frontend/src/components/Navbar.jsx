import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">📰 NewsSentiment</Link>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>📊 Dashboard</Link>
        <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>⭐ Favorites</Link>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={() => setDark(d => !d)} title="Toggle dark mode">
          {dark ? '☀️' : '🌙'}
        </button>
        {user ? (
          <div className="user-menu">
            {user.avatar
              ? <img src={user.avatar} alt={user.name} className="user-avatar" referrerPolicy="no-referrer" />
              : <span className="user-avatar-placeholder">👤</span>
            }
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
