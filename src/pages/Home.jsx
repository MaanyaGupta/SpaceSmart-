import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { categories } from '../data/categories';
import { practicalTips } from '../data/tips';
import { siteConfig } from '../data/siteConfig';
import './Home.css';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.siteUrl}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  const featuredArticles = articles.slice(0, 6);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <SEO
        title={null}
        description={siteConfig.description}
        canonicalPath="/"
        schemaData={websiteSchema}
      />

      <main id="main-content" className="main-content">
        {/* ==================== HERO ==================== */}
        <section className="hero-section" aria-labelledby="hero-headline">
          <img
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80"
            alt="Bright, minimal small apartment living room with warm natural light, neat floating shelves, and organized storage"
            className="hero-bg-img"
            width="1800"
            height="1200"
            fetchpriority="high"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="container">
            <div className="hero-content">
              <span className="hero-kicker">
                <Sparkles size={13} aria-hidden="true" />
                Small-Space Home Organization
              </span>

              <h1 id="hero-headline" className="hero-headline">
                Make More of<br />
                <em>Your Space.</em>
              </h1>

              <p className="hero-subtext">
                Practical small-home organization ideas, smart storage solutions, and affordable
                ways to make every corner count — whether you're in a studio flat, student hostel,
                or compact rental.
              </p>

              <div className="hero-cta-row">
                <Link to="/small-bedroom-ideas" className="btn btn-primary">
                  <span>Explore Organization Ideas</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/storage-solutions" className="btn btn-secondary">
                  Browse Storage Solutions
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <ChevronDown size={16} />
            <span>Scroll to explore</span>
          </div>
        </section>

        {/* ==================== FEATURED CATEGORIES ==================== */}
        <section className="categories-section" aria-labelledby="categories-heading">
          <div className="container">
            <div className="section-header">
              <span className="section-kicker">Browse by Topic</span>
              <div className="section-header-row">
                <h2 id="categories-heading" className="section-title">
                  Find Your Organization Focus
                </h2>
                <Link to="/blog" className="section-view-all">
                  All Guides <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <p className="section-desc">
                From tight bedroom corners to chaotic rental closets — SpaceSmart covers the
                organization challenges real people face in compact spaces.
              </p>
            </div>

            <div className="categories-grid">
              {categories.map((cat) => (
                <Link key={cat.id} to={cat.path} className="category-card" aria-label={`Explore ${cat.name}`}>
                  <div className="category-card-img-wrap">
                    <img
                      src={cat.image}
                      alt={cat.imageAlt}
                      className="category-card-img"
                      loading="lazy"
                      width="600"
                      height="450"
                    />
                  </div>
                  <div className="category-card-body">
                    <h3 className="category-card-name">{cat.name}</h3>
                    <p className="category-card-desc">{cat.description.slice(0, 110)}…</p>
                    <span className="category-card-stats">
                      <ArrowRight size={13} aria-hidden="true" />
                      {cat.stats}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FEATURED GUIDES ==================== */}
        <section className="guides-section" aria-labelledby="guides-heading">
          <div className="container">
            <div className="section-header">
              <span className="section-kicker">Editorial Guides</span>
              <div className="section-header-row">
                <h2 id="guides-heading" className="section-title">
                  Start Here: Our Most-Read Guides
                </h2>
                <Link to="/blog" className="section-view-all">
                  All Articles <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <p className="section-desc">
                In-depth, practical guides covering the full range of small-space organization —
                from a first declutter to advanced vertical shelving systems.
              </p>
            </div>

            <div className="guides-grid">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== PRACTICAL TIPS ==================== */}
        <section className="tips-section" aria-labelledby="tips-heading">
          <div className="container">
            <div className="section-header">
              <span className="section-kicker">Quick Wins</span>
              <h2 id="tips-heading" className="section-title">
                Six Practical Tips to Apply Today
              </h2>
              <p className="section-desc">
                Small organizational shifts that take minutes but make a lasting difference in
                compact rooms, studio apartments, and shared rentals.
              </p>
            </div>

            <div className="tips-grid">
              {practicalTips.map((tip) => (
                <div key={tip.id} className="tip-card">
                  <span className="tip-card-tag">{tip.tag}</span>
                  <p className="tip-card-category">{tip.category}</p>
                  <h3 className="tip-card-title">{tip.title}</h3>
                  <p className="tip-card-body">{tip.description}</p>
                  <p className="tip-card-action">→ {tip.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== LATEST ARTICLES ==================== */}
        <section className="latest-section" aria-labelledby="latest-heading">
          <div className="container">
            <div className="section-header">
              <span className="section-kicker">Latest Published</span>
              <div className="section-header-row">
                <h2 id="latest-heading" className="section-title">
                  Recently Added Guides
                </h2>
                <Link to="/blog" className="section-view-all">
                  See All <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="latest-grid">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== NEWSLETTER ==================== */}
        <section className="newsletter-section" aria-labelledby="newsletter-heading">
          <div className="container">
            <div className="newsletter-box">
              <p className="newsletter-kicker">SpaceSmart Newsletter</p>
              <h2 id="newsletter-heading" className="newsletter-title">
                Compact Living Ideas, Weekly
              </h2>
              <p className="newsletter-desc">
                One focused organization guide or tip, delivered weekly. No product spam, no
                affiliate pressure — just genuinely useful advice for small-space living.
              </p>
              <div className="newsletter-demo-msg">
                <strong>Note:</strong> SpaceSmart is currently an independent editorial website
                without a backend mail service. Newsletter subscriptions are not yet active.
                Bookmark this site and check back for new guides published regularly.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
