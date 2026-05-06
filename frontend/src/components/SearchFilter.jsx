import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, sentimentFilter, setSentimentFilter, categoryFilter, setCategoryFilter, categories }) {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="🔍 Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)} className="filter-select">
        <option value="all">All Sentiments</option>
        <option value="positive">😊 Positive</option>
        <option value="negative">😞 Negative</option>
        <option value="neutral">😐 Neutral</option>
      </select>

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="filter-select">
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
