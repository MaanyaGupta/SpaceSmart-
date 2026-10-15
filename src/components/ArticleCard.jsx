import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { calculateReadingTime } from '../utils/readingTime';
import './ArticleCard.css';

export default function ArticleCard({ article, featured = false }) {
  if (!article) return null;

  const readingTime = calculateReadingTime(article);
  const articleUrl = `/article/${article.slug}`;

  return (
    <article className={featured ? 'article-card-featured' : 'article-card'}>
      <Link to={articleUrl} className="article-card-image-wrapper" tabIndex="-1" aria-hidden="true">
        <img
          src={article.heroImage}
          alt={article.heroImageAlt || article.title}
          className="article-card-image"
          loading="lazy"
          width="600"
          height="375"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </Link>

      <div className="article-card-content">
        <div className="article-card-meta">
          <Link to={article.categoryPath} className="article-card-category">
            {article.categoryName}
          </Link>
          <span className="article-card-reading-time">
            <Clock size={12} aria-hidden="true" />
            {readingTime} min read
          </span>
        </div>

        <h3 className="article-card-title">
          <Link to={articleUrl}>{article.title}</Link>
        </h3>

        <p className="article-card-excerpt">{article.excerpt}</p>

        <div className="article-card-footer">
          <span className="article-card-author">{article.author}</span>
          <Link to={articleUrl} className="article-card-cta" aria-label={`Read article: ${article.title}`}>
            <span>Read Guide</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
