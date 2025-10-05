import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: "home",
      title: "Home",
      icon: "🏠",
      path: "/",
      badge: null
    },
    {
      id: "standards",
      title: "Standards",
      icon: "📚",
      path: "/standards",
      badge: "3",
      submenu: [
  
        { title: "All Standards", path: "/standards", icon: "📑" }
      ]
    },
    {
      id: "comparison",
      title: "Comparison Engine",
      icon: "⚖️",
      path: "/comparison",
      badge: "New"
      // Removed submenu to make it go directly to comparison page
    },
    {
      id: "process",
      title: "Processes",
      icon: "🔧",
      path: "/process",
      badge: null,
      submenu: [
        { title: "Process Builder", path: "/process/builder", icon: "🛠️" },
        { title: "Templates", path: "/process/templates", icon: "📋" },
        { title: "Recommendations", path: "/process/recommendations", icon: "🤖" }
      ]
    },
    {
      id: "tools",
      title: "Tools",
      icon: "🛠️",
      path: "/tools",
      badge: "Pro",
      submenu: [
        { title: "Risk Assessment", path: "/tools/risk", icon: "🎯" },
        { title: "Timeline Planner", path: "/tools/timeline", icon: "📅" },
        { title: "Resource Calculator", path: "/tools/resources", icon: "📈" }
      ]
    }
  ];

  const quickActions = [
    { title: "New Comparison", icon: "✨", path: "/comparison", color: "#667eea" },
    { title: "Quick Search", icon: "🔍", path: "/search", color: "#f093fb" },
    { title: "Recent Items", icon: "⏰", path: "/recent", color: "#4facfe" }
  ];

  useEffect(() => {
    // Auto-detect active menu based on current path
    const currentMenu = menuItems.find(item => 
      location.pathname === item.path || 
      location.pathname.startsWith(item.path + "/") ||
      (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
    );
    setActiveMenu(currentMenu?.id || "home");
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && isHovered && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside 
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">🚀</div>
            {(!isCollapsed || isHovered) && (
              <div className="logo-text">
                <span className="logo-primary">Project</span>
                <span className="logo-secondary">Comparator</span>
              </div>
            )}
          </div>
          
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className={`toggle-icon ${isCollapsed ? "collapsed" : ""}`}>
              ‹
            </span>
          </button>
        </div>

        {/* Quick Actions */}
        {(!isCollapsed || isHovered) && (
          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-buttons">
              {quickActions.map((action, index) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="action-button"
                  style={{ '--action-color': action.color }}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-text">{action.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <div className="nav-item-wrapper">
                  {item.submenu ? (
                    <button
                      className={`nav-link ${activeMenu === item.id ? "active" : ""} ${isActive(item.path) ? "current" : ""}`}
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {(!isCollapsed || isHovered) && (
                        <>
                          <span className="nav-text">{item.title}</span>
                          {item.badge && (
                            <span className="nav-badge">{item.badge}</span>
                          )}
                          <span className={`nav-arrow ${activeMenu === item.id ? "expanded" : ""}`}>
                            ▼
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? "active current" : ""}`}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {(!isCollapsed || isHovered) && (
                        <>
                          <span className="nav-text">{item.title}</span>
                          {item.badge && (
                            <span className="nav-badge">{item.badge}</span>
                          )}
                        </>
                      )}
                    </Link>
                  )}

                  {/* Submenu - Only show if item has submenu */}
                  {item.submenu && activeMenu === item.id && (!isCollapsed || isHovered) && (
                    <ul className="submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path} className="submenu-item">
                          <Link
                            to={subItem.path}
                            className={`submenu-link ${isActive(subItem.path) ? "active" : ""}`}
                          >
                            <span className="submenu-icon">{subItem.icon}</span>
                            <span className="submenu-text">{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {(!isCollapsed || isHovered) && (
          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <div className="user-name">John Doe</div>
                <div className="user-role">Project Manager</div>
              </div>
            </div>
            <div className="sidebar-actions">
              <button className="sidebar-action" title="Settings">
                ⚙️
              </button>
              <button className="sidebar-action" title="Help">
                ❓
              </button>
              <button className="sidebar-action" title="Logout">
                🚪
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;