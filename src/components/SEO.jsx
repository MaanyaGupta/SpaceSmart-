import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

/**
 * SEO metadata component that dynamically synchronizes HTML head tags,
 * canonical URLs, Open Graph, Twitter cards, and Schema.org JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  schemaData = null,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const fullDescription = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const defaultImage =
    'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1200&q=80';
  const metaImage = ogImage || defaultImage;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMetaTag('name', 'description', fullDescription);
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Open Graph
    setMetaTag('property', 'og:site_name', siteConfig.name);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', fullDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', metaImage);

    // 5. Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', fullDescription);
    setMetaTag('name', 'twitter:image', metaImage);

    // 6. Structured Data (JSON-LD)
    const scriptId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const defaultWebsiteSchema = {
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

    const finalSchema = schemaData || defaultWebsiteSchema;
    scriptTag.textContent = JSON.stringify(finalSchema, null, 2);

    return () => {
      // Keep state clean on unmount if needed
    };
  }, [fullTitle, fullDescription, canonicalUrl, ogType, metaImage, schemaData]);

  return null;
}
