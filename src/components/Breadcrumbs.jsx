import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import './Breadcrumbs.css';

/**
 * Semantic Breadcrumb component supporting Schema.org BreadcrumbList microdata
 * @param {Array<{ label: string, path?: string }>} items
 */
export default function Breadcrumbs({ items = [] }) {
  const fullItems = [{ label: 'Home', path: '/' }, ...items];

  // Build JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path
        ? `${siteConfig.siteUrl.replace(/\/$/, '')}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
        <ol className="breadcrumbs-list">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li key={index} className="breadcrumb-item">
                {index > 0 && <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />}
                {isLast || !item.path ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="breadcrumb-link">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
