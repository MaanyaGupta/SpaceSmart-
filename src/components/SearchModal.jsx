import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { articles } from '../data/articles';
import { calculateReadingTime } from '../utils/readingTime';
import './SearchModal.css';

const SUGGESTIONS = [
  'under-bed storage',
  'small closet',
  'tension rods',
  'vertical shelving',
  'declutter bedroom',
  'rental hacks',
];

function searchArticles(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.categoryName,
      article.directAnswer || '',
      ...(article.keyTakeaways || []),
    ]
      .join(' ')
      .toLowerCase();
    return q.split(' ').every((word) => haystack.includes(word));
  });
}

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setResults(searchArticles(value));
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, []);

  const handleResultClick = (slug) => {
    onClose();
    navigate(`/article/${slug}`);
  };

  const handleSuggestion = (suggestion) => {
    handleSearch(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div
      className="search-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="search-modal-card">
        {/* Input Row */}
        <div className="search-input-header">
          <Search size={22} className="search-icon-decor" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className="search-input-field"
            placeholder="Search guides, topics, tips…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search articles"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="search-results-container" role="region" aria-live="polite" aria-label="Search results">
          {hasSearched && results.length > 0 ? (
            <>
              <div className="search-status-bar">
                <span>{results.length} guide{results.length !== 1 ? 's' : ''} found</span>
              </div>
              <ul className="search-results-list">
                {results.map((article) => (
                  <li key={article.id}>
                    <button
                      className="search-result-item"
                      onClick={() => handleResultClick(article.slug)}
                      style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <div className="search-result-meta">
                        <span>{article.categoryName}</span>
                        <span>·</span>
                        <span>
                          <Clock size={11} aria-hidden="true" style={{ display: 'inline', marginRight: 3 }} />
                          {calculateReadingTime(article)} min read
                        </span>
                      </div>
                      <div className="search-result-title">{article.title}</div>
                      <p className="search-result-snippet">{article.excerpt}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : hasSearched && results.length === 0 ? (
            <div className="search-empty-state">
              <p className="search-empty-title">No guides matched "{query}"</p>
              <p className="search-empty-desc">
                Try different keywords, or browse a category from the navigation above.
              </p>
              <div className="search-suggestions-wrap">
                <span className="search-suggestions-label">Try these topics</span>
                <div className="search-pill-list">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="search-pill-btn"
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="search-empty-state">
              <p className="search-empty-title">What are you looking to organize?</p>
              <p className="search-empty-desc">
                Search across all SpaceSmart guides on bedrooms, storage, decluttering, and budget
                organization.
              </p>
              <div className="search-suggestions-wrap">
                <span className="search-suggestions-label">Popular searches</span>
                <div className="search-pill-list">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="search-pill-btn"
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="search-modal-footer">
          <span>Press <kbd style={{ padding: '1px 5px', background: '#fff', border: '1px solid #ddd', borderRadius: 3 }}>Esc</kbd> to close</span>
          <span>/ to search from anywhere</span>
        </div>
      </div>
    </div>
  );
}
