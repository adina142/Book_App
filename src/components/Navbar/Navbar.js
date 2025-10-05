import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const standardsSubmenu = [
    { name: "PMBOK Guide", path: "/standards/pmbok" },
    { name: "PRINCE2", path: "/standards/prince2" },
    { name: "ISO 21500", path: "/standards/iso21500" },
    { name: "All Standards", path: "/standards" }
  ];

  const comparisonSubmenu = [
    { name: "Methodology Compare", path: "/comparison/methodologies" },
    { name: "Process Groups", path: "/comparison/processes" },
    { name: "Quick Compare", path: "/comparison/quick" }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <div className="logo-icon">🚀</div>
              <div className="logo-text">
                <span className="logo-primary">Project</span>
                <span className="logo-secondary">Comparator</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </li>

            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown("standards")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div 
                className={`nav-link ${location.pathname.includes("/standards") ? "active" : ""}`}
                onClick={() => toggleDropdown("standards")}
              >
                <span className="nav-icon">📚</span>
                Standards
                <span className="dropdown-arrow">▼</span>
              </div>
              {activeDropdown === "standards" && (
                <div className="dropdown-menu">
                  {standardsSubmenu.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="dropdown-item"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setActiveDropdown("comparison")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div 
                className={`nav-link ${location.pathname.includes("/comparison") ? "active" : ""}`}
                onClick={() => toggleDropdown("comparison")}
              >
                <span className="nav-icon">⚖️</span>
                Comparison
                <span className="dropdown-arrow">▼</span>
              </div>
              {activeDropdown === "comparison" && (
                <div className="dropdown-menu">
                  {comparisonSubmenu.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="dropdown-item"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="nav-item">
              <Link 
                to="/process" 
                className={`nav-link ${location.pathname === "/process" ? "active" : ""}`}
              >
                <span className="nav-icon">🔧</span>
                Processes
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          <div className="navbar-auth">
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                <span className="btn-icon">👤</span>
                Sign In
              </Link>
              <Link to="/register" className="btn-register">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
            >
              <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </Link>

            <div className="mobile-dropdown">
              <div 
                className="mobile-nav-link dropdown-toggle"
                onClick={() => toggleDropdown("mobile-standards")}
              >
                <span className="nav-icon">📚</span>
                Standards
                <span className="dropdown-arrow">▼</span>
              </div>
              {activeDropdown === "mobile-standards" && (
                <div className="mobile-dropdown-menu">
                  {standardsSubmenu.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="mobile-dropdown-item"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-dropdown">
              <div 
                className="mobile-nav-link dropdown-toggle"
                onClick={() => toggleDropdown("mobile-comparison")}
              >
                <span className="nav-icon">⚖️</span>
                Comparison
                <span className="dropdown-arrow">▼</span>
              </div>
              {activeDropdown === "mobile-comparison" && (
                <div className="mobile-dropdown-menu">
                  {comparisonSubmenu.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="mobile-dropdown-item"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/process" className="mobile-nav-link">
              <span className="nav-icon">🔧</span>
              Processes
            </Link>

            <div className="mobile-auth">
              <Link to="/login" className="btn-login-mobile">
                Sign In
              </Link>
              <Link to="/register" className="btn-register-mobile">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;