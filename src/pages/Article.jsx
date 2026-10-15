import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { categories } from '../data/categories';
import { calculateReadingTime } from '../utils/readingTime';
import { siteConfig } from '../data/siteConfig';
import './Article.css';

function buildArticleSchema(article, readingTime) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    datePublished: article.isoDate,
    image: article.heroImage,
    url: `${siteConfig.siteUrl}/article/${article.slug}`,
    timeRequired: `PT${readingTime}M`,
    articleSection: article.categoryName,
  };
}

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!article) return;
    window.scrollTo({ top: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );

    const headings = document.querySelectorAll('.article-body [id]');
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug, article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const readingTime = calculateReadingTime(article);
  const relatedArticles = article.relatedSlugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  const allCategories = categories.slice(0, 5);
  const articleSchema = buildArticleSchema(article, readingTime);

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/article/${article.slug}`}
        ogImage={article.heroImage}
        ogType="article"
        schemaData={articleSchema}
      />

      <main id="main-content" className="article-page main-content">
        {/* Hero */}
        <div className="article-hero" role="img" aria-label={article.heroImageAlt}>
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="article-hero-img"
            width="1400"
            height="520"
            fetchpriority="high"
          />
          <div className="article-hero-overlay" aria-hidden="true" />

          <div className="container article-hero-content">
            <Breadcrumbs
              items={[
                { label: article.categoryName, path: article.categoryPath },
                { label: article.title },
              ]}
            />

            <div className="article-hero-meta">
              <Link to={article.categoryPath} className="article-hero-category">
                {article.categoryName}
              </Link>
              <span className="article-hero-reading-time">
                <Clock size={13} aria-hidden="true" />
                {readingTime} min read
              </span>
              <time className="article-hero-date" dateTime={article.isoDate}>
                {article.publishDate}
              </time>
            </div>

            <h1 className="article-hero-title">{article.title}</h1>
            <p className="article-hero-subtitle">{article.subtitle}</p>

            {article.imageCaption && (
              <p className="article-hero-caption">{article.imageCaption}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container">
          <div className="article-layout">
            {/* Main Column */}
            <div className="article-main">
              {/* Direct Answer */}
              {article.directAnswer && (
                <div className="article-answer-box">
                  <p className="article-answer-label">Quick Answer</p>
                  <p className="article-answer-text">{article.directAnswer}</p>
                </div>
              )}

              {/* Key Takeaways */}
              {article.keyTakeaways?.length > 0 && (
                <div className="article-takeaways">
                  <h2 className="takeaways-title">
                    <CheckCircle2 size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                    Key Takeaways
                  </h2>
                  <ul className="takeaways-list">
                    {article.keyTakeaways.map((point, i) => (
                      <li key={i} className="takeaways-item">
                        <span className="takeaways-bullet" aria-hidden="true">
                          <CheckCircle2 size={13} style={{ color: 'var(--color-primary)' }} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Body Sections */}
              <div className="article-body">
                {article.sections?.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2 id={section.id}>{section.title}</h2>

                    {Array.isArray(section.content) &&
                      section.content.map((para, pi) => (
                        <p key={pi} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}

                    {section.subsections?.map((sub, si) => (
                      <div key={si}>
                        <h3>{sub.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: sub.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                      </div>
                    ))}
                  </section>
                ))}
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="related-section">
                  <h2 className="related-title">Related Guides</h2>
                  <div className="related-grid">
                    {relatedArticles.map((rel) => (
                      <ArticleCard key={rel.id} article={rel} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar" aria-label="Article sidebar">
              {/* Table of Contents */}
              {article.tableOfContents?.length > 0 && (
                <nav className="sidebar-toc" aria-label="Table of contents">
                  <p className="sidebar-toc-title">In This Guide</p>
                  <ol className="sidebar-toc-list">
                    {article.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`sidebar-toc-link ${activeSection === item.id ? 'toc-active' : ''}`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Category Links */}
              <div className="sidebar-category-box">
                <p className="sidebar-cat-title">Browse Categories</p>
                {allCategories.map((cat) => (
                  <Link key={cat.id} to={cat.path} className="sidebar-cat-link">
                    <span>{cat.name}</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                ))}
                <Link to="/blog" className="sidebar-cat-link">
                  <span>All Articles</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
