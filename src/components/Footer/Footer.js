import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Standards", path: "/standards" },
    { name: "Comparison", path: "/comparison" },
    { name: "Processes", path: "/process" },
    { name: "Tools", path: "/tools" }
  ];

  const methodologies = [
    { name: "PMBOK Guide", path: "/standards/pmbok" },
    { name: "PRINCE2", path: "/standards/prince2" },
    { name: "ISO 21500", path: "/standards/iso21500" },
    { name: "Agile PM", path: "/standards/agile" }
  ];

  const resources = [
    { name: "Documentation", path: "/docs" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Blog", path: "/blog" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Webinars", path: "/webinars" }
  ];

  const company = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Support", path: "/support" }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "https://twitter.com", color: "#1DA1F2" },
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com", color: "#0077B5" },
    { name: "GitHub", icon: "💻", url: "https://github.com", color: "#333" },
    { name: "YouTube", icon: "📺", url: "https://youtube.com", color: "#FF0000" },
    { name: "Discord", icon: "💬", url: "https://discord.com", color: "#5865F2" }
  ];

  const features = [
    { icon: "🚀", text: "Fast & Reliable" },
    { icon: "🔒", text: "Secure Data" },
    { icon: "📈", text: "Always Updated" },
    { icon: "🌍", text: "Global Access" }
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">🚀</div>
              <div className="logo-text">
                <span className="logo-primary">Project</span>
                <span className="logo-secondary">Comparator</span>
              </div>
            </div>
            <p className="brand-description">
              Your comprehensive platform for comparing and analyzing project management methodologies. 
              Make informed decisions with our powerful comparison tools.
            </p>
            
            <div className="feature-badges">
              {features.map((feature, index) => (
                <div key={index} className="feature-badge">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest PM insights and updates</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            
            <div className="link-column">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h4>Methodologies</h4>
              <ul>
                {methodologies.map((method, index) => (
                  <li key={index}>
                    <Link to={method.path} className="footer-link">
                      {method.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h4>Resources</h4>
              <ul>
                {resources.map((resource, index) => (
                  <li key={index}>
                    <Link to={resource.path} className="footer-link">
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h4>Company</h4>
              <ul>
                {company.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} Project Management Comparator. All rights reserved.</p>
            </div>

            <div className="footer-legal">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <span className="divider">•</span>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <span className="divider">•</span>
              <Link to="/cookies" className="legal-link">Cookie Policy</Link>
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--social-color': social.color }}
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>

          </div>

          {/* Achievement Badges */}
          <div className="achievement-badges">
            <div className="badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">Trusted by 10K+ PMs</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Award Winning</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🔒</span>
              <span className="badge-text">GDPR Compliant</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Back to Top */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <span className="arrow-up">↑</span>
      </button>
    </footer>
  );
};

export default Footer;