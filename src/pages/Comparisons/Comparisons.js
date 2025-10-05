import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./Comparisons.css";

const Comparisons = () => {
  const { data: comparisonsData, loading: comparisonsLoading, error: comparisonsError } = useFetch("/comparisons");
  const { data: standardsData, loading: standardsLoading, error: standardsError } = useFetch("/standards/all");
  const navigate = useNavigate();
  
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [comparisonMode, setComparisonMode] = useState("browse");
  const [topicSearchTerm, setTopicSearchTerm] = useState("");
  const [activeInsightTab, setActiveInsightTab] = useState("similarities");

  // Available topics for comparison
  const comparisonTopics = [
    "Risk Management",
    "Stakeholder Engagement",
    "Quality Management",
    "Project Planning",
    "Change Management",
    "Resource Management",
    "Communication Management",
    "Procurement Management",
    "Integration Management",
    "Scope Management",
    "Time Management",
    "Cost Management"
  ];

  // Filter topics based on search
  const filteredTopics = comparisonTopics.filter(topic =>
    topic.toLowerCase().includes(topicSearchTerm.toLowerCase())
  );

  // Handle standards data
  let standards = [];
  
  if (standardsData) {
    if (Array.isArray(standardsData.data)) {
      standards = standardsData.data;
    } else if (Array.isArray(standardsData)) {
      standards = standardsData;
    }
  }

  console.log("Available Standards:", standards.map(s => ({ slug: s.slug, title: s.title })));

  // Enhanced section matching with predefined relevant sections
  const getRelevantSections = (standardSlug, topic) => {
    const standard = standards.find(s => s.slug === standardSlug);
    if (!standard || !standard.sections) return [];

    // Predefined section mappings for each standard and topic
    const sectionMappings = {
      pmbok7: {
        "Risk Management": ["4.8", "3.10"], // Uncertainty Performance Domain, Optimize Risk Responses
        "Stakeholder Engagement": ["4.1", "3.3"], // Stakeholder Performance Domain, Engage with Stakeholders
        "Quality Management": ["3.8", "4.4"], // Build Quality, Planning Performance Domain
        "Project Planning": ["4.4", "3.7"], // Planning Performance Domain, Tailoring
        "Change Management": ["3.12", "4.5"], // Enable Change, Project Work Performance Domain
        "Resource Management": ["4.2", "3.2"], // Team Performance Domain, Collaborative Environment
        "Communication Management": ["4.1", "3.3"], // Stakeholder Performance Domain, Engage with Stakeholders
        "Procurement Management": ["4.5"], // Project Work Performance Domain
        "Integration Management": ["4.5", "2.3"], // Project Work Performance Domain, Functions
        "Scope Management": ["4.4", "4.5"], // Planning Performance Domain, Project Work
        "Time Management": ["4.4", "4.5"], // Planning Performance Domain, Project Work
        "Cost Management": ["4.4", "4.5"]  // Planning Performance Domain, Project Work
      },
      prince2: {
        "Risk Management": ["9"],
        "Stakeholder Engagement": ["6", "11"],
        "Quality Management": ["8"],
        "Project Planning": ["7"],
        "Change Management": ["10"],
        "Resource Management": ["6"],
        "Communication Management": ["6", "11"],
        "Procurement Management": ["6"],
        "Integration Management": ["12", "13"],
        "Scope Management": ["7", "10"],
        "Time Management": ["7", "11"],
        "Cost Management": ["7", "11"]
      },
      iso21500: {
        "Risk Management": ["4"],
        "Stakeholder Engagement": ["4"],
        "Quality Management": ["4"],
        "Project Planning": ["4"],
        "Change Management": ["4"],
        "Resource Management": ["4"],
        "Communication Management": ["4"],
        "Procurement Management": ["4"],
        "Integration Management": ["4.6"],
        "Scope Management": ["4"],
        "Time Management": ["4"],
        "Cost Management": ["4"]
      }
    };

    const relevantSectionIds = sectionMappings[standardSlug]?.[topic] || [];
    const relevantSections = [];

    const findSectionById = (sections, targetId) => {
      for (const section of sections) {
        if (section.id === targetId) {
          return section;
        }
        if (section.subsections) {
          const found = findSectionById(section.subsections, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    relevantSectionIds.forEach(sectionId => {
      const section = findSectionById(standard.sections, sectionId);
      if (section) {
        relevantSections.push({
          ...section,
          relevanceScore: 90 // High relevance for predefined mappings
        });
      }
    });

    // Fallback: Search for relevant sections if no predefined mappings found
    if (relevantSections.length === 0) {
      const fallbackSections = findRelevantSectionsByContent(standard, topic);
      relevantSections.push(...fallbackSections);
    }

    return relevantSections.slice(0, 5); // Limit to top 5 sections
  };

  const findRelevantSectionsByContent = (standard, topic) => {
    if (!standard.sections || !Array.isArray(standard.sections)) return [];
    
    const relevant = [];
    const searchSections = (sections, depth = 0) => {
      sections.forEach(section => {
        const relevanceScore = calculateRelevance(section, topic);
        if (relevanceScore > 0) {
          relevant.push({
            ...section,
            relevanceScore,
            depth
          });
        }
        if (section.subsections) {
          searchSections(section.subsections, depth + 1);
        }
      });
    };
    
    searchSections(standard.sections);
    return relevant.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
  };

  const calculateRelevance = (section, topic) => {
    if (!section) return 0;
    
    let score = 0;
    const topicWords = topic.toLowerCase().split(' ');
    
    topicWords.forEach(word => {
      if (section.title?.toLowerCase().includes(word)) score += 10;
      if (section.text?.toLowerCase().includes(word)) score += 5;
      if (section.subsections?.some(sub => sub.title?.toLowerCase().includes(word))) score += 3;
    });
    
    return score;
  };

  const getStandardApproach = (slug) => {
    const approaches = {
      pmbok7: "Process-based framework with 12 principles and 8 performance domains focusing on value delivery through tailored approaches",
      prince2: "Structured methodology with 7 principles, 7 themes, and 7 processes emphasizing business justification and controlled stage management",
      iso21500: "International guidance standard providing high-level framework for project management concepts applicable across all organization types"
    };
    return approaches[slug] || "Standard project management approach";
  };

  const getStandardFocus = (slug) => {
    const focuses = {
      pmbok7: "Value delivery through principles-based framework and performance domains with emphasis on tailoring and adaptability",
      prince2: "Business case-driven approach with strong governance, stage controls, and product-based planning",
      iso21500: "Universal guidance and best practices that can be adapted to any organizational context or project type"
    };
    return focuses[slug] || "Project management best practices and guidance";
  };

  // Generate comprehensive comparison for a topic
  const generateComparison = (topic) => {
    console.log("Generating comparison for topic:", topic);

    const comparison = {
      title: `${topic} Comparison`,
      topic: topic,
      standards: {
        pmbok7: { sections: [], approach: "", focus: "" },
        prince2: { sections: [], approach: "", focus: "" },
        iso21500: { sections: [], approach: "", focus: "" }
      },
      insights: {
        similarities: [],
        differences: [],
        uniquePoints: []
      },
      recommendations: []
    };

    // Generate data for each standard
    standards.forEach(standard => {
      console.log(`Processing standard: ${standard.slug}`);
      const relevantSections = getRelevantSections(standard.slug, topic);
      comparison.standards[standard.slug] = {
        sections: relevantSections,
        approach: getStandardApproach(standard.slug),
        focus: getStandardFocus(standard.slug)
      };
      console.log(`Sections found for ${standard.slug}:`, relevantSections.length);
    });

    // Generate comprehensive insights
    comparison.insights = generateComprehensiveInsights(topic);
    comparison.recommendations = generateRecommendations(topic);
    
    return comparison;
  };

  const generateComprehensiveInsights = (topic) => {
    // Comprehensive insights for each topic
    const topicInsights = {
      "Risk Management": {
        similarities: [
          "All methodologies require formal risk identification and assessment processes",
          "Risk monitoring and control throughout project lifecycle is mandatory",
          "Documentation of risk responses and mitigation strategies required",
          "Stakeholder involvement in risk management emphasized",
          "Proactive risk management approach recommended"
        ],
        differences: [
          "PMBOK: Detailed quantitative and qualitative analysis techniques with specific risk categories",
          "PRINCE2: Integrated risk management theme with explicit risk budget and tolerance levels",
          "ISO 21500: High-level guidance without prescribed techniques, focused on principles",
          "PMBOK separates risk management into dedicated processes and performance domains",
          "PRINCE2 embeds risk management throughout all processes with specific risk checkpoints"
        ],
        uniquePoints: [
          "PMBOK ONLY: Monte Carlo simulation, decision tree analysis, and detailed quantitative methods",
          "PRINCE2 ONLY: Risk budget concept for financial risk allocation and early warning indicators",
          "ISO 21500 ONLY: Direct alignment with ISO 31000 risk management standard framework",
          "PMBOK ONLY: Specific risk breakdown structure and detailed categorization system",
          "PRINCE2 ONLY: Risk management strategy document and formal risk review meetings"
        ]
      },
      "Stakeholder Engagement": {
        similarities: [
          "Stakeholder identification and analysis is fundamental initial activity",
          "Communication planning required for effective stakeholder management",
          "Regular engagement and expectation management throughout project lifecycle",
          "Documentation of stakeholder analysis and engagement strategies",
          "Focus on managing stakeholder expectations and communications"
        ],
        differences: [
          "PMBOK: Dedicated stakeholder performance domain with specific engagement assessment matrix",
          "PRINCE2: Business stakeholder focus with communication management strategy and project board representation",
          "ISO 21500: General guidance on stakeholder concepts without specific processes",
          "PMBOK uses power/interest grid and detailed stakeholder classification",
          "PRINCE2 emphasizes specific roles (Executive, Senior User) for stakeholder representation"
        ],
        uniquePoints: [
          "PMBOK ONLY: Stakeholder engagement assessment matrix with five engagement levels",
          "PRINCE2 ONLY: Specific communication management strategy document and project board structure",
          "ISO 21500 ONLY: International perspective on cultural and diverse stakeholder environments",
          "PMBOK ONLY: Formal stakeholder engagement control and monitoring processes",
          "PRINCE2 ONLY: Daily Log for informal stakeholder communications and issues"
        ]
      },
      "Quality Management": {
        similarities: [
          "Quality planning required before project execution begins",
          "Quality control through verification and validation activities mandatory",
          "Continuous improvement principles embedded in quality approach",
          "Quality standards and acceptance criteria must be defined",
          "Documentation of quality management processes and results"
        ],
        differences: [
          "PMBOK: Quality management separated into planning, assurance, and control processes",
          "PRINCE2: Quality integrated as a theme with product descriptions and quality register",
          "ISO 21500: Quality aligned with ISO 9001 quality management systems approach",
          "PMBOK emphasizes cost of quality and statistical tools for quality control",
          "PRINCE2 focuses on product quality through quality criteria in product descriptions"
        ],
        uniquePoints: [
          "PMBOK ONLY: Seven basic quality tools and design of experiments techniques",
          "PRINCE2 ONLY: Product-based planning with explicit quality criteria in product descriptions",
          "ISO 21500 ONLY: Direct alignment with ISO 9001 quality management principles",
          "PMBOK ONLY: Quality metrics and detailed control charts for process control",
          "PRINCE2 ONLY: Quality review technique and project assurance responsibilities"
        ]
      },
      "Project Planning": {
        similarities: [
          "Comprehensive planning before project execution is essential",
          "Planning should be iterative and adaptable to changes",
          "Multiple planning levels (high-level to detailed) recommended",
          "Stakeholder involvement in planning process emphasized",
          "Documentation of planning assumptions and constraints required"
        ],
        differences: [
          "PMBOK: Planning as a performance domain with emphasis on iterative planning approaches",
          "PRINCE2: Product-based planning with stage plans and exception planning",
          "ISO 21500: General guidance on planning concepts and principles",
          "PMBOK focuses on adaptive planning and tailoring based on project context",
          "PRINCE2 uses product breakdown structures and detailed product descriptions"
        ],
        uniquePoints: [
          "PMBOK ONLY: Rolling wave planning and detailed planning performance domain guidance",
          "PRINCE2 ONLY: Product-based planning technique and stage boundary management",
          "ISO 21500 ONLY: International standardization of planning concepts and terminology",
          "PMBOK ONLY: Planning tailored to project complexity and development approach",
          "PRINCE2 ONLY: Exception plans for managing deviations from agreed tolerances"
        ]
      }
    };

    return topicInsights[topic] || {
      similarities: [
        "Common project management principles and systematic approaches",
        "Emphasis on structured processes and controlled execution",
        "Focus on delivering project objectives and business benefits",
        "Importance of documentation and communication management",
        "Adaptive approaches based on project context and complexity"
      ],
      differences: [
        "Different terminology, process structures, and methodology frameworks",
        "Varying levels of prescription, flexibility, and organizational focus",
        "Distinct governance structures and decision-making approaches",
        "Different emphasis on documentation, formalization, and control mechanisms",
        "Varied approaches to tailoring and methodology adaptation"
      ],
      uniquePoints: [
        "Each methodology offers specialized techniques, tools, and focus areas",
        "Different cultural, organizational, and industry contexts addressed",
        "Varied emphasis on business justification, value delivery, and principles",
        "Unique governance models and organizational structures supported",
        "Specific certification paths and professional development frameworks"
      ]
    };
  };

  const generateRecommendations = (topic) => {
    const recommendations = {
      "Risk Management": [
        "Use PMBOK for complex projects requiring detailed quantitative risk analysis and specific risk categories",
        "Apply PRINCE2 for organizations with strong governance requirements and explicit risk budgeting",
        "Reference ISO 21500 for organizations new to formal risk management or needing high-level guidance",
        "Combine PMBOK risk analysis techniques with PRINCE2 governance for comprehensive coverage",
        "Use ISO 21500 as foundation and supplement with specific techniques based on project complexity"
      ],
      "Stakeholder Engagement": [
        "PMBOK provides most comprehensive stakeholder analysis and engagement assessment techniques",
        "PRINCE2 offers clear business stakeholder accountability through project board structure",
        "ISO 21500 suitable for international projects with diverse cultural stakeholder environments",
        "Use PMBOK stakeholder matrix for complex stakeholder environments and engagement planning",
        "Apply PRINCE2 communication strategy for organizations requiring formal governance reporting"
      ],
      "Quality Management": [
        "PMBOK offers detailed quality tools, techniques, and statistical process control methods",
        "PRINCE2 provides excellent product-focused quality approach with clear acceptance criteria",
        "ISO 21500 ideal for organizations already using ISO 9001 quality management systems",
        "Combine PMBOK quality control techniques with PRINCE2 product descriptions for comprehensive quality",
        "Use ISO 21500 as quality management system foundation and add specific techniques as needed"
      ],
      "Project Planning": [
        "PMBOK suitable for adaptive planning approaches and complex, changing environments",
        "PRINCE2 excellent for organizations requiring strict stage controls and product-based planning",
        "ISO 21500 provides solid foundation for organizations new to formal project planning",
        "Use PMBOK for projects requiring high flexibility and iterative planning approaches",
        "Apply PRINCE2 for projects with clear deliverables and strong governance requirements"
      ]
    };

    return recommendations[topic] || [
      "Select methodology based on organizational maturity, project complexity, and industry context",
      "Consider combining elements from multiple methodologies for optimal project coverage",
      "Tailor the approach based on specific project requirements, constraints, and stakeholder needs",
      "Evaluate organizational culture and existing processes when selecting methodology",
      "Consider certification requirements and team expertise in methodology selection"
    ];
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setComparisonMode("results");
    const newComparison = generateComparison(topic);
    setSelectedComparison(newComparison);
  };

  const handleCreateComparison = () => {
    if (!selectedTopic) {
      alert("Please select a topic first");
      return;
    }
    handleTopicSelect(selectedTopic);
  };

  const clearTopicSearch = () => {
    setTopicSearchTerm("");
  };

  // Navigate to standard section with highlighting
  const navigateToSection = (standardSlug, sectionId) => {
    navigate(`/standards?standard=${standardSlug}&section=${sectionId}&highlight=true`);
  };

  // Render section with deep linking
  const renderSectionLink = (section, standardSlug) => (
    <div 
      key={section.id}
      className="section-link"
      onClick={() => navigateToSection(standardSlug, section.id)}
    >
      <span className="section-id">{section.id}</span>
      <span className="section-title">{section.title}</span>
      {section.text && (
        <span className="section-preview">
          {section.text.length > 100 ? section.text.substring(0, 100) + "..." : section.text}
        </span>
      )}
      <span className="link-icon">🔗</span>
      <span className="relevance-badge">
        {Math.min(section.relevanceScore || 80, 100)}% relevant
      </span>
    </div>
  );

  const loading = comparisonsLoading || standardsLoading;
  const error = comparisonsError || standardsError;

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Comparison Engine...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Unable to load comparison data</h3>
      <p>{error}</p>
      <button className="retry-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="comparisons-container">
      {/* Header Section */}
      <div className="comparisons-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">⚖️</span>
            Comparison Engine
          </h1>
          <p className="page-subtitle">
            Compare project management methodologies side-by-side with deep linking to standards
          </p>
        </div>
      </div>

      {/* Main Comparison Interface */}
      <div className="comparison-engine">
        {/* Topic Selection */}
        {comparisonMode === "browse" && (
          <div className="topic-selection">
            <div className="selection-header">
              <h2>Select Comparison Topic</h2>
              <p>Choose a topic to compare across PMBOK, PRINCE2, and ISO 21500 standards</p>
            </div>

            {/* Topic Search Bar */}
            <div className="topic-search-container">
              <div className="search-box-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search comparison topics..."
                  value={topicSearchTerm}
                  onChange={(e) => setTopicSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
                {topicSearchTerm && (
                  <button 
                    className="clear-search"
                    onClick={clearTopicSearch}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="search-stats">
                <span className="topics-count">
                  {filteredTopics.length} of {comparisonTopics.length} topics
                </span>
                {topicSearchTerm && (
                  <span className="search-term">
                    Matching: "{topicSearchTerm}"
                  </span>
                )}
              </div>
            </div>

            <div className="topics-grid">
              {filteredTopics.length > 0 ? (
                filteredTopics.map(topic => (
                  <div 
                    key={topic}
                    className={`topic-card ${selectedTopic === topic ? 'selected' : ''}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="topic-icon">
                      {getTopicIcon(topic)}
                    </div>
                    <h3>{topic}</h3>
                    <p>Compare across all methodologies</p>
                    <div className="standards-indicator">
                      <span className="standard-dot pmbok"></span>
                      <span className="standard-dot prince2"></span>
                      <span className="standard-dot iso"></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-topics-found">
                  <div className="no-topics-icon">🔍</div>
                  <h3>No topics found</h3>
                  <p>No comparison topics match "{topicSearchTerm}"</p>
                  <button 
                    className="action-btn outline"
                    onClick={clearTopicSearch}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            <div className="selection-actions">
              <button 
                className="action-btn primary large"
                onClick={handleCreateComparison}
                disabled={!selectedTopic}
              >
                Generate Comparison
              </button>
              {selectedTopic && (
                <div className="selected-topic-info">
                  <span className="selected-label">Selected:</span>
                  <span className="selected-topic">{selectedTopic}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {comparisonMode === "results" && selectedComparison && (
          <div className="comparison-results">
            <div className="results-header">
              <div className="header-info">
                <h2>{selectedComparison.title}</h2>
                <p>Side-by-side comparison of {selectedComparison.topic} across methodologies</p>
              </div>
              <div className="header-actions">
                <button 
                  className="action-btn outline"
                  onClick={() => setComparisonMode("browse")}
                >
                  ← Back to Topics
                </button>
                <button className="action-btn primary">
                  Export Report
                </button>
              </div>
            </div>

            {/* Standards Comparison Grid */}
            <div className="standards-comparison">
              <div className="comparison-grid">
                {/* Headers */}
                <div className="grid-header"></div>
                <div className="grid-header standard-header pmbok">
                  <div className="standard-icon">📚</div>
                  <h3>PMBOK Guide</h3>
                </div>
                <div className="grid-header standard-header prince2">
                  <div className="standard-icon">👑</div>
                  <h3>PRINCE2</h3>
                </div>
                <div className="grid-header standard-header iso">
                  <div className="standard-icon">🌍</div>
                  <h3>ISO 21500</h3>
                </div>

                {/* Approach Row */}
                <div className="grid-label">
                  <h4>Approach</h4>
                </div>
                <div className="grid-cell">
                  <div className="approach-description">
                    {selectedComparison.standards.pmbok7.approach}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="approach-description">
                    {selectedComparison.standards.prince2.approach}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="approach-description">
                    {selectedComparison.standards.iso21500.approach}
                  </div>
                </div>

                {/* Key Sections Row */}
                <div className="grid-label">
                  <h4>Relevant Sections</h4>
                  <small>Click to view in standards</small>
                </div>
                <div className="grid-cell">
                  <div className="sections-list">
                    {selectedComparison.standards.pmbok7.sections.length > 0 ? (
                      selectedComparison.standards.pmbok7.sections.map(section => 
                        renderSectionLink(section, 'pmbok7')
                      )
                    ) : (
                      <div className="no-sections">No relevant sections found</div>
                    )}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="sections-list">
                    {selectedComparison.standards.prince2.sections.length > 0 ? (
                      selectedComparison.standards.prince2.sections.map(section => 
                        renderSectionLink(section, 'prince2')
                      )
                    ) : (
                      <div className="no-sections">No relevant sections found</div>
                    )}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="sections-list">
                    {selectedComparison.standards.iso21500.sections.length > 0 ? (
                      selectedComparison.standards.iso21500.sections.map(section => 
                        renderSectionLink(section, 'iso21500')
                      )
                    ) : (
                      <div className="no-sections">No relevant sections found</div>
                    )}
                  </div>
                </div>

                {/* Focus Area Row */}
                <div className="grid-label">
                  <h4>Focus Area</h4>
                </div>
                <div className="grid-cell">
                  <div className="focus-description">
                    {selectedComparison.standards.pmbok7.focus}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="focus-description">
                    {selectedComparison.standards.prince2.focus}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="focus-description">
                    {selectedComparison.standards.iso21500.focus}
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Dashboard */}
            <div className="insights-dashboard">
              <div className="dashboard-header">
                <h3>Insights Dashboard</h3>
                <p>Comprehensive analysis of methodology comparisons</p>
              </div>

              <div className="insights-tabs">
                <button 
                  className={`insight-tab ${activeInsightTab === 'similarities' ? 'active' : ''}`}
                  onClick={() => setActiveInsightTab('similarities')}
                >
                  <span className="tab-icon">✅</span>
                  Similarities ({selectedComparison.insights.similarities.length})
                </button>
                <button 
                  className={`insight-tab ${activeInsightTab === 'differences' ? 'active' : ''}`}
                  onClick={() => setActiveInsightTab('differences')}
                >
                  <span className="tab-icon">⚠️</span>
                  Differences ({selectedComparison.insights.differences.length})
                </button>
                <button 
                  className={`insight-tab ${activeInsightTab === 'uniquePoints' ? 'active' : ''}`}
                  onClick={() => setActiveInsightTab('uniquePoints')}
                >
                  <span className="tab-icon">💡</span>
                  Unique Points ({selectedComparison.insights.uniquePoints.length})
                </button>
              </div>

              <div className="insights-content">
                {activeInsightTab === 'similarities' && (
                  <div className="insight-panel similarity">
                    <h4>Common Practices & Overlapping Guidance</h4>
                    <div className="insight-list">
                      {selectedComparison.insights.similarities.map((item, index) => (
                        <div key={index} className="insight-item">
                          <span className="item-icon">✓</span>
                          <span className="item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeInsightTab === 'differences' && (
                  <div className="insight-panel difference">
                    <h4>Methodology Variations & Unique Terminologies</h4>
                    <div className="insight-list">
                      {selectedComparison.insights.differences.map((item, index) => (
                        <div key={index} className="insight-item">
                          <span className="item-icon">↷</span>
                          <span className="item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeInsightTab === 'uniquePoints' && (
                  <div className="insight-panel unique">
                    <h4>Standard-Specific Coverage</h4>
                    <div className="insight-list">
                      {selectedComparison.insights.uniquePoints.map((item, index) => (
                        <div key={index} className="insight-item">
                          <span className="item-icon">☆</span>
                          <span className="item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recommendations Section */}
              <div className="recommendations-section">
                <h4>Implementation Recommendations</h4>
                <div className="recommendations-grid">
                  {selectedComparison.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-card">
                      <span className="rec-number">{index + 1}</span>
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for topic icons
const getTopicIcon = (topic) => {
  const icons = {
    "Risk Management": "🎯",
    "Stakeholder Engagement": "👥",
    "Quality Management": "⭐",
    "Project Planning": "📅",
    "Change Management": "🔄",
    "Resource Management": "👨‍💼",
    "Communication Management": "💬",
    "Procurement Management": "📦",
    "Integration Management": "🔗",
    "Scope Management": "🎯",
    "Time Management": "⏰",
    "Cost Management": "💰"
  };
  return icons[topic] || "📊";
};

export default Comparisons;
