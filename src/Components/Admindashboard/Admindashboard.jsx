// AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logo from "../../assets/Stacklyimg1.webp";

const adminStats = [
  { icon: "👥", value: "847", label: "Total Users", change: "+12%", trend: "up" },
  { icon: "🏛️", value: "23", label: "Active Excavations", change: "+3", trend: "up" },
  { icon: "📜", value: "2,847", label: "Artifacts Catalogued", change: "+42", trend: "up" },
  { icon: "💰", value: "$4.2M", label: "Total Funding", change: "+8%", trend: "up" },
  { icon: "🌍", value: "18", label: "Active Countries", change: "+2", trend: "up" },
  { icon: "📚", value: "156", label: "Publications", change: "+15", trend: "up" },
];

const recentUsers = [
  { name: "Dr. Sarah Chen", email: "sarah.chen@gmail.com", role: "Lead Archaeologist", status: "active", joined: "2 days ago" },
  { name: "Dr. Nikos Papadopoulos", email: "nikos.p@gmail.com", role: "Field Director", status: "active", joined: "5 days ago" },
  { name: "Dr. Elena Rodriguez", email: "elena.r@gmail.com", role: "Maya Specialist", status: "pending", joined: "1 week ago" },
  { name: "Dr. James O'Neill", email: "james.o@gmail.com", role: "Mesopotamia Expert", status: "active", joined: "2 weeks ago" },
  { name: "Dr. Priya Sharma", email: "priya.s@gmail.com", role: "Research Fellow", status: "inactive", joined: "3 weeks ago" },
];

const pendingApprovals = [
  { id: 1, name: "Dr. Amara Singh", request: "New Excavation - Indus Valley", date: "Today", priority: "high" },
  { id: 2, name: "Dr. Marco Rossi", request: "Research Grant - Roman Forum", date: "Yesterday", priority: "medium" },
  { id: 3, name: "Prof. Li Wei", request: "Publication - Bronze Age China", date: "2 days ago", priority: "low" },
  { id: 4, name: "Dr. Olivia Martinez", request: "Field Equipment Request", date: "3 days ago", priority: "high" },
];

const systemHealth = [
  { service: "Database", status: "operational", uptime: "99.9%", latency: "12ms" },
  { service: "API Gateway", status: "operational", uptime: "99.8%", latency: "8ms" },
  { service: "Storage System", status: "degraded", uptime: "98.5%", latency: "45ms" },
  { service: "Authentication", status: "operational", uptime: "99.95%", latency: "5ms" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "👥", label: "Users", id: "users" },
  { icon: "🏛️", label: "Excavations", id: "excavations" },
  { icon: "📜", label: "Artifacts", id: "artifacts" },
  { icon: "💰", label: "Funding", id: "funding" },
  { icon: "📚", label: "Publications", id: "publications" },
  { icon: "🔬", label: "Research", id: "research" },
  { icon: "⚙️", label: "Settings", id: "settings" },
  { icon: "📊", label: "Analytics", id: "analytics" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNavClick = (item) => {
    setSidebarOpen(false);
    setActiveNav(item.id);
    if (item.id === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/404");
    }
  };

  return (
    <div className="admin-root">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img className="brand-logo-img" src={logo} alt="Strata logo" />
          </div>
          <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <div className="sidebar-section-label">MAIN MENU</div>
        <nav className="sidebar-nav">
          {navItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.id === "users" && <span className="nav-badge">5</span>}
              {item.id === "funding" && <span className="nav-badge">3</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label">SYSTEM</div>
        <nav className="sidebar-nav">
          {navItems.slice(6).map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-full-btn" onClick={handleLogout}>
          <span className="logout-icon">↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <div className="page-title">
              <h1>Admin Dashboard</h1>
              <p>Welcome back — oversee all archaeological operations.</p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search users, sites, artifacts…" />
            </div>
            <button className="icon-btn notif-btn" aria-label="Notifications" onClick={() => navigate("/404")}>
              🔔
              <span className="notif-dot" />
            </button>
            <div className="admin-badge">Admin</div>
            <img
              className="topbar-avatar-img"
              src="https://placehold.co/38x38/1b1b29/f5f5f7?text=AD"
              alt="Admin avatar"
            />
          </div>
        </header>

        <div className="content-area">

          {/* Stats Row */}
          <section className="stats-grid">
            {adminStats.map((stat, idx) => (
              <div className="stat-card" key={idx}>
                <div className="stat-top">
                  <span className="stat-icon">{stat.icon}</span>
                  <span className={`stat-delta ${stat.trend === 'up' ? 'up' : 'down'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: `${60 + Math.random() * 35}%` }} />
                </div>
              </div>
            ))}
          </section>

          {/* Mid Grid: Recent Users + Pending Approvals */}
          <section className="mid-grid">
            <div className="card users-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Recent Users</h2>
                  <p className="card-sub">Newest members of the community</p>
                </div>
                <button className="btn-outline" onClick={() => navigate("/404")}>View All</button>
              </div>
              <div className="table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, i) => (
                      <tr key={i}>
                        <td>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </td>
                        <td className="user-role">{user.role}</td>
                        <td>
                          <span className={`user-status status-${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="user-joined">{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card approvals-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Pending Approvals</h2>
                  <p className="card-sub">Requests awaiting review</p>
                </div>
                <button className="btn-outline" onClick={() => navigate("/404")}>View All</button>
              </div>
              <ul className="approvals-list">
                {pendingApprovals.map((item) => (
                  <li key={item.id} className="approval-item">
                    <div className="approval-info">
                      <div className="approval-name">{item.name}</div>
                      <div className="approval-request">{item.request}</div>
                      <div className="approval-meta">
                        <span className="approval-date">{item.date}</span>
                        <span className={`approval-priority priority-${item.priority}`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                    <div className="approval-actions">
                      <button className="approval-btn approve">✓</button>
                      <button className="approval-btn reject">✕</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bottom Grid: System Health + Quick Actions + Analytics */}
          <section className="bottom-grid">
            <div className="card health-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">System Health</h2>
                  <p className="card-sub">Service status overview</p>
                </div>
              </div>
              <ul className="health-list">
                {systemHealth.map((service, i) => (
                  <li key={i} className="health-item">
                    <div className="health-service">
                      <span className={`health-dot dot-${service.status}`} />
                      <span className="health-name">{service.service}</span>
                    </div>
                    <div className="health-stats">
                      <span className="health-uptime">{service.uptime}</span>
                      <span className="health-latency">{service.latency}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card quick-actions-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Quick Actions</h2>
                  <p className="card-sub">Common administrative tasks</p>
                </div>
              </div>
              <div className="quick-actions-grid">
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">➕</span>
                  <span className="qa-label">New Excavation</span>
                </button>
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">👤</span>
                  <span className="qa-label">Add User</span>
                </button>
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">📄</span>
                  <span className="qa-label">Generate Report</span>
                </button>
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">💰</span>
                  <span className="qa-label">Review Funding</span>
                </button>
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">🔬</span>
                  <span className="qa-label">Research Grant</span>
                </button>
                <button className="quick-action" onClick={() => navigate("/404")}>
                  <span className="qa-icon">⚙️</span>
                  <span className="qa-label">System Settings</span>
                </button>
              </div>
            </div>

            <div className="card analytics-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Quick Analytics</h2>
                  <p className="card-sub">Key metrics at a glance</p>
                </div>
              </div>
              <div className="analytics-grid">
                <div className="analytics-item">
                  <div className="analytics-value">42%</div>
                  <div className="analytics-label">Active Users</div>
                  <div className="analytics-bar">
                    <div className="analytics-bar-fill" style={{ width: "42%" }} />
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-value">78%</div>
                  <div className="analytics-label">Field Work Completion</div>
                  <div className="analytics-bar">
                    <div className="analytics-bar-fill" style={{ width: "78%" }} />
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-value">63%</div>
                  <div className="analytics-label">Artifacts Catalogued</div>
                  <div className="analytics-bar">
                    <div className="analytics-bar-fill" style={{ width: "63%" }} />
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-value">91%</div>
                  <div className="analytics-label">Funding Allocated</div>
                  <div className="analytics-bar">
                    <div className="analytics-bar-fill" style={{ width: "91%" }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}