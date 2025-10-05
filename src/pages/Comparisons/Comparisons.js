import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./Comparisons.css";

const Comparisons = () => {
  const { data: comparisonsData, loading: comparisonsLoading, error: comparisonsError } = useFetch("/comparisons");
  const { data: standardsData, loading: standardsLoading, error: standardsError } = useFetch("/standards/all");
  const navigate = useNavigate();
  
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTopic, setFilterTopic] = useState("all");
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

  // Handle different data structures
  let comparisons = [];
  let standards = [];
  
  // Handle comparisons data
  if (comparisonsData) {
    console.log("Comparisons Data:", comparisonsData);
    if (Array.isArray(comparisonsData.data)) {
      comparisons = comparisonsData.data;
    } else if (Array.isArray(comparisonsData)) {
      comparisons = comparisonsData;
    }
  }

  // Handle standards data
  if (standardsData) {
    console.log("Standards Data:", standardsData);
    if (Array.isArray(standardsData.data)) {
      standards = standardsData.data;
    } else if (Array.isArray(standardsData)) {
      standards = standardsData;
    }
  }

  console.log("Processed Standards:", standards);
  console.log("Processed Comparisons:", comparisons);

  // Extract unique topics for filter
  const topics = ["all", ...new Set(comparisons.map(comp => comp.topic).filter(Boolean))];

  const filteredComparisons = comparisons.filter(comparison => {
    const matchesSearch = 
      comparison.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comparison.topic?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic = filterTopic === "all" || comparison.topic === filterTopic;

    return matchesSearch && matchesTopic;
  });

  const getStandardColor = (slug) => {
    const colors = {
      pmbok: "#667eea",
      pmbok7: "#667eea",
      prince2: "#ed64a6",
      iso21500: "#48bb78",
      agile: "#f56565"
    };
    return colors[slug] || "#a0aec0";
  };

  const getStandardIcon = (slug) => {
    const icons = {
      pmbok: "📚",
      pmbok7: "📚",
      prince2: "👑",
      iso21500: "🌍",
      agile: "🔄"
    };
    return icons[slug] || "📋";
  };

  // Find section in standards data
  const findSection = (standardSlug, sectionId) => {
    const standard = standards.find(s => s.slug === standardSlug);
    if (!standard || !standard.sections) return null;

    const findInSections = (sections, targetId) => {
      for (const section of sections) {
        if (section.id === targetId) return section;
        if (section.subsections) {
          const found = findInSections(section.subsections, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    return findInSections(standard.sections, sectionId);
  };

  // Navigate to standard section with highlighting
  const navigateToSection = (standardSlug, sectionId) => {
    navigate(`/standards?standard=${standardSlug}&section=${sectionId}&highlight=true`);
  };

  // Generate comprehensive comparison for a topic
  const generateComparison = (topic) => {
    console.log("Generating comparison for topic:", topic);
    console.log("Available standards:", standards.map(s => s.slug));

    const comparison = {
      title: `${topic} Comparison`,
      topic: topic,
      standards: {
        pmbok: { sections: [], approach: "", focus: "" },
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
      const relevantSections = findRelevantSections(standard, topic);
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
    
    console.log("Generated comparison:", comparison);
    return comparison;
  };

  const findRelevantSections = (standard, topic) => {
    if (!standard.sections || !Array.isArray(standard.sections)) {
      console.log(`No sections found for ${standard.slug}`);
      return [];
    }
    
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
    // Sort by relevance and limit to top 5 sections
    const sortedRelevant = relevant.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
    console.log(`Relevant sections for ${standard.slug}:`, sortedRelevant);
    return sortedRelevant;
  };

  const calculateRelevance = (section, topic) => {
    if (!section) return 0;
    
    let score = 0;
    const topicWords = topic.toLowerCase().split(' ');
    
    topicWords.forEach(word => {
      if (section.title?.toLowerCase().includes(word)) score += 3;
      if (section.text?.toLowerCase().includes(word)) score += 2;
      if (section.subsections?.some(sub => sub.title?.toLowerCase().includes(word))) score += 1;
    });
    
    return score;
  };

  const getStandardApproach = (slug) => {
    const approaches = {
      pmbok: "Process-based framework with principles and performance domains",
      pmbok7: "Process-based framework with 12 principles and 8 performance domains",
      prince2: "Principle-theme-process methodology with product-based planning",
      iso21500: "Guidance standard focusing on project management concepts and processes"
    };
    return approaches[slug] || "Standard project management approach";
  };

  const getStandardFocus = (slug) => {
    const focuses = {
      pmbok: "Delivering value through tailored processes and principles",
      pmbok7: "Delivering value through tailored processes and principles",
      prince2: "Business justification and controlled stage management",
      iso21500: "Universal guidance applicable to all organization types"
    };
    return focuses[slug] || "Project management best practices";
  };

  const generateComprehensiveInsights = (topic) => {
    const insights = {
      similarities: [],
      differences: [],
      uniquePoints: []
    };

    // Comprehensive insights for each topic
    const topicInsights = {
      "Risk Management": {
        similarities: [
          "All methodologies require formal risk identification processes",
          "Risk assessment (probability and impact) is universally applied",
          "Risk response planning is mandatory across all frameworks",
          "Continuous risk monitoring throughout project lifecycle",
          "Documentation of risk register or equivalent"
        ],
        differences: [
          "PMBOK: Detailed quantitative analysis techniques (EMV, decision trees)",
          "PRINCE2: Risk management integrated as a continuous theme with specific risk budget",
          "ISO 21500: High-level guidance without prescribed techniques",
          "PMBOK separates risk into planning, identification, analysis, response planning",
          "PRINCE2 uses risk appetite and tolerance levels explicitly"
        ],
        uniquePoints: [
          "PMBOK ONLY: Monte Carlo simulation and tornado diagrams for quantitative analysis",
          "PRINCE2 ONLY: Risk budget concept for financial risk allocation",
          "ISO 21500 ONLY: Alignment with ISO 31000 risk management standard",
          "PMBOK ONLY: Specific risk categorization (technical, external, organizational)",
          "PRINCE2 ONLY: Early warning indicators and risk checkpoint reviews"
        ]
      },
      "Stakeholder Engagement": {
        similarities: [
          "Stakeholder identification is fundamental initial step",
          "Communication planning required for all key stakeholders",
          "Expectation management emphasized across methodologies",
          "Regular stakeholder engagement throughout project lifecycle",
          "Documentation of stakeholder analysis and engagement strategies"
        ],
        differences: [
          "PMBOK: Dedicated stakeholder management knowledge area with specific processes",
          "PRINCE2: Business stakeholder focus with communication management strategy",
          "ISO 21500: General guidance without specific stakeholder management processes",
          "PMBOK uses power/interest grid for stakeholder classification",
          "PRINCE2 emphasizes Senior User and Executive roles specifically"
        ],
        uniquePoints: [
          "PMBOK ONLY: Stakeholder engagement assessment matrix (unaware, resistant, neutral, supportive, leading)",
          "PRINCE2 ONLY: Specific communication management strategy document",
          "ISO 21500 ONLY: International perspective on cultural stakeholder diversity",
          "PMBOK ONLY: Formal stakeholder engagement control process",
          "PRINCE2 ONLY: Project board representation of key stakeholder interests"
        ]
      },
      "Quality Management": {
        similarities: [
          "Quality planning required before execution phase",
          "Quality control through verification and validation activities",
          "Continuous improvement principles embedded in all methodologies",
          "Quality standards and acceptance criteria definition",
          "Documentation of quality management approach"
        ],
        differences: [
          "PMBOK: Quality separated into planning, assurance, and control processes",
          "PRINCE2: Quality integrated as a theme with product descriptions",
          "ISO 21500: Quality aligned with ISO 9001 quality management systems",
          "PMBOK uses cost of quality (prevention, appraisal, failure costs)",
          "PRINCE2 focuses on product quality through quality register"
        ],
        uniquePoints: [
          "PMBOK ONLY: Seven basic quality tools (cause-effect, flowcharts, Pareto, etc.)",
          "PRINCE2 ONLY: Product-based planning with quality criteria in product descriptions",
          "ISO 21500 ONLY: Direct alignment with ISO 9001 quality management principles",
          "PMBOK ONLY: Design of experiments and statistical sampling techniques",
          "PRINCE2 ONLY: Quality review technique for formal product assessment"
        ]
      }
    };

    return topicInsights[topic] || {
      similarities: [
        "Common project management principles and best practices",
        "Systematic approach to project delivery",
        "Emphasis on planning and control mechanisms"
      ],
      differences: [
        "Different terminology and process structures",
        "Varying levels of prescription and flexibility",
        "Distinct organizational and governance approaches"
      ],
      uniquePoints: [
        "Each methodology offers specialized techniques and tools",
        "Different cultural and organizational contexts addressed",
        "Varied emphasis on documentation and formalization"
      ]
    };
  };

  const generateRecommendations = (topic) => {
    const recommendations = {
      "Risk Management": [
        "Use PMBOK for complex projects requiring quantitative risk analysis",
        "Apply PRINCE2 for organizations with strong stage-gate governance",
        "Reference ISO 21500 for organizations new to formal risk management",
        "Combine PMBOK techniques with PRINCE2 governance for comprehensive coverage",
        "Use ISO 21500 as foundation and supplement with specific techniques as needed"
      ],
      "Stakeholder Engagement": [
        "PMBOK provides most comprehensive stakeholder analysis techniques",
        "PRINCE2 offers clear business stakeholder accountability structures",
        "ISO 21500 suitable for international projects with diverse stakeholders",
        "Use PMBOK matrix for complex stakeholder environments",
        "Apply PRINCE2 communication strategy for clear governance reporting"
      ],
      "Quality Management": [
        "PMBOK offers detailed quality tools and techniques",
        "PRINCE2 provides excellent product-focused quality approach",
        "ISO 21500 ideal for organizations using ISO 9001 quality systems",
        "Combine PMBOK quality control with PRINCE2 product descriptions",
        "Use ISO 21500 as quality management system foundation"
      ]
    };

    return recommendations[topic] || [
      "Select methodology based on organizational maturity and project complexity",
      "Consider combining elements from multiple methodologies for optimal coverage",
      "Tailor the approach based on specific project requirements and constraints"
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
      <span className="relevance-badge" style={{ opacity: Math.min(section.relevanceScore / 10, 1) }}>
        {Math.min(section.relevanceScore, 100)}%
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
                    {selectedComparison.standards.pmbok?.approach || "Process-based framework with principles and performance domains"}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="approach-description">
                    {selectedComparison.standards.prince2?.approach || "Principle-theme-process methodology with product-based planning"}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="approach-description">
                    {selectedComparison.standards.iso21500?.approach || "Guidance standard focusing on project management concepts and processes"}
                  </div>
                </div>

                {/* Key Sections Row */}
                <div className="grid-label">
                  <h4>Relevant Sections</h4>
                  <small>Click to view in standards</small>
                </div>
                <div className="grid-cell">
                  <div className="sections-list">
                    {selectedComparison.standards.pmbok?.sections?.length > 0 ? (
                      selectedComparison.standards.pmbok.sections.map(section => 
                        renderSectionLink(section, 'pmbok')
                      )
                    ) : (
                      <div className="no-sections">No relevant sections found</div>
                    )}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="sections-list">
                    {selectedComparison.standards.prince2?.sections?.length > 0 ? (
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
                    {selectedComparison.standards.iso21500?.sections?.length > 0 ? (
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
                    {selectedComparison.standards.pmbok?.focus || "Delivering value through tailored processes and principles"}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="focus-description">
                    {selectedComparison.standards.prince2?.focus || "Business justification and controlled stage management"}
                  </div>
                </div>
                <div className="grid-cell">
                  <div className="focus-description">
                    {selectedComparison.standards.iso21500?.focus || "Universal guidance applicable to all organization types"}
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

      {/* Existing Comparisons Archive */}
      <div className="archive-section">
        <div className="section-header">
          <h2>Comparison Archive</h2>
          <p>Previously generated and saved comparisons</p>
        </div>

        <div className="archive-controls">
          <div className="search-box-container">
            <input
              type="text"
              className="search-box"
              placeholder="Search archived comparisons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <select 
            className="topic-filter"
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic === "all" ? "All Topics" : topic}
              </option>
            ))}
          </select>
        </div>

        <div className="archive-grid">
          {filteredComparisons.length > 0 ? (
            filteredComparisons.map((comparison, index) => (
              <div 
                key={comparison._id || index} 
                className="archive-card"
                onClick={() => {
                  setSelectedComparison(comparison);
                  setComparisonMode("results");
                }}
              >
                <h3>{comparison.title}</h3>
                <span className="topic-badge">{comparison.topic}</span>
                <div className="card-meta">
                  <span className="date">
                    {new Date(comparison.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                  <span className="mapping-count">
                    {comparison.mappings?.length || 0} mappings
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-archive">
              <p>No archived comparisons found</p>
            </div>
          )}
        </div>
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
