import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Target, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import './About.css';

const values = [
  {
    id: 'practicality',
    icon: <Target size={20} />,
    name: 'Practical Over Aspirational',
    description:
      'Every guide is designed for real small-space constraints, not idealized homes featured in professional interiors shoots.',
  },
  {
    id: 'renter-first',
    icon: <ShieldCheck size={20} />,
    name: 'Renter-First Philosophy',
    description:
      'We only recommend solutions that respect lease restrictions. No advice that risks your security deposit or requires landlord approval.',
  },
  {
    id: 'honest-editorial',
    icon: <BookOpen size={20} />,
    name: 'Honest, Transparent Editorial',
    description:
      'SpaceSmart does not use sponsored rankings. We do not earn affiliate commissions on the organizational tools we reference.',
  },
  {
    id: 'accessible',
    icon: <Users size={20} />,
    name: 'Accessible to All Budgets',
    description:
      'We cover affordable, modular solutions first. We do not assume readers have access to custom carpentry or professional organizers.',
  },
  {
    id: 'editorial-standards',
    icon: <ShieldCheck size={20} />,
    name: 'Grounded Editorial Standards',
    description:
      'We do not publish invented statistics, fake expert credentials, or implausible before-and-after claims.',
  },
  {
    id: 'compact-living',
    icon: <Target size={20} />,
    name: 'Compact Living Specialists',
    description:
      'SpaceSmart focuses exclusively on small-space living — not general home improvement. Every article is scoped to compact apartments, bedrooms, and rental homes.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About SpaceSmart"
        description="SpaceSmart is an independent home-organization publication dedicated to helping renters, students, and apartment dwellers create functional, clutter-free small spaces affordably."
        canonicalPath="/about"
      />

      <main id="main-content" className="about-page main-content">
        {/* Header */}
        <header className="about-header">
          <div className="container">
            <Breadcrumbs items={[{ label: 'About' }]} />
            <div className="about-header-content">
              <p className="about-header-kicker">About SpaceSmart</p>
              <h1 className="about-header-title">
                A Publication For the Way People Actually Live
              </h1>
              <p className="about-header-desc">
                SpaceSmart exists for the millions of people living in studio apartments, student
                hostels, PG accommodations, and compact rental homes who want practical,
                damage-free organization advice that fits their actual budget and lease restrictions.
              </p>
            </div>
          </div>
        </header>

        {/* Mission & Editorial Body */}
        <section className="about-body">
          <div className="container">
            <div className="about-grid">
              {/* Main Prose */}
              <div className="about-prose">
                <h2>Why SpaceSmart Exists</h2>
                <p>
                  Most home organization content is produced for large homes with dedicated
                  mudrooms, walk-in closets, and the budget for custom cabinetry. That content is
                  not useful for someone living in a 250-square-foot studio apartment on a student
                  budget.
                </p>
                <p>
                  SpaceSmart was created to fill that gap. Every article addresses the genuine
                  constraints of compact living: restrictive leases, shared walls, limited natural
                  light, multi-purpose rooms, and the reality that most renters will move within
                  two to four years.
                </p>

                <h2 id="editorial-standards">Our Editorial Approach</h2>
                <p>
                  SpaceSmart is an independent editorial publication. Guides are written to be
                  genuinely useful rather than to promote specific products or earn affiliate
                  revenue. When we reference a type of product — such as tension rods or velvet
                  hangers — we describe the category and how it works rather than directing readers
                  toward a branded purchase.
                </p>
                <p>
                  We do not fabricate expert credentials, invent product-testing experiences, or
                  publish statistics that cannot be directly attributed to a verifiable source. When
                  something is our editorial opinion or general guidance, we write it as such.
                </p>

                <h2 id="renter-first">The Renter-First Commitment</h2>
                <p>
                  A significant portion of our readers live in homes they do not own, with
                  landlords who can legally deduct for wall damage, unauthorized fixtures, or
                  alterations. SpaceSmart explicitly scopes its advice to solutions that are
                  reversible, portable, and do not compromise the structural integrity of a rented
                  property.
                </p>
                <p>
                  Where we describe wall mounting or adhesive solutions, we include practical
                  guidance on installation, weight limits, and removal to minimize risk for renters.
                </p>

                <h2>Who Writes for SpaceSmart</h2>
                <p>
                  SpaceSmart is currently an editorial project produced by a small founding team.
                  All guides are original, written for this publication, and reviewed for accuracy
                  before publishing. We do not republish, license, or adapt other publications'
                  content.
                </p>
              </div>

              {/* Sidebar */}
              <aside aria-label="Quick about reference">
                <div className="about-sidebar-card">
                  <h3 className="about-sidebar-card-title">What SpaceSmart Covers</h3>
                  <ul className="about-sidebar-list">
                    {[
                      'Studio and one-bedroom apartment organization',
                      'Small bedroom layouts and storage',
                      'Compact wardrobe and closet systems',
                      'Under-bed and vertical storage solutions',
                      'Decluttering methods for tight quarters',
                      'Damage-free, rental-safe organization',
                      'Budget-conscious storage upgrades',
                      'Student hostel and PG room organization',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="about-sidebar-bullet" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about-sidebar-card">
                  <h3 className="about-sidebar-card-title">What SpaceSmart Does Not Cover</h3>
                  <ul className="about-sidebar-list">
                    {[
                      'Large home remodeling or custom built-ins',
                      'Product reviews or affiliate-driven rankings',
                      'Professional staging or interior design fees',
                      'Permanent renovations requiring permits',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="about-sidebar-bullet" style={{ background: 'var(--text-muted)' }} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: '1.5rem', background: 'var(--color-accent-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(118,149,129,0.3)' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    Have a question or feedback?
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    We'd love to hear from readers about what topics to cover next.
                  </p>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Contact Editorial
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="about-values-section" aria-labelledby="values-heading">
          <div className="container">
            <h2 id="values-heading" className="about-values-title">
              Editorial Principles
            </h2>
            <div className="about-values-grid">
              {values.map((v) => (
                <div key={v.id} className="about-value-card" id={v.id}>
                  <div className="about-value-icon" aria-hidden="true">
                    {v.icon}
                  </div>
                  <h3 className="about-value-name">{v.name}</h3>
                  <p className="about-value-desc">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
