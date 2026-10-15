import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission Column */}
          <div className="footer-brand-col">
            <h2 className="footer-brand-title">SpaceSmart</h2>
            <p className="footer-brand-tagline">Make More of Your Space.</p>
            <p className="footer-brand-desc">
              An independent home-organization publication dedicated to helping apartment renters,
              students, and compact homeowners design functional, clutter-free spaces affordably.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="footer-col-title">Categories</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/small-bedroom-ideas" className="footer-link">
                  Small Bedroom Ideas
                </Link>
              </li>
              <li>
                <Link to="/storage-solutions" className="footer-link">
                  Storage Solutions
                </Link>
              </li>
              <li>
                <Link to="/decluttering" className="footer-link">
                  Decluttering Guides
                </Link>
              </li>
              <li>
                <Link to="/budget-friendly-ideas" className="footer-link">
                  Budget-Friendly Ideas
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  All Articles Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & About Column */}
          <div>
            <h3 className="footer-col-title">Publication</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/about" className="footer-link">
                  About SpaceSmart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Editorial
                </Link>
              </li>
              <li>
                <Link to="/about#editorial-standards" className="footer-link">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link to="/about#renter-first" className="footer-link">
                  Renter-First Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethical Disclosure Column */}
          <div>
            <div className="footer-ethos-box">
              <h4 className="footer-ethos-title">Our Editorial Commitment</h4>
              <p className="footer-ethos-text">
                Every guide published on SpaceSmart focuses on realistic, affordable organization.
                We do not use sponsored product rankings or push expensive home renovations that
                renters cannot make.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} SpaceSmart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/about" className="footer-link">
              About
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <a href="/sitemap.xml" className="footer-link" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
