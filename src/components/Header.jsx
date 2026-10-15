import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, Home, Compass, Layers, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import './Header.css';

export default function Header({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Keyboard shortcut Ctrl+K or '/' to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container header-container">
          {/* SpaceSmart Wordmark */}
          <Link to="/" className="brand-link" aria-label="SpaceSmart Homepage">
            <div className="brand-icon" aria-hidden="true">
              <Layers size={18} strokeWidth={2.4} />
            </div>
            <div className="brand-text-group">
              <span className="brand-title">SpaceSmart</span>
              <span className="brand-tagline">Make More of Your Space</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink
              to="/small-bedroom-ideas"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Bedrooms
            </NavLink>
            <NavLink
              to="/storage-solutions"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Storage
            </NavLink>
            <NavLink
              to="/decluttering"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Decluttering
            </NavLink>
            <NavLink
              to="/budget-friendly-ideas"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Budget Ideas
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              All Articles
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Actions: Search Button & Mobile Toggle */}
          <div className="header-actions">
            <button
              type="button"
              className="search-trigger-btn"
              onClick={onOpenSearch}
              aria-label="Search articles"
            >
              <Search size={16} aria-hidden="true" />
              <span>Search</span>
              <kbd className="search-kbd" aria-hidden="true">
                /
              </kbd>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <Link
            to="/"
            className="brand-link"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="SpaceSmart Homepage"
          >
            <div className="brand-icon" aria-hidden="true">
              <Layers size={16} strokeWidth={2.4} />
            </div>
            <div className="brand-text-group">
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>
                SpaceSmart
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Primary Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Home</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/small-bedroom-ideas"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Small Bedroom Ideas</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/storage-solutions"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Storage Solutions</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/decluttering"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Decluttering Guides</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/budget-friendly-ideas"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Budget-Friendly Ideas</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>All Articles</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>About SpaceSmart</span>
            <ChevronRight size={16} />
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Contact</span>
            <ChevronRight size={16} />
          </NavLink>
        </nav>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
          >
            <Search size={16} />
            <span>Search Articles</span>
          </button>
        </div>
      </div>
    </>
  );
}
