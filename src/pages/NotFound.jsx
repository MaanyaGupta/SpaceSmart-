import { Link } from 'react-router-dom';
import { HomeIcon, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for could not be found. Browse our guides on small-space organization below."
        canonicalPath="/404"
      />

      <main id="main-content" className="notfound-page main-content">
        <div className="container notfound-container">
          <div className="notfound-code" aria-hidden="true">404</div>
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-desc">
            The guide or page you're looking for doesn't seem to exist. It may have moved, or the
            URL might be incorrect.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">
              <HomeIcon size={16} aria-hidden="true" />
              Return Home
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              Browse All Guides
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
