import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SENTIMENT_CONFIG = {
  Positive: { emoji: '😊', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: '#10b981' },
  Negative: { emoji: '😞', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: '#ef4444' },
  Neutral:  { emoji: '😐', color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: '#6b7280' },
};

function HighlightedText({ text, positiveWords = [], negativeWords = [] }) {
  if (!text) return null;
  const allWords = [...new Set([...positiveWords, ...negativeWords])];
  if (!allWords.length) return <p className="card-desc">{text}</p>;

  const regex = new RegExp(`\\b(${allWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
  const parts = text.split(regex);

  return (
    <p className="card-desc">
      {parts.map((part, i) => {
        const lower = part.toLowerCase();
        if (positiveWords.map(w => w.toLowerCase()).includes(lower))
          return <mark key={i} className="highlight-positive">{part}</mark>;
        if (negativeWords.map(w => w.toLowerCase()).includes(lower))
          return <mark key={i} className="highlight-negative">{part}</mark>;
        return part;
      })}
    </p>
  );
}

function NewsCard({ article }) {
  const [added, setAdded] = useState(false);
  const config = SENTIMENT_CONFIG[article.sentiment] || SENTIMENT_CONFIG.Neutral;
  const { user, getAuthHeaders } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/favorites', article, {
        headers: getAuthHeaders()
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      alert('Failed to add to favorites');
    }
  };

  return (
    <div className="news-card" style={{ '--accent': config.color, '--accent-bg': config.bg, '--accent-border': config.border }}>
      <div className="card-image-wrapper">
        <img src={article.urlToImage || 'https://placehold.co/400x200?text=No+Image'} alt="" loading="lazy" />
        <span className="category-badge">{article.category || 'general'}</span>
      </div>

      <div className="news-content">
        <h3 className="card-title">{article.title}</h3>

        <HighlightedText
          text={article.description}
          positiveWords={article.positiveWords}
          negativeWords={article.negativeWords}
        />

        <div className="sentiment-row" style={{ background: config.bg, borderLeft: `3px solid ${config.color}` }}>
          <span style={{ color: config.color, fontWeight: 600 }}>
            {config.emoji} {article.sentiment}
          </span>
          <div className="confidence-bar-wrapper">
            <div className="confidence-bar" style={{ width: `${article.confidence || 0}%`, background: config.color }} />
          </div>
          <span className="confidence-label">{article.confidence || 0}% confidence</span>
        </div>

        {(article.positiveWords?.length > 0 || article.negativeWords?.length > 0) && (
          <div className="word-tags">
            {article.positiveWords?.slice(0, 3).map(w => <span key={w} className="tag positive-tag">+{w}</span>)}
            {article.negativeWords?.slice(0, 3).map(w => <span key={w} className="tag negative-tag">-{w}</span>)}
          </div>
        )}

        <div className="actions">
          <button onClick={() => window.open(article.url || article.link, '_blank')} className="read-more-btn">
            Read More ↗
          </button>
          <button onClick={handleFavorite} className={`fav-btn ${added ? 'added' : ''}`}>
            {added ? '✅ Added!' : '⭐ Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
