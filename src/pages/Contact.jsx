import { useState } from 'react';
import { Mail, BookOpen, MessageSquare, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import './Contact.css';

const REASONS = [
  'Suggest a guide topic',
  'Request a specific organization challenge',
  'Report a factual error',
  'General feedback',
  'Press or media inquiry',
  'Other',
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Name is required.';
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      errs.email = 'A valid email address is required.';
    if (!formState.message.trim() || formState.message.trim().length < 20)
      errs.message = 'Please provide at least 20 characters of detail.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // No backend: simulate a successful submission for demo
    setSubmitted(true);
    setFormState({ name: '', email: '', reason: '', message: '' });
    setErrors({});
  };

  return (
    <>
      <SEO
        title="Contact SpaceSmart Editorial"
        description="Get in touch with the SpaceSmart editorial team to suggest guide topics, report errors, or share feedback about compact-space organization."
        canonicalPath="/contact"
      />

      <main id="main-content" className="contact-page main-content">
        {/* Header */}
        <header className="contact-header">
          <div className="container">
            <Breadcrumbs items={[{ label: 'Contact' }]} />
            <p className="contact-header-kicker">Get in Touch</p>
            <h1 className="contact-header-title">Contact SpaceSmart Editorial</h1>
            <p className="contact-header-desc">
              We'd love to hear from readers. Whether you want to suggest a guide topic, point out
              an error, or share feedback on an article, we're listening.
            </p>
          </div>
        </header>

        {/* Body */}
        <section className="contact-body">
          <div className="container">
            <div className="contact-layout">
              {/* Info Cards */}
              <div>
                <div className="contact-info-card">
                  <div className="contact-info-icon" aria-hidden="true">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="contact-info-title">Suggest a Guide Topic</h3>
                    <p className="contact-info-desc">
                      Facing a specific small-space challenge not covered on SpaceSmart? Let us
                      know. Reader requests directly inform our editorial calendar.
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon" aria-hidden="true">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="contact-info-title">Factual Corrections</h3>
                    <p className="contact-info-desc">
                      If you find a factual error or outdated advice in any SpaceSmart guide, please
                      report it and we will review and update the article promptly.
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon" aria-hidden="true">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="contact-info-title">Editorial & Press</h3>
                    <p className="contact-info-desc">
                      For media inquiries or editorial collaborations, please use the contact form
                      and select "Press or media inquiry" as your reason.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--surface-warm-light)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem 1.5rem',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>Response times:</strong>{' '}
                  SpaceSmart is currently an independent project. We aim to respond to reader
                  messages within 5 to 10 business days, with priority given to factual
                  corrections.
                </div>
              </div>

              {/* Form Card */}
              <div>
                <div className="contact-form-card">
                  <h2 className="contact-form-title">Send a Message</h2>
                  <p className="contact-form-subtitle">
                    Please include as much relevant detail as possible.
                  </p>

                  {submitted && (
                    <div className="contact-success-banner" role="alert">
                      <CheckCircle2 size={22} color="var(--color-accent)" aria-hidden="true" />
                      <div>
                        <p className="contact-success-title">Message received — thank you!</p>
                        <p className="contact-success-desc">
                          <strong>Note:</strong> This is a demo interaction — SpaceSmart does not
                          yet have a backend mail service. Your message was not transmitted. To
                          contribute a real question, bookmark this site and check back when the
                          contact form is connected.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name<span className="form-label-required" aria-label="required">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className="form-input"
                        value={formState.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="form-hint" style={{ color: '#B85C5C' }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Email Address<span className="form-label-required" aria-label="required">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="form-input"
                        value={formState.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="form-hint" style={{ color: '#B85C5C' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-reason" className="form-label">
                        Reason for Contact
                      </label>
                      <select
                        id="contact-reason"
                        name="reason"
                        className="form-select"
                        value={formState.reason}
                        onChange={handleChange}
                      >
                        <option value="">Select a reason…</option>
                        {REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        Message<span className="form-label-required" aria-label="required">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        className="form-textarea"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Describe your topic suggestion, feedback, or question in detail…"
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      />
                      <p id="message-hint" className="form-hint">
                        Minimum 20 characters. Include specific details so we can best respond.
                      </p>
                      {errors.message && (
                        <p id="message-error" className="form-hint" style={{ color: '#B85C5C' }}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="form-submit-row">
                      <p className="contact-disclaimer">
                        We do not share your email or personal information with any third parties.
                      </p>
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
