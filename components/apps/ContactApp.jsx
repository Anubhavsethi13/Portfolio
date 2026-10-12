import React, { useState } from 'react';

export default function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nSender Email: ${email}`);
    const mailtoUrl = `mailto:aanubhavsethi2405@gmail.com?subject=${subject}&body=${body}`;
    
    // Trigger redirect
    window.location.href = mailtoUrl;
    
    setSubmitted(true);
  };

  const socialLinks = [
    { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/anubhav-sethi13/' },
    { label: 'Behance', icon: 'Be', href: 'https://www.behance.net/anubhavsethi1' },
    { label: 'GitHub', icon: 'GH', href: 'https://github.com/Anubhavsethi13' },
  ];

  return (
    <div className="contact-layout">
      <div className="contact-header">
        <h2 className="contact-title font-display">
          New Message
        </h2>
        <p className="contact-to-field">
          To: aanubhavsethi2405@gmail.com
        </p>
      </div>

      {submitted ? (
        <div className="contact-success-card">
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[var(--accent)] fill-none stroke-2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <h3 className="contact-success-title">Opening Email Client</h3>
          <p className="contact-success-desc">
            Redirecting to your mail client with your pre-filled inquiry. Feel free to submit the email to send the message!
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', message: '' });
            }}
            className="contact-reset-btn"
            style={{ marginTop: '8px' }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label className="contact-label">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="contact-input"
              placeholder="John Doe"
            />
          </div>

          <div className="contact-form-group">
            <label className="contact-label">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="contact-input"
              placeholder="john@example.com"
            />
          </div>

          <div className="contact-form-group">
            <label className="contact-label">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="contact-textarea"
              placeholder="Hey Anubhav, I have an interesting project..."
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
          >
            <span>Send Message</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}

      {/* Footer Social Links */}
      <div className="contact-socials-section">
        <span className="contact-socials-title">
          Or connect via socials
        </span>
        <div className="contact-socials-row">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="contact-social-link"
            >
              <span className="contact-social-icon">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
