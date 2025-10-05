import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./Standards.css";

const Standards = () => {
  const { data, loading, error } = useFetch("/standards/all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  // The real array is in data.data
  const standardsData = Array.isArray(data?.data) ? data.data : [];

  // Download options for each standard
  const downloadOptions = {
    pmbok: {
      epub: "/public/pmbok.epub"
   
    },
    prince2: {
      pdf: "/public/prince2-7.pdf",
   
    },
    iso21500: {
      pdf: "/downloads/iso215002.pdf",
     
    }
  };

  // Search functionality - MOVED TO TOP
  const searchInSection = (section, standard, results, searchLower, path) => {
    if (!section) return;

    const titleMatch = section.title?.toLowerCase().includes(searchLower);
    const textMatch = section.text?.toLowerCase().includes(searchLower);

    if (titleMatch || textMatch) {
      results.push({
        type: 'section',
        standard,
        section,
        path: [...path],
        matches: {
          title: titleMatch,
          text: textMatch
        }
      });
    }

    // Search in subsections
    if (section.subsections && Array.isArray(section.subsections)) {
      section.subsections.forEach(subsection => {
        searchInSection(subsection, standard, results, searchLower, [...path, subsection.title]);
      });
    }
  };

  const searchInStandards = (standards, term) => {
    const results = [];
    const searchLower = term.toLowerCase();

    standards.forEach(standard => {
      // Search in standard metadata
      if (standard.title?.toLowerCase().includes(searchLower) ||
          standard.version?.toLowerCase().includes(searchLower) ||
          standard.meta?.publisher?.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'standard',
          standard,
          matches: ['title', 'version', 'publisher']
        });
      }

      // Search in sections
      if (standard.sections && Array.isArray(standard.sections)) {
        standard.sections.forEach(section => {
          searchInSection(section, standard, results, searchLower, [section.title]);
        });
      }
    });

    return results;
  };

  const searchResults = searchTerm ? searchInStandards(standardsData, searchTerm) : [];

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("standards-bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("standards-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Bookmark functionality
  const toggleBookmark = (standardSlug, sectionId = null) => {
    const bookmarkId = sectionId ? `${standardSlug}-${sectionId}` : standardSlug;
    
    setBookmarks(prev => {
      const newBookmarks = prev.includes(bookmarkId) 
        ? prev.filter(id => id !== bookmarkId)
        : [...prev, bookmarkId];
      return newBookmarks;
    });
  };

  const isBookmarked = (standardSlug, sectionId = null) => {
    const bookmarkId = sectionId ? `${standardSlug}-${sectionId}` : standardSlug;
    return bookmarks.includes(bookmarkId);
  };

  // Download functionality
  const handleDownload = (format, standardSlug = null) => {
    const slug = standardSlug || selectedStandard?.slug;
    const downloadUrl = downloadOptions[slug]?.[format];
    
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      // Fallback: Show message for unavailable downloads
      alert(`${format.toUpperCase()} format is not available for this standard yet.`);
    }
    setDownloadMenuOpen(false);
  };

  // Navigation functions
  const handleStandardSelect = (standard) => {
    setSelectedStandard(standard);
    setSelectedSection(null);
    setSearchTerm("");
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  const handleBackToStandards = () => {
    setSelectedStandard(null);
    setSelectedSection(null);
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Generate unique keys
  const generateKey = (base, index, prefix = "") => {
    return `${prefix}-${base}-${index}`;
  };

  // Render table of contents
  const renderTableOfContents = (sections, level = 0, parentIndex = "") => {
    if (!sections || !Array.isArray(sections)) {
      return <div className="no-sections">No sections available</div>;
    }

    return sections.map((section, index) => {
      if (!section) return null;
      
      const sectionKey = generateKey(section.id || index, index, `level-${level}-${parentIndex}`);
      
      return (
        <div key={sectionKey} className={`toc-level-${level}`}>
          <div className={`toc-item ${selectedSection?.id === section.id ? 'active' : ''}`}>
            <div className="toc-item-content">
              {section.subsections && section.subsections.length > 0 && (
                <button 
                  className="toc-expand-btn"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className={`expand-icon ${expandedSections[section.id] ? 'expanded' : ''}`}>
                    ▸
                  </span>
                </button>
              )}
              
              <div 
                className="toc-title-container"
                onClick={() => handleSectionSelect(section)}
              >
                <span className="section-id">{section.id || `S${index + 1}`}</span>
                <span className="section-title">{section.title || "Untitled Section"}</span>
              </div>
              
              <button 
                className={`bookmark-btn ${isBookmarked(selectedStandard.slug, section.id) ? 'bookmarked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(selectedStandard.slug, section.id);
                }}
                title={isBookmarked(selectedStandard.slug, section.id) ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked(selectedStandard.slug, section.id) ? '★' : '☆'}
              </button>
            </div>
            
            {section.subsections && expandedSections[section.id] && (
              <div className="toc-children">
                {renderTableOfContents(section.subsections, level + 1, sectionKey)}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  // Render section content
  const renderSectionContent = (section) => {
    if (!section) return null;

    return (
      <div className="section-content">
        <div className="section-header">
          <h1 className="content-title">
            {section.id} {section.title}
          </h1>
          <div className="section-actions">
            <button 
              className={`bookmark-btn large ${isBookmarked(selectedStandard.slug, section.id) ? 'bookmarked' : ''}`}
              onClick={() => toggleBookmark(selectedStandard.slug, section.id)}
            >
              {isBookmarked(selectedStandard.slug, section.id) ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            
            {/* Section-level download */}
            {section.fileRef && (
              <button 
                className="download-btn"
                onClick={() => window.open(section.fileRef, '_blank')}
              >
                📄 Download Section
              </button>
            )}
            
            {/* Full standard download */}
            <div className="download-menu">
              <button 
                className="download-btn"
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              >
                📥 Download Standard
              </button>
              {downloadMenuOpen && (
                <div className="download-dropdown">
                  <button onClick={() => handleDownload('pdf')}>📄 PDF Version</button>
                  <button onClick={() => handleDownload('epub')}>📚 EPUB Version</button>
                  <button onClick={() => handleDownload('html')}>🌐 HTML Version</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="content-body">
          {section.text && (
            <div className="section-text">
              {section.text.split('\n').map((paragraph, index) => (
                <p key={generateKey('paragraph', index)}>{paragraph}</p>
              ))}
            </div>
          )}
          
          {section.page && (
            <div className="page-info">
              <strong>Reference Page:</strong> {section.page}
            </div>
          )}

          {section.subsections && section.subsections.length > 0 && (
            <div className="child-sections">
              <h3>Subsections:</h3>
              {section.subsections.map((subsection, index) => (
                <div 
                  key={generateKey(subsection.id, index, 'child')}
                  className="child-section-preview"
                  onClick={() => handleSectionSelect(subsection)}
                >
                  <h4>{subsection.id} {subsection.title}</h4>
                  {subsection.text && (
                    <p className="preview-text">
                      {subsection.text.substring(0, 150)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-footer">
          <div className="navigation-buttons">
            <button className="nav-btn" onClick={handleBackToSections}>
              ← Back to Table of Contents
            </button>
            <button className="nav-btn" onClick={handleBackToStandards}>
              ← Back to Standards
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render standards grid
  const renderStandardsGrid = () => {
    const filteredStandards = standardsData.filter(standard => {
      if (!standard) return false;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        standard.title?.toLowerCase().includes(searchLower) ||
        standard.version?.toLowerCase().includes(searchLower) ||
        standard.meta?.publisher?.toLowerCase().includes(searchLower) ||
        standard.slug?.toLowerCase().includes(searchLower)
      );
    });

    return (
      <div className="standards-list-view">
        {filteredStandards.length === 0 ? (
          <div className="no-results">
            <h3>No standards found</h3>
            <p>Try adjusting your search terms or browse all standards.</p>
          </div>
        ) : (
          <div className="standards-grid">
            {filteredStandards.map((standard, index) => (
              <div 
                key={generateKey(standard.slug || standard._id, index, 'standard')}
                className="standard-card"
              >
                <div className="card-header">
                  <h2 
                    className="standard-title clickable"
                    onClick={() => handleStandardSelect(standard)}
                  >
                    {standard.title || "Untitled Standard"}
                  </h2>
                  <button 
                    className={`bookmark-btn ${isBookmarked(standard.slug) ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(standard.slug);
                    }}
                  >
                    {isBookmarked(standard.slug) ? '★' : '☆'}
                  </button>
                </div>
                
                <p className="standard-version">Version: {standard.version || "N/A"}</p>
                
                {standard.meta && (
                  <div className="standard-meta">
                    <span className="publisher">{standard.meta.publisher}</span>
                    <span className="year">{standard.meta.year}</span>
                  </div>
                )}
                
                <div className="section-count">
                  {standard.sections?.length || 0} sections
                </div>

                {standard.meta?.keyConcepts && (
                  <div className="key-concepts">
                    <strong>Key Concepts:</strong>
                    <div className="concepts-list">
                      {standard.meta.keyConcepts.slice(0, 3).map((concept, i) => (
                        <span key={generateKey(concept, i, 'concept')} className="concept-tag">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download buttons for each standard card */}
                <div className="standard-actions">
                  <button 
                    className="action-btn primary"
                    onClick={() => handleStandardSelect(standard)}
                  >
                    📖 Read Online
                  </button>
                  <div className="download-options">
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleDownload('pdf', standard.slug)}
                    >
                      📄 PDF
                    </button>
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleDownload('epub', standard.slug)}
                    >
                      📚 EPUB
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="loading">Loading standards...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="standards-container">
      <h1 className="page-title">📘 Project Management Standards</h1>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search standards, sections, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Search Results */}
        {searchTerm && !selectedStandard && (
          <div className="search-results-panel">
            <h3>Search Results ({searchResults.length})</h3>
            {searchResults.length > 0 ? (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <div 
                    key={generateKey(result.type, index, 'search')}
                    className="search-result-item"
                    onClick={() => {
                      if (result.type === 'standard') {
                        handleStandardSelect(result.standard);
                      } else {
                        handleStandardSelect(result.standard);
                        handleSectionSelect(result.section);
                      }
                    }}
                  >
                    <div className="result-type">{result.type === 'standard' ? '📚 Standard' : '📖 Section'}</div>
                    <div className="result-title">
                      {result.type === 'standard' ? result.standard.title : result.section.title}
                    </div>
                    <div className="result-path">
                      {result.path?.join(' › ')}
                    </div>
                    {result.section?.text && (
                      <div className="result-preview">
                        {result.section.text.substring(0, 200)}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No results found for "{searchTerm}"</p>
            )}
          </div>
        )}
      </div>

      {/* Bookmarked Items */}
      {bookmarks.length > 0 && !selectedStandard && (
        <div className="bookmarks-panel">
          <h3>📑 Your Bookmarks ({bookmarks.length})</h3>
          <div className="bookmarks-list">
            {bookmarks.map((bookmarkId, index) => (
              <div key={generateKey(bookmarkId, index, 'bookmark')} className="bookmark-item">
                📖 {bookmarkId}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {selectedStandard ? (
        // Standard Detail View
        <div className="standard-detail-view">
          <div className="detail-header">
            <button className="back-btn" onClick={handleBackToStandards}>
              ← Back to Standards
            </button>
            <div className="standard-info">
              <h2>{selectedStandard.title}</h2>
              <p className="version">Version: {selectedStandard.version}</p>
              <div className="header-actions">
                <button 
                  className={`bookmark-btn ${isBookmarked(selectedStandard.slug) ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(selectedStandard.slug)}
                >
                  {isBookmarked(selectedStandard.slug) ? '★ Bookmarked' : '☆ Bookmark Standard'}
                </button>
                
                {/* Global download button in header */}
                <div className="download-menu">
                  <button 
                    className="download-btn header-download"
                    onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                  >
                    📥 Download
                  </button>
                  {downloadMenuOpen && (
                    <div className="download-dropdown">
                      <button onClick={() => handleDownload('pdf')}>
                        <span>📄</span> PDF Version
                      </button>
                      <button onClick={() => handleDownload('epub')}>
                        <span>📚</span> EPUB Version
                      </button>
                      <button onClick={() => handleDownload('html')}>
                        <span>🌐</span> HTML Version
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-content">
            {selectedSection ? (
              // Section Content View
              renderSectionContent(selectedSection)
            ) : (
              // Table of Contents View
              <div className="toc-view">
                <div className="toc-sidebar">
                  <div className="toc-header">
                    <h3>📖 Table of Contents</h3>
                    <div className="bookmarks-count">
                      📑 {bookmarks.filter(b => b.startsWith(selectedStandard.slug)).length} bookmarks
                    </div>
                  </div>
                  <div className="toc-container">
                    {selectedStandard.sections && selectedStandard.sections.length > 0 ? (
                      renderTableOfContents(selectedStandard.sections)
                    ) : (
                      <div className="no-sections">
                        <p>No sections available in this standard.</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="standard-overview">
                  <h3>About This Standard</h3>
                  {selectedStandard.meta ? (
                    <div className="meta-info">
                      <p><strong>Publisher:</strong> {selectedStandard.meta.publisher}</p>
                      <p><strong>Year:</strong> {selectedStandard.meta.year}</p>
                      <p><strong>Domain:</strong> {selectedStandard.meta.domain}</p>
                      {selectedStandard.meta.keyConcepts && (
                        <div className="key-concepts">
                          <strong>Key Concepts:</strong>
                          <div className="concepts-list">
                            {selectedStandard.meta.keyConcepts.map((concept, index) => (
                              <span key={generateKey(concept, index, 'overview')} className="concept-tag">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>No metadata available for this standard.</p>
                  )}
                  
                  {/* Download quick access */}
                  <div className="download-quick-access">
                    <h4>Download Options</h4>
                    <div className="download-buttons">
                      <button className="download-format-btn" onClick={() => handleDownload('pdf')}>
                        <span className="format-icon">📄</span>
                        <span className="format-text">PDF</span>
                        <span className="format-desc">Best for printing</span>
                      </button>
                      <button className="download-format-btn" onClick={() => handleDownload('epub')}>
                        <span className="format-icon">📚</span>
                        <span className="format-text">EPUB</span>
                        <span className="format-desc">E-readers & tablets</span>
                      </button>
                      <button className="download-format-btn" onClick={() => handleDownload('html')}>
                        <span className="format-icon">🌐</span>
                        <span className="format-text">HTML</span>
                        <span className="format-desc">Web version</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Standards List View
        renderStandardsGrid()
      )}
    </div>
  );
};

export default Standards;