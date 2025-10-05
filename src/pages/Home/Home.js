import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Card from "../../components/Card/Card";

const Home = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    "Compare PMBOK, PRINCE2, and ISO standards",
    "Get tailored process recommendations",
    "Deep dive into methodology sections",
    "Make informed project decisions"
  ];

  const stats = [
    { number: "3", label: "Methodologies" },
    { number: "50+", label: "Process Groups" },
    { number: "1000+", label: "Sections" },
    { number: "24/7", label: "Access" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 Project Management Intelligence</span>
          </div>
          <h1 className="hero-title">
            Master Project Management
            <span className="gradient-text"> Methodologies</span>
          </h1>
          <p className="hero-subtitle">
            Compare, analyze, and implement PMBOK, PRINCE2, and ISO standards with confidence
          </p>
          
          <div className="feature-rotator">
            <div className="rotator-content">
              <span className="rotator-icon">✨</span>
              <span className="rotator-text">{features[currentFeature]}</span>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="visual-card card-1">
            <div className="card-glow"></div>
            <span>PMBOK</span>
          </div>
          <div className="visual-card card-2">
            <div className="card-glow"></div>
            <span>PRINCE2</span>
          </div>
          <div className="visual-card card-3">
            <div className="card-glow"></div>
            <span>ISO 21500</span>
          </div>
          <div className="connecting-line"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything You Need to Succeed</h2>
          <p>Powerful tools for project management professionals</p>
        </div>

        <div className="home-cards">
          <Card
            title="📚 Standards Library"
            description="Comprehensive collection of PM methodologies with deep section navigation and search"
            features={["Full text search", "Nested sections", "PDF references", "Version history"]}
            onClick={() => navigate("/standards")}
            accentColor="#667eea"
          />
          <Card
            title="⚖️ Smart Comparison"
            description="Side-by-side comparison of methodologies with highlighted differences and similarities"
            features={["Visual diff", "Export reports", "Custom comparisons", "Best practices"]}
            onClick={() => navigate("/comparison")}
            accentColor="#764ba2"
          />
          <Card
            title="🔧 Process Builder"
            description="Get AI-powered recommendations for your specific project context and requirements"
            features={["AI recommendations", "Custom workflows", "Template library", "Risk assessment"]}
            onClick={() => navigate("/process")}
            accentColor="#f093fb"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Project Management?</h2>
          <p>Join thousands of project managers who use our platform to make better decisions</p>
          <div className="cta-buttons">
            <button 
              className="cta-primary"
              onClick={() => navigate("/standards")}
            >
              Explore Standards
            </button>
            <button 
              className="cta-secondary"
              onClick={() => navigate("/comparison")}
            >
              Start Comparison
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="floating-help">
        <button className="help-button">
          <span>?</span>
        </button>
      </div>
    </div>
  );
};

export default Home;