import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { categories } from '../data/categories';
import './Blog.css';

function filterArticles(articleList, query, activeCategory) {
  let filtered = articleList;

  if (activeCategory !== 'all') {
    filtered = filtered.filter((a) => a.category === activeCategory);
  }

  if (query.trim().length >= 2) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter((a) => {
      const haystack = [a.title, a.excerpt, a.categoryName, ...(a.keyTakeaways || [])]
        .join(' ')
        .toLowerCase();
      return q.split(' ').every((word) => haystack.includes(word));
    });
  }

  return filtered;
}

export default function Blog() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = useMemo(
    () => filterArticles(articles, query, activeCategory),
    [query, activeCategory]
  );

  return (
    <>
      <SEO
        title="All Articles"
        description="Browse all SpaceSmart guides on small bedroom ideas, storage solutions, decluttering strategies, and budget-friendly organization for renters and apartment dwellers."
        canonicalPath="/blog"
      />

      <main id="main-content" className="blog-page main-content">
        {/* Page Header with inline search */}
        <header className="blog-page-header">
          <div className="container">
            <Breadcrumbs items={[{ label: 'All Articles' }]} />
            <div className="blog-header-content">
              <p className="blog-header-kicker">SpaceSmart Article Index</p>
              <h1 className="blog-header-title">All Organization Guides</h1>
              <p className="blog-header-desc">
                Practical, in-depth guides covering bedroom organization, storage systems,
                decluttering, and affordable rental upgrades.
              </p>

              <div className="blog-search-bar" role="search">
                <Search size={18} color="var(--text-muted)" aria-hidden="true" />
                <input
                  type="search"
                  className="blog-search-bar-input"
                  placeholder="Search guides, topics…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search articles"
                />
                {query && (
                  <span className="blog-search-count">
                    {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Category Filter Chips */}
        <div className="blog-filter-row">
          <div className="container">
            <div className="filter-chips" role="group" aria-label="Filter articles by category">
              <span className="filter-label">Filter:</span>
              <button
                type="button"
                className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
              >
                All Guides
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-chip ${activeCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.slug)}
                  aria-pressed={activeCategory === cat.slug}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <section className="blog-articles-section" aria-labelledby="articles-heading">
          <div className="container">
            <div className="blog-status-bar">
              <h2 id="articles-heading" style={{ fontSize: '1rem', fontFamily: 'inherit', fontWeight: 600, margin: 0, color: 'var(--text-muted)' }}>
                {filteredArticles.length === articles.length
                  ? `${articles.length} guides published`
                  : `${filteredArticles.length} of ${articles.length} guides`}
              </h2>
            </div>

            <div className="blog-articles-grid">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="blog-empty">
                  <h2 className="blog-empty-title">
                    No guides matched "{query}"
                  </h2>
                  <p className="blog-empty-desc">
                    Try different keywords or clear the filter to browse all guides.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
