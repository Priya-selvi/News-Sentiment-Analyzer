import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/favorites', { headers: getAuthHeaders() })
      .then(res => setFavorites(res.data));
  }, []);

  const removeFav = (id) => {
    axios.delete(`http://localhost:5000/api/favorites/${id}`, { headers: getAuthHeaders() })
      .then(() => setFavorites(favorites.filter(f => f._id !== id)));
  };

  return (
    <div className="container">
      <h2 className="page-title">⭐ My Favorites</h2>
      {favorites.length === 0 && <p className="no-results">No saved articles yet.</p>}
      <div className="news-grid">
        {favorites.map((f) => (
          <div className="news-card" key={f._id}>
            <div className="card-image-wrapper">
              <img src={f.urlToImage || 'https://placehold.co/400x200?text=No+Image'} alt="" loading="lazy" />
              {f.category && <span className="category-badge">{f.category}</span>}
            </div>
            <div className="news-content">
              <h3 className="card-title">{f.title}</h3>
              <p className="card-desc">{f.description}</p>
              <div className="sentiment-row" style={{
                background: f.sentiment === 'Positive' ? 'rgba(16,185,129,0.1)' : f.sentiment === 'Negative' ? 'rgba(239,68,68,0.1)' : 'rgba(107,114,128,0.1)',
                borderLeft: `3px solid ${f.sentiment === 'Positive' ? '#10b981' : f.sentiment === 'Negative' ? '#ef4444' : '#6b7280'}`
              }}>
                <span style={{ color: f.sentiment === 'Positive' ? '#10b981' : f.sentiment === 'Negative' ? '#ef4444' : '#6b7280', fontWeight: 600 }}>
                  {f.sentiment === 'Positive' ? '😊' : f.sentiment === 'Negative' ? '😞' : '😐'} {f.sentiment}
                </span>
                {f.confidence != null && <span className="confidence-label">{f.confidence}% confidence</span>}
              </div>
              <div className="actions">
                <button onClick={() => window.open(f.url || f.link, '_blank')} className="read-more-btn">Read More ↗</button>
                <button className="remove" onClick={() => removeFav(f._id)}>🗑 Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
