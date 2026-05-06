import React, { useEffect, useState, useMemo } from 'react';
import api from '../api';
import NewsCard from './NewsCard';
import SearchFilter from './SearchFilter';

function SkeletonCard() {
  return (
    <div className="news-card skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="news-content">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

const CACHE_KEY = 'news_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setNews(data);
        setLoading(false);
        return;
      }
    }
    api.get('/news').then(res => {
      setNews(res.data);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: res.data, timestamp: Date.now() }));
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => [...new Set(news.map(n => n.category || 'general'))], [news]);

  const filtered = useMemo(() => news.filter(item => {
    const matchSearch = !searchTerm || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSentiment = sentimentFilter === 'all' || item.sentiment?.toLowerCase() === sentimentFilter;
    const matchCategory = categoryFilter === 'all' || (item.category || 'general') === categoryFilter;
    return matchSearch && matchSentiment && matchCategory;
  }), [news, searchTerm, sentimentFilter, categoryFilter]);

  return (
    <div className="container">
      <h2 className="page-title">📰 Latest News & Sentiment</h2>

      <SearchFilter
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        sentimentFilter={sentimentFilter} setSentimentFilter={setSentimentFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {!loading && (
        <p className="results-count">Showing {filtered.length} of {news.length} articles</p>
      )}

      <div className="news-grid">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length > 0
            ? filtered.map((item, idx) => <NewsCard key={idx} article={item} />)
            : <p className="no-results">No articles match your filters.</p>
        }
      </div>
    </div>
  );
}

export default NewsList;
