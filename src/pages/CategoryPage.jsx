import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { categories } from '../data/categories';
import './CategoryPage.css';

export default function CategoryPage({ categorySlug }) {
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return <Navigate to="/blog" replace />;
  }

  const categoryArticles = articles.filter((a) => a.category === categorySlug);
  const otherCategories = categories.filter((c) => c.slug !== categorySlug);

  return (
    <>
      <SEO
        title={category.metaTitle.replace(' | SpaceSmart', '')}
        description={category.metaDescription}
        canonicalPath={`/${categorySlug}`}
        ogImage={category.image}
      />

      <main id="main-content" className="category-page main-content">
        {/* Hero Banner */}
        <section className="category-header-banner" aria-labelledby="cat-headline">
          <img
            src={category.image}
            alt={category.imageAlt}
            className="category-banner-img"
            width="1200"
            height="500"
            fetchpriority="high"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="category-banner-overlay" aria-hidden="true" />
          <div className="container">
            <div className="category-banner-content">
              <Breadcrumbs items={[{ label: category.name }]} />
              <p className="category-banner-name">SpaceSmart — {category.name}</p>
              <h1 id="cat-headline" className="category-banner-headline">
                {category.headline}
              </h1>
              <p className="category-banner-desc">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Subtopics Bar */}
        <div className="category-subtopics-bar">
          <div className="container">
            <div className="subtopics-row">
              <span className="subtopic-label">In this section:</span>
              {category.subtopics.map((sub, i) => (
                <span key={i} className="subtopic-pill">{sub}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <section className="category-articles-section" aria-labelledby="articles-heading">
          <div className="container">
            <div className="category-articles-header">
              <h2 id="articles-heading" style={{ marginBottom: '0.4rem' }}>
                {category.name} Guides
              </h2>
              <p className="category-articles-count">
                {categoryArticles.length} guide{categoryArticles.length !== 1 ? 's' : ''} in this
                category
              </p>
            </div>

            {categoryArticles.length > 0 ? (
              <div className="category-articles-grid">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="category-empty">
                <h2 className="category-empty-title">More guides coming soon</h2>
                <p className="category-empty-desc">
                  We're working on in-depth guides for this category. In the meantime, browse the
                  full article index below.
                </p>
                <Link to="/blog" className="btn btn-primary">
                  Browse All Articles <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="other-categories-section" aria-labelledby="other-cats-heading">
          <div className="container">
            <h2 id="other-cats-heading" className="other-categories-title">
              Explore Other Topics
            </h2>
            <div className="other-categories-grid">
              {otherCategories.map((cat) => (
                <Link key={cat.id} to={cat.path} className="other-cat-card">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    className="other-cat-img"
                    loading="lazy"
                    width="60"
                    height="60"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=60&q=80';
                    }}
                  />
                  <div>
                    <p className="other-cat-name">{cat.name}</p>
                    <p className="other-cat-stats">{cat.stats}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
