// Dashboard.jsx
import { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Stacklyimg1.webp";

// Archaeology site colors - warm earth tones
const siteAccents = {
  Egypt: "#D4A574",
  Greece: "#8B9DAF",
  Maya: "#5D8A5E",
  Mesopotamia: "#C49A6C",
  Indus: "#B8860B",
  Rome: "#A0522D",
};

const excavationsData = [
  { id: 1, name: "Valley of the Kings", region: "Egypt", site: "Luxor", type: "Tomb", status: "Active", progress: 72, endDate: "Dec 2025", budget: "$450,000", director: "Dr. Sarah Chen" },
  { id: 2, name: "Knossos Palace", region: "Greece", site: "Crete", type: "Palace", status: "Field Work", progress: 38, endDate: "Aug 2025", budget: "$320,000", director: "Dr. Nikos Papadopoulos" },
  { id: 3, name: "Tikal Temple Complex", region: "Guatemala", site: "Petén", type: "Temple", status: "Completed", progress: 100, endDate: "Mar 2025", budget: "$580,000", director: "Dr. Elena Rodriguez" },
  { id: 4, name: "Ur Excavation", region: "Iraq", site: "Dhi Qar", type: "City", status: "Active", progress: 55, endDate: "Nov 2025", budget: "$390,000", director: "Dr. James O'Neill" },
  { id: 5, name: "Mohenjo-daro Survey", region: "Pakistan", site: "Sindh", type: "Urban", status: "Review", progress: 89, endDate: "Jul 2025", budget: "$275,000", director: "Dr. Priya Sharma" },
];

const fieldTeam = [
  { name: "Dr. Sarah Chen", role: "Lead Archaeologist — Egypt", experience: 14, avatar: "SC", status: "active" },
  { name: "Dr. Nikos Papadopoulos", role: "Field Director — Greece", experience: 11, avatar: "NP", status: "active" },
  { name: "Dr. Elena Rodriguez", role: "Maya Specialist — Guatemala", experience: 9, avatar: "ER", status: "away" },
  { name: "Dr. James O'Neill", role: "Mesopotamia Expert — Iraq", experience: 16, avatar: "JO", status: "active" },
];

const liveFeed = [
  { icon: "🏛️", text: "Unmarked tomb discovered in Valley of the Kings with intact burial chamber", time: "2h ago", type: "discovery" },
  { icon: "📜", text: "New cuneiform tablets translated from Ur — revealing trading routes", time: "4h ago", type: "research" },
  { icon: "✅", text: "Tikal Temple complex excavation completed — final report published", time: "Yesterday", type: "complete" },
  { icon: "⚠️", text: "Weather delay at Knossos — excavation paused until conditions improve", time: "Yesterday", type: "alert" },
  { icon: "🔬", text: "DNA analysis reveals migration patterns in Bronze Age Crete", time: "2d ago", type: "update" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "🏛️", label: "Excavations", id: "excavations" },
  { icon: "🛡", label: "Field Teams", id: "teams" },
  { icon: "📜", label: "Artifacts", id: "artifacts" },
  { icon: "🔬", label: "Research", id: "research" },
  { icon: "🗓️", label: "Schedule", id: "schedule" },
  { icon: "💰", label: "Budget", id: "budget" },
  { icon: "📚", label: "Publications", id: "publications" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const statusColors = {
  Active: "status-active",
  "Field Work": "status-field",
  Completed: "status-complete",
  Review: "status-review",
};

export default function Dashboard() {
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
    <div className="dashboard-root">
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
              {item.id === "excavations" && <span className="nav-badge">5</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label">MANAGEMENT</div>
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
              <h1>Dashboard</h1>
              <p>Welcome back — here's your archaeological overview.</p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search sites, artifacts, researchers…" />
            </div>
            <button className="icon-btn notif-btn" aria-label="Notifications" onClick={() => navigate("/404")}>
              🔔
              <span className="notif-dot" />
            </button>
            <img
              className="topbar-avatar-img"
              src="https://placehold.co/38x38/1b1b29/f5f5f7?text=You"
              alt="User avatar"
            />
          </div>
        </header>

        <div className="content-area">

          {/* Stats Row */}
          <section className="stats-grid">
            <div className="stat-card stat-accent">
              <div className="stat-top">
                <span className="stat-icon">🏛️</span>
                <span className="stat-delta up">+3 this month</span>
              </div>
              <div className="stat-value">12</div>
              <div className="stat-label">Active Excavations</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: "72%" }} /></div>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">📜</span>
                <span className="stat-delta up">+42 this week</span>
              </div>
              <div className="stat-value">2,847</div>
              <div className="stat-label">Artifacts Catalogued</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: "64%" }} /></div>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">💰</span>
                <span className="stat-delta up">On track</span>
              </div>
              <div className="stat-value">$4.2M</div>
              <div className="stat-label">Research Funding</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: "88%" }} /></div>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">🌍</span>
                <span className="stat-delta up">+2 this quarter</span>
              </div>
              <div className="stat-value">18</div>
              <div className="stat-label">Active Countries</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: "90%" }} /></div>
            </div>
          </section>

          {/* Excavations + Live Feed Row */}
          <section className="mid-grid">
            <div className="card excavations-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Active Excavations</h2>
                  <p className="card-sub">Current field operations overview</p>
                </div>
                <button className="btn-outline" onClick={() => navigate("/404")}>View All</button>
              </div>
              <div className="table-wrapper">
                <table className="excavations-table">
                  <thead>
                    <tr>
                      <th>Site</th>
                      <th>Region</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>End Date</th>
                      <th>Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excavationsData.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <div className="t-name">{t.name}</div>
                          <div className="t-sub">{t.site} · {t.director}</div>
                        </td>
                        <td>
                          <span
                            className="region-tag"
                            style={{
                              color: siteAccents[t.region],
                              borderColor: siteAccents[t.region],
                              background: `${siteAccents[t.region]}1f`,
                            }}
                          >
                            {t.region}
                          </span>
                        </td>
                        <td className="type-col">{t.type}</td>
                        <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                        <td>
                          <div className="progress-wrap">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: `${t.progress}%` }} />
                            </div>
                            <span className="progress-pct">{t.progress}%</span>
                          </div>
                        </td>
                        <td className="date-col">{t.endDate}</td>
                        <td className="budget-col">{t.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card activity-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Live Feed</h2>
                  <p className="card-sub">Field updates</p>
                </div>
              </div>
              <ul className="activity-list">
                {liveFeed.map((a, i) => (
                  <li key={i} className={`activity-item act-${a.type}`}>
                    <span className="act-icon">{a.icon}</span>
                    <div className="act-body">
                      <p className="act-text">{a.text}</p>
                      <span className="act-time">{a.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Team + Schedule + Mix Row */}
          <section className="bottom-grid">
            <div className="card team-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Field Team</h2>
                  <p className="card-sub">Active researchers</p>
                </div>
                <button className="btn-outline" onClick={() => navigate("/404")}>Manage</button>
              </div>
              <ul className="team-list">
                {fieldTeam.map((m, i) => (
                  <li key={i} className="team-item">
                    <div className="member-avatar">
                      {m.avatar}
                      <span className={`online-dot dot-${m.status}`} />
                    </div>
                    <div className="member-info">
                      <div className="member-name">{m.name}</div>
                      <div className="member-role">{m.role}</div>
                    </div>
                    <div className="member-projects">
                      <span className="proj-count">{m.experience}</span>
                      <span className="proj-label">years</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card milestone-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Upcoming Deadlines</h2>
                  <p className="card-sub">Next 60 days</p>
                </div>
              </div>
              <ul className="milestone-list">
                {[
                  { site: "Valley of the Kings", event: "Tomb chamber excavation — Phase 2", date: "Jun 21", done: false, urgent: true },
                  { site: "Knossos Palace", event: "West wing restoration — Structural analysis", date: "Jun 25", done: false, urgent: false },
                  { site: "Ur Excavation", event: "Cuneiform tablet cataloguing", date: "Jul 2", done: false, urgent: false },
                  { site: "Mohenjo-daro", event: "3D site reconstruction — Final review", date: "Aug 05", done: false, urgent: false },
                  { site: "Tikal Temple", event: "Final report submission", date: "Jun 14", done: true, urgent: false },
                ].map((m, i) => (
                  <li key={i} className={`milestone-item ${m.done ? "ms-done" : ""} ${m.urgent ? "ms-urgent" : ""}`}>
                    <div className="ms-date">
                      <span>{m.date.split(" ")[0]}</span>
                      <span>{m.date.split(" ")[1]}</span>
                    </div>
                    <div className="ms-line"><div className="ms-dot" /></div>
                    <div className="ms-body">
                      <div className="ms-event">{m.event}</div>
                      <div className="ms-project">{m.site}</div>
                    </div>
                    {m.urgent && <span className="ms-tag">Urgent</span>}
                    {m.done && <span className="ms-tag ms-done-tag">Done</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Site Mix Donut */}
            <div className="card insights-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Site Distribution</h2>
                  <p className="card-sub">By region</p>
                </div>
              </div>
              <div className="donut-chart">
                <svg viewBox="0 0 120 120" className="donut-svg">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#1f1f2e" strokeWidth="16" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#D4A574" strokeWidth="16"
                    strokeDasharray="65 212" strokeDashoffset="0" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#8B9DAF" strokeWidth="16"
                    strokeDasharray="57 212" strokeDashoffset="-65" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#5D8A5E" strokeWidth="16"
                    strokeDasharray="49 212" strokeDashoffset="-122" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#C49A6C" strokeWidth="16"
                    strokeDasharray="41 212" strokeDashoffset="-171" strokeLinecap="round" />
                  <text x="60" y="56" textAnchor="middle" className="donut-num">18</text>
                  <text x="60" y="68" textAnchor="middle" className="donut-label">Sites</text>
                </svg>
              </div>
              <ul className="legend-list">
                {[
                  { color: "#D4A574", label: "Egypt", count: 5 },
                  { color: "#8B9DAF", label: "Greece", count: 4 },
                  { color: "#5D8A5E", label: "Maya", count: 4 },
                  { color: "#C49A6C", label: "Mesopotamia", count: 3 },
                  { color: "#B8860B", label: "Indus", count: 2 },
                ].map((l, i) => (
                  <li key={i} className="legend-item">
                    <span className="legend-dot" style={{ background: l.color }} />
                    <span className="legend-label">{l.label}</span>
                    <span className="legend-count">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}