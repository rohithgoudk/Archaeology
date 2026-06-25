// AdminDashboard.jsx
import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import logo from "../../assets/Stacklyimg1.webp";
import { useNavigate } from "react-router-dom";

// ─── DATA ───────────────────────────────────────────────────────────────

const siteAccents = {
  Egypt: "#D4A574", Greece: "#8B9DAF", Maya: "#5D8A5E",
  Guatemala: "#5D8A5E", Mesopotamia: "#C49A6C", Iraq: "#C49A6C",
  Indus: "#B8860B", Pakistan: "#B8860B", Rome: "#A0522D",
};

const excavationsData = [
  { id: 1, name: "Valley of the Kings", region: "Egypt", site: "Luxor", type: "Tomb", status: "Active", progress: 72, endDate: "Dec 2025", budget: "$450,000", director: "Dr. Sarah Chen" },
  { id: 2, name: "Knossos Palace", region: "Greece", site: "Crete", type: "Palace", status: "Field Work", progress: 38, endDate: "Aug 2025", budget: "$320,000", director: "Dr. Nikos Papadopoulos" },
  { id: 3, name: "Tikal Temple Complex", region: "Guatemala", site: "Petén", type: "Temple", status: "Completed", progress: 100, endDate: "Mar 2025", budget: "$580,000", director: "Dr. Elena Rodriguez" },
  { id: 4, name: "Ur Excavation", region: "Iraq", site: "Dhi Qar", type: "City", status: "Active", progress: 55, endDate: "Nov 2025", budget: "$390,000", director: "Dr. James O'Neill" },
  { id: 5, name: "Mohenjo-daro Survey", region: "Pakistan", site: "Sindh", type: "Urban", status: "Review", progress: 89, endDate: "Jul 2025", budget: "$275,000", director: "Dr. Priya Sharma" },
  { id: 6, name: "Pompeii East Wing", region: "Rome", site: "Naples", type: "Urban", status: "Active", progress: 61, endDate: "Oct 2025", budget: "$520,000", director: "Dr. Marco Ferretti" },
  { id: 7, name: "Machu Picchu Sector B", region: "Guatemala", site: "Cusco", type: "Temple", status: "Field Work", progress: 45, endDate: "Sep 2025", budget: "$310,000", director: "Dr. Ana Flores" },
];

const adminStats = {
  totalUsers: 2847,
  activeUsers: 1892,
  totalProjects: 47,
  totalArtifacts: 2847,
  totalFunding: 284500,
  pendingApprovals: 23,
  monthlyGrowth: 12.4,
  completionRate: 68,
};

const recentUsers = [
  { name: "Dr. Sarah Chen", email: "s.chen@strata.org", role: "Lead Archaeologist", status: "active", joinDate: "2025-01-15", projects: 3 },
  { name: "Dr. Nikos Papadopoulos", email: "n.papadopoulos@strata.org", role: "Field Director", status: "active", joinDate: "2025-01-12", projects: 2 },
  { name: "Dr. Elena Rodriguez", email: "e.rodriguez@strata.org", role: "Maya Specialist", status: "pending", joinDate: "2025-01-10", projects: 0 },
  { name: "Dr. James O'Neill", email: "j.oneill@strata.org", role: "Mesopotamia Expert", status: "active", joinDate: "2025-01-08", projects: 2 },
  { name: "Dr. Priya Sharma", email: "p.sharma@strata.org", role: "Indus Specialist", status: "inactive", joinDate: "2025-01-05", projects: 1 },
  { name: "Dr. Marco Ferretti", email: "m.ferretti@strata.org", role: "Roman Archaeologist", status: "active", joinDate: "2025-01-03", projects: 1 },
];

const pendingApprovalsList = [
  { id: "REQ-001", user: "Dr. Elena Rodriguez", type: "Project Access", site: "Tikal Temple Complex", submitted: "2025-01-18", priority: "high" },
  { id: "REQ-002", user: "Dr. Ana Flores", type: "Budget Increase", site: "Machu Picchu Sector B", submitted: "2025-01-17", priority: "medium" },
  { id: "REQ-003", user: "Dr. Marco Ferretti", type: "Team Addition", site: "Pompeii East Wing", submitted: "2025-01-16", priority: "low" },
  { id: "REQ-004", user: "Dr. James O'Neill", type: "Equipment Request", site: "Ur Excavation", submitted: "2025-01-15", priority: "high" },
  { id: "REQ-005", user: "Dr. Sarah Chen", type: "Publication Approval", site: "Valley of the Kings", submitted: "2025-01-14", priority: "medium" },
];

const systemAlerts = [
  { type: "warning", message: "Backup storage at 85% capacity", time: "2h ago" },
  { type: "info", message: "New user registration spike detected", time: "4h ago" },
  { type: "success", message: "Database optimization completed", time: "Yesterday" },
  { type: "error", message: "Scheduled maintenance tonight at 2 AM", time: "Yesterday" },
];

const userGrowthData = [45, 52, 48, 63, 71, 89, 95, 102, 115, 128, 142, 156];
const monthlyRevenue = [284, 312, 298, 345, 389, 412, 435, 468, 492, 525, 548, 572];
const projectStatus = [
  { label: "Active", value: 28, color: "#D4A574" },
  { label: "Field Work", value: 12, color: "#f59e0b" },
  { label: "Review", value: 4, color: "#8B9DAF" },
  { label: "Completed", value: 3, color: "#22c55e" },
];

const regionDistribution = [
  { label: "Egypt", value: 8, color: "#D4A574" },
  { label: "Greece", value: 6, color: "#8B9DAF" },
  { label: "Maya", value: 5, color: "#5D8A5E" },
  { label: "Mesopotamia", value: 4, color: "#C49A6C" },
  { label: "Indus", value: 3, color: "#B8860B" },
  { label: "Rome", value: 2, color: "#A0522D" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "👥", label: "Users", id: "users" },
  { icon: "🏛️", label: "Projects", id: "projects" },
  { icon: "📜", label: "Artifacts", id: "artifacts" },
  { icon: "💰", label: "Finance", id: "finance" },
  { icon: "✅", label: "Approvals", id: "approvals" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const statusColors = {
  Active: "status-active", "Field Work": "status-field",
  Completed: "status-complete", Review: "status-review",
};

function fmt(n) { return "$" + n.toLocaleString(); }

// ─── COMPONENTS ──────────────────────────────────────────────────────────

function DashboardPage({ navigate }) {
  return (
    <>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2 >Welcome back, Admin 👋</h2>
          </div>
          
        </div>
        <div className="welcome-stats-mini">
          <div className="mini-stat">
            <span className="mini-stat-value">{adminStats.totalUsers.toLocaleString()}</span>
            <span className="mini-stat-label">Users</span>
          </div>
          <div className="mini-stat-divider" />
          <div className="mini-stat">
            <span className="mini-stat-value">{adminStats.totalProjects}</span>
            <span className="mini-stat-label">Projects</span>
          </div>
          <div className="mini-stat-divider" />
          <div className="mini-stat">
            <span className="mini-stat-value">{fmt(adminStats.totalFunding)}</span>
            <span className="mini-stat-label">Funding</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="stats-grid">
        {[
          { icon: "👥", value: adminStats.totalUsers.toLocaleString(), label: "Total Users", change: "+12.4%", bar: 85, accent: true },
          { icon: "🟢", value: adminStats.activeUsers.toLocaleString(), label: "Active Users", change: "+8.2%", bar: 66, accent: false },
          { icon: "🏛️", value: adminStats.totalProjects, label: "Total Projects", change: "+3", bar: 70, accent: false },
          { icon: "📜", value: adminStats.totalArtifacts.toLocaleString(), label: "Artifacts", change: "+142", bar: 78, accent: false },
          { icon: "💰", value: fmt(adminStats.totalFunding), label: "Total Funding", change: "+$24K", bar: 90, accent: true },
          { icon: "⏳", value: adminStats.pendingApprovals, label: "Pending Approvals", change: "+5", bar: 45, accent: false },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top">
              <span className="stat-icon">{s.icon}</span>
              <span className={`stat-delta ${s.change.startsWith("+") ? "up" : ""}`}>{s.change}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      {/* Charts Grid */}
      <section className="charts-grid">
        <div className="card chart-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">User Growth</h2>
              <p className="card-sub">Monthly active users</p>
            </div>
            <div className="chart-controls">
              <button className="btn-outline btn-sm active" onClick={() => navigate("/404")}>Year</button>
              <button className="btn-outline btn-sm" onClick={() => navigate("/404")}>Month</button>
            </div>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 500 200" className="chart-svg">
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A574" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#D4A574" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {userGrowthData.map((_, i) => {
                const x = (i / (userGrowthData.length - 1)) * 480 + 10;
                const y1 = 190 - (userGrowthData[i] / Math.max(...userGrowthData)) * 170;
                const y2 = 190 - (userGrowthData[i + 1] / Math.max(...userGrowthData)) * 170;
                if (i < userGrowthData.length - 1) {
                  return (
                    <line key={i} x1={x} y1={y1} x2={x + 480 / (userGrowthData.length - 1)} y2={y2} stroke="#D4A574" strokeWidth="2.5" strokeLinecap="round" />
                  );
                }
                return null;
              })}
              <polygon points={`10,190 ${userGrowthData.map((d, i) => (i / (userGrowthData.length - 1)) * 480 + 10 + "," + (190 - (d / Math.max(...userGrowthData)) * 170)).join(" ")} 490,190`} fill="url(#userGradient)" />
              {userGrowthData.map((d, i) => {
                const x = (i / (userGrowthData.length - 1)) * 480 + 10;
                const y = 190 - (d / Math.max(...userGrowthData)) * 170;
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill="#D4A574" stroke="#fff" strokeWidth="1.5" />
                );
              })}
              <text x="10" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="50" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">F</text>
              <text x="90" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">M</text>
              <text x="130" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">A</text>
              <text x="170" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">M</text>
              <text x="210" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="250" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="290" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">A</text>
              <text x="330" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">S</text>
              <text x="370" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">O</text>
              <text x="410" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">N</text>
              <text x="450" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">D</text>
            </svg>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Revenue Overview</h2>
              <p className="card-sub">Monthly funding ($000s)</p>
            </div>
            <button className="btn-outline btn-sm" onClick={() => navigate("/404")}>View All</button>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 500 200" className="chart-svg">
              {monthlyRevenue.map((d, i) => {
                const x = (i / (monthlyRevenue.length - 1)) * 480 + 10;
                const barHeight = (d / Math.max(...monthlyRevenue)) * 170;
                return (
                  <g key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                    <rect 
                      x={x - 8} 
                      y={190 - barHeight} 
                      width="16" 
                      height={barHeight} 
                      rx="3" 
                      fill={d > 500 ? "#D4A574" : "rgba(212,165,116,0.5)"}
                      className="bar-animate"
                    />
                    <title>{d}</title>
                  </g>
                );
              })}
              <text x="10" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="50" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">F</text>
              <text x="90" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">M</text>
              <text x="130" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">A</text>
              <text x="170" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">M</text>
              <text x="210" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="250" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">J</text>
              <text x="290" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">A</text>
              <text x="330" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">S</text>
              <text x="370" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">O</text>
              <text x="410" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">N</text>
              <text x="450" y="195" fill="rgba(255,255,255,0.3)" fontSize="10">D</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Bottom Grid */}
      <section className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <div><h2 className="card-title">Project Status</h2><p className="card-sub">Distribution by phase</p></div>
          </div>
          <div className="donut-chart" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 120 120" className="donut-svg">
              {projectStatus.reduce((acc, item, i) => {
                const total = projectStatus.reduce((s, p) => s + p.value, 0);
                const start = acc;
                const end = start + (item.value / total) * 3.14159 * 2;
                const x1 = 60 + 45 * Math.cos(start);
                const y1 = 60 + 45 * Math.sin(start);
                const x2 = 60 + 45 * Math.cos(end);
                const y2 = 60 + 45 * Math.sin(end);
                const large = end - start > 3.14159 ? 1 : 0;
                acc = end;
                return (
                  <>
                    {i === 0 && <circle cx="60" cy="60" r="45" fill="none" stroke="#1f1f2e" strokeWidth="12" />}
                    <path key={i} d={`M ${x1} ${y1} A 45 45 0 ${large} 1 ${x2} ${y2} L 60 60`} fill={item.color} opacity="0.9" />
                  </>
                );
              }, 0)}
              <text x="60" y="56" textAnchor="middle" className="donut-num">{projectStatus.reduce((s, p) => s + p.value, 0)}</text>
              <text x="60" y="68" textAnchor="middle" className="donut-label">Projects</text>
            </svg>
          </div>
          <ul className="legend-list">
            {projectStatus.map((l, i) => (
              <li key={i} className="legend-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="legend-dot" style={{ background: l.color }} />
                <span className="legend-label">{l.label}</span>
                <span className="legend-count">{l.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <div><h2 className="card-title">Pending Approvals</h2><p className="card-sub">Requiring your attention</p></div>
            <button className="btn-outline btn-sm" onClick={() => navigate("/404")}>View All</button>
          </div>
          <ul className="approval-list">
            {pendingApprovalsList.map((req, i) => (
              <li key={i} className="approval-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="approval-header">
                  <span className="approval-id">{req.id}</span>
                  <span className={`priority-badge priority-${req.priority}`}>{req.priority}</span>
                </div>
                <div className="approval-details">
                  <span className="approval-user">{req.user}</span>
                  <span className="approval-type">{req.type}</span>
                </div>
                <div className="approval-footer">
                  <span className="approval-site">{req.site}</span>
                  <span className="approval-date">{req.submitted}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <div><h2 className="card-title">Region Distribution</h2><p className="card-sub">Sites by region</p></div>
          </div>
          <div className="region-list">
            {regionDistribution.map((region, i) => (
              <div key={i} className="region-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="region-header">
                  <span className="region-label">{region.label}</span>
                  <span className="region-value">{region.value} sites</span>
                </div>
                <div className="region-bar">
                  <div className="region-fill" style={{ width: `${(region.value / Math.max(...regionDistribution.map(r => r.value))) * 100}%`, background: region.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Users Table */}
      <div className="card full-width">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Users</h2>
            <p className="card-sub">Latest registrations and activity</p>
          </div>
          <button className="btn-primary btn-sm" onClick={() => navigate("/404")}>View All →</button>
        </div>
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Projects</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, i) => (
                <tr key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </td>
                  <td><span className="role-badge">{user.role}</span></td>
                  <td>
                    <span className={`status-badge ${user.status === "active" ? "status-active" : user.status === "pending" ? "status-field" : "status-review"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td><span className="project-count">{user.projects}</span></td>
                  <td>
                    <button className="btn-icon btn-view" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>👁️</button>
                    <button className="btn-icon btn-edit" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className="card full-width">
        <div className="card-header">
          <div><h2 className="card-title">System Alerts</h2><p className="card-sub">Platform notifications</p></div>
          <button className="btn-outline btn-sm" onClick={() => navigate("/404")}>Mark All Read</button>
        </div>
        <div className="alerts-grid">
          {systemAlerts.map((alert, i) => (
            <div key={i} className={`alert-item alert-${alert.type}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
              <div className="alert-icon">{alert.type === "warning" ? "⚠️" : alert.type === "error" ? "🔴" : alert.type === "success" ? "✅" : "ℹ️"}</div>
              <div className="alert-content">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-time">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function UsersPage({ navigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roles = ["All", "Lead Archaeologist", "Field Director", "Maya Specialist", "Mesopotamia Expert", "Indus Specialist", "Roman Archaeologist"];

  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "👥", value: adminStats.totalUsers.toLocaleString(), label: "Total Users", bar: 85, accent: true },
          { icon: "🟢", value: adminStats.activeUsers.toLocaleString(), label: "Active Users", bar: 66 },
          { icon: "⏳", value: recentUsers.filter(u => u.status === "pending").length, label: "Pending", bar: 20 },
          { icon: "📊", value: `${adminStats.monthlyGrowth}%`, label: "Growth Rate", bar: 75 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="card">
        <div className="card-header">
          <div><h2 className="card-title">User Management</h2><p className="card-sub">All registered users</p></div>
          <div className="search-box" style={{ flex: "0 0 auto" }}>
            <span className="search-icon">🔍</span>
            <input placeholder="Search users…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {roles.map(role => (
            <button key={role} className={`btn-outline ${filterRole === role ? "btn-active" : ""}`} 
              onClick={() => setFilterRole(role)}
              style={filterRole === role ? { borderColor: "#D4A574", color: "#D4A574" } : {}}>
              {role}
            </button>
          ))}
        </div>
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr><th>User</th><th>Role</th><th>Status</th><th>Join Date</th><th>Projects</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </td>
                  <td><span className="role-badge">{user.role}</span></td>
                  <td>
                    <span className={`status-badge ${user.status === "active" ? "status-active" : user.status === "pending" ? "status-field" : "status-review"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td><span className="project-count">{user.projects}</span></td>
                  <td>
                    <button className="btn-icon btn-view" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>👁️</button>
                    <button className="btn-icon btn-edit" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✏️</button>
                    <button className="btn-icon btn-delete" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ProjectsPage({ navigate }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Active", "Field Work", "Review", "Completed"];
  const filtered = filter === "All" ? excavationsData : excavationsData.filter(e => e.status === filter);

  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "🏛️", value: excavationsData.length, label: "Total Projects", bar: 100, accent: true },
          { icon: "🟢", value: excavationsData.filter(e => e.status === "Active").length, label: "Active", bar: 60 },
          { icon: "📍", value: excavationsData.filter(e => e.status === "Field Work").length, label: "Field Work", bar: 40 },
          { icon: "✅", value: excavationsData.filter(e => e.status === "Completed").length, label: "Completed", bar: 20 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="card">
        <div className="card-header">
          <div><h2 className="card-title">All Projects</h2><p className="card-sub">Full list of field operations</p></div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {statuses.map(s => (
              <button key={s} className={`btn-outline ${filter === s ? "btn-active" : ""}`} onClick={() => setFilter(s)}
                style={filter === s ? { borderColor: "#D4A574", color: "#D4A574" } : {}}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="excavations-table">
            <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>Director</th><th>Budget</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td><div className="t-name">{t.name}</div><div className="t-sub">{t.site}</div></td>
                  <td><span className="region-tag" style={{ color: siteAccents[t.region], borderColor: siteAccents[t.region], background: `${siteAccents[t.region]}1f` }}>{t.region}</span></td>
                  <td className="type-col">{t.type}</td>
                  <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                  <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="progress-pct">{t.progress}%</span></div></td>
                  <td className="date-col" style={{ fontSize: 12 }}>{t.director}</td>
                  <td className="budget-col">{t.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ArtifactsPage({ navigate }) {
  const artifactsData = [
    { id: "ART-001", name: "Alabaster Canopic Jar", site: "Valley of the Kings", region: "Egypt", era: "New Kingdom", date: "1350 BCE", condition: "Excellent", status: "Catalogued" },
    { id: "ART-002", name: "Minoan Double Axe (Labrys)", site: "Knossos Palace", region: "Greece", era: "Middle Minoan", date: "1700 BCE", condition: "Good", status: "Under Study" },
    { id: "ART-003", name: "Jade Mosaic Death Mask", site: "Tikal Temple Complex", region: "Guatemala", era: "Classic Maya", date: "600 CE", condition: "Fragmented", status: "Restored" },
    { id: "ART-004", name: "Cuneiform Cylinder Seal", site: "Ur Excavation", region: "Iraq", era: "Third Dynasty of Ur", date: "2100 BCE", condition: "Excellent", status: "Catalogued" },
    { id: "ART-005", name: "Steatite Unicorn Seal", site: "Mohenjo-daro Survey", region: "Pakistan", era: "Mature Harappan", date: "2500 BCE", condition: "Good", status: "Under Study" },
    { id: "ART-006", name: "Bronze Surgical Kit", site: "Pompeii East Wing", region: "Rome", era: "Roman Imperial", date: "79 CE", condition: "Good", status: "Catalogued" },
    { id: "ART-007", name: "Gold Funerary Mask", site: "Valley of the Kings", region: "Egypt", era: "New Kingdom", date: "1320 BCE", condition: "Excellent", status: "On Display" },
    { id: "ART-008", name: "Obsidian Sacrificial Knife", site: "Tikal Temple Complex", region: "Guatemala", era: "Classic Maya", date: "750 CE", condition: "Good", status: "Catalogued" },
  ];
  const conditionColor = { Excellent: "#22c55e", Good: "#f59e0b", Fragmented: "#ef4444" };

  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📜", value: adminStats.totalArtifacts.toLocaleString(), label: "Total Artifacts", bar: 75, accent: true },
          { icon: "🔬", value: "142", label: "Under Analysis", bar: 55 },
          { icon: "🏛️", value: "89", label: "On Display", bar: 30 },
          { icon: "🔧", value: "34", label: "In Restoration", bar: 20 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="card">
        <div className="card-header">
          <div><h2 className="card-title">Artifact Registry</h2><p className="card-sub">Catalogued finds across all sites</p></div>
          <div className="search-box" style={{ flex: "0 0 auto" }}>
            <span className="search-icon">🔍</span>
            <input placeholder="Search artifacts…" />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="excavations-table">
            <thead><tr><th>ID</th><th>Artifact</th><th>Site</th><th>Era</th><th>Date</th><th>Condition</th><th>Status</th></tr></thead>
            <tbody>
              {artifactsData.map(a => (
                <tr key={a.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td className="type-col" style={{ fontSize: 11.5, fontFamily: "monospace" }}>{a.id}</td>
                  <td><div className="t-name">{a.name}</div><div className="t-sub">{a.region}</div></td>
                  <td className="date-col">{a.site}</td>
                  <td className="type-col" style={{ fontSize: 12 }}>{a.era}</td>
                  <td className="date-col">{a.date}</td>
                  <td><span className="condition-badge" style={{ background: conditionColor[a.condition] + "22", color: conditionColor[a.condition] }}>{a.condition}</span></td>
                  <td><span className="status-badge status-review" style={{ background: a.status === "Catalogued" ? "rgba(34,197,94,0.14)" : a.status === "On Display" ? "rgba(212,165,116,0.14)" : "rgba(245,158,11,0.14)", color: a.status === "Catalogued" ? "#86efac" : a.status === "On Display" ? "#e8c9a8" : "#fcd34d" }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function FinancePage({ navigate }) {
  const budgetData = [
    { site: "Valley of the Kings", allocated: 450000, spent: 284000, region: "Egypt" },
    { site: "Knossos Palace", allocated: 320000, spent: 108000, region: "Greece" },
    { site: "Tikal Temple Complex", allocated: 580000, spent: 580000, region: "Guatemala" },
    { site: "Ur Excavation", allocated: 390000, spent: 201000, region: "Iraq" },
    { site: "Mohenjo-daro Survey", allocated: 275000, spent: 241000, region: "Pakistan" },
    { site: "Pompeii East Wing", allocated: 520000, spent: 298000, region: "Rome" },
    { site: "Machu Picchu Sector B", allocated: 310000, spent: 132000, region: "Guatemala" },
  ];

  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "💰", value: fmt(adminStats.totalFunding), label: "Total Funding", bar: 100, accent: true },
          { icon: "📈", value: fmt(2845000 * 0.68), label: "Spent", bar: 68 },
          { icon: "✅", value: fmt(2845000 * 0.32), label: "Remaining", bar: 32 },
          { icon: "📊", value: "68%", label: "Utilisation", bar: 68 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Budget by Site</h2><p className="card-sub">Allocation vs spend</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {budgetData.map((b, i) => {
            const pct = Math.round((b.spent / b.allocated) * 100);
            return (
              <div key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{b.site}</span>
                    <span className="region-tag" style={{ marginLeft: 10, color: siteAccents[b.region], borderColor: siteAccents[b.region], background: `${siteAccents[b.region]}1f`, fontSize: 11 }}>{b.region}</span>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12.5, color: "rgba(245,245,247,0.65)" }}>
                    <span style={{ color: "#fff", fontWeight: 700 }}>{fmt(b.spent)}</span> / {fmt(b.allocated)}
                    <span style={{ marginLeft: 10, color: pct > 80 ? "#fca5a5" : "#D4A574", fontWeight: 700 }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct > 85 ? "linear-gradient(90deg,#ef4444,#f87171)" : "linear-gradient(90deg,#D4A574,#e8c9a8)", borderRadius: 999, transition: "width 1.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ApprovalsPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "⏳", value: adminStats.pendingApprovals, label: "Pending", bar: 45, accent: true },
          { icon: "✅", value: "142", label: "Approved This Month", bar: 75 },
          { icon: "❌", value: "23", label: "Rejected", bar: 20 },
          { icon: "📊", value: "86%", label: "Approval Rate", bar: 86 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Pending Approvals</h2><p className="card-sub">Requests awaiting your review</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pendingApprovalsList.map((req, i) => (
            <div key={i} className="approval-card" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
              <div className="approval-card-left">
                <div className="approval-card-id">{req.id}</div>
                <div className="approval-card-user">{req.user}</div>
                <div className="approval-card-details">{req.type} · {req.site}</div>
              </div>
              <div className="approval-card-right">
                <span className={`priority-badge priority-${req.priority}`}>{req.priority}</span>
                <span className="approval-card-date">{req.submitted}</span>
                <div className="approval-card-actions">
                  <button className="btn-approve" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✓ Approve</button>
                  <button className="btn-reject" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✕ Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SettingsPage({ navigate }) {
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} className={`toggle ${value ? "toggle-active" : ""}`}>
      <div className="toggle-knob" />
    </div>
  );

  return (
    <>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Account</h2><p className="card-sub">Your profile information</p></div></div>
        <div className="profile-section">
          <img src="https://placehold.co/80x80/1b1b29/f5f5f7?text=AD" alt="avatar" className="profile-avatar" />
          <div className="profile-info">
            <div className="profile-name">Admin User</div>
            <div className="profile-email">System Administrator · admin@strata.org</div>
            <div className="profile-badge">🛡️ Super Admin</div>
          </div>
          <button className="btn-primary btn-sm" onClick={() => navigate("/404")}>Edit Profile</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Preferences</h2><p className="card-sub">Notifications and display</p></div></div>
        <div className="preferences-list">
          {[
            { label: "Push Notifications", sub: "Receive alerts for system events and approvals", value: notifications, set: setNotifications },
            { label: "Weekly Email Digest", sub: "Summary of platform activity", value: emailDigest, set: setEmailDigest },
            { label: "Dark Mode", sub: "Use dark colour scheme across the dashboard", value: darkMode, set: setDarkMode },
          ].map((item, i) => (
            <div key={i} className="preference-item">
              <div>
                <div className="preference-label">{item.label}</div>
                <div className="preference-sub">{item.sub}</div>
              </div>
              <Toggle value={item.value} onChange={item.set} />
            </div>
          ))}
          <div className="preference-item">
            <div>
              <div className="preference-label">Language</div>
              <div className="preference-sub">Interface display language</div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="language-select">
              {["English", "French", "Spanish", "Arabic", "Greek"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card danger-zone">
        <div className="card-header"><div><h2 className="card-title">Danger Zone</h2><p className="card-sub">Irreversible account actions</p></div></div>
        <div className="danger-actions">
          <button className="btn-danger" onClick={() => navigate("/404")}>Reset Password</button>
          <button className="btn-danger" onClick={() => navigate("/404")}>Delete Account</button>
        </div>
      </div>
    </>
  );
}

// ─── DATA EXPORTS ──────────────────────────────────────────────────────────

const artifactsData = [
  { id: "ART-001", name: "Alabaster Canopic Jar", site: "Valley of the Kings", region: "Egypt", era: "New Kingdom", date: "1350 BCE", condition: "Excellent", status: "Catalogued" },
  { id: "ART-002", name: "Minoan Double Axe (Labrys)", site: "Knossos Palace", region: "Greece", era: "Middle Minoan", date: "1700 BCE", condition: "Good", status: "Under Study" },
  { id: "ART-003", name: "Jade Mosaic Death Mask", site: "Tikal Temple Complex", region: "Guatemala", era: "Classic Maya", date: "600 CE", condition: "Fragmented", status: "Restored" },
  { id: "ART-004", name: "Cuneiform Cylinder Seal", site: "Ur Excavation", region: "Iraq", era: "Third Dynasty of Ur", date: "2100 BCE", condition: "Excellent", status: "Catalogued" },
  { id: "ART-005", name: "Steatite Unicorn Seal", site: "Mohenjo-daro Survey", region: "Pakistan", era: "Mature Harappan", date: "2500 BCE", condition: "Good", status: "Under Study" },
  { id: "ART-006", name: "Bronze Surgical Kit", site: "Pompeii East Wing", region: "Rome", era: "Roman Imperial", date: "79 CE", condition: "Good", status: "Catalogued" },
  { id: "ART-007", name: "Gold Funerary Mask", site: "Valley of the Kings", region: "Egypt", era: "New Kingdom", date: "1320 BCE", condition: "Excellent", status: "On Display" },
  { id: "ART-008", name: "Obsidian Sacrificial Knife", site: "Tikal Temple Complex", region: "Guatemala", era: "Classic Maya", date: "750 CE", condition: "Good", status: "Catalogued" },
];

const budgetData = [
  { site: "Valley of the Kings", allocated: 450000, spent: 284000, region: "Egypt" },
  { site: "Knossos Palace", allocated: 320000, spent: 108000, region: "Greece" },
  { site: "Tikal Temple Complex", allocated: 580000, spent: 580000, region: "Guatemala" },
  { site: "Ur Excavation", allocated: 390000, spent: 201000, region: "Iraq" },
  { site: "Mohenjo-daro Survey", allocated: 275000, spent: 241000, region: "Pakistan" },
  { site: "Pompeii East Wing", allocated: 520000, spent: 298000, region: "Rome" },
  { site: "Machu Picchu Sector B", allocated: 310000, spent: 132000, region: "Guatemala" },
];

const conditionColor = { Excellent: "#22c55e", Good: "#f59e0b", Fragmented: "#ef4444" };

const pageMap = {
  dashboard: { title: "Dashboard", sub: "Welcome back, Admin — platform overview.", component: DashboardPage },
  users: { title: "Users", sub: "Manage all registered users and roles.", component: UsersPage },
  projects: { title: "Projects", sub: "All active and completed field operations.", component: ProjectsPage },
  artifacts: { title: "Artifacts", sub: "Registry of all catalogued archaeological finds.", component: ArtifactsPage },
  finance: { title: "Finance", sub: "Funding allocation and expenditure tracking.", component: FinancePage },
  approvals: { title: "Approvals", sub: "Review and manage pending requests.", component: ApprovalsPage },
  settings: { title: "Settings", sub: "Account preferences and configuration.", component: SettingsPage },
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const currentPage = pageMap[activeNav];
  const PageComponent = currentPage.component;

  return (
    <div className="dashboard-root">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img src={logo} alt="Strata" className="brand-logo-img" />
          </div>
          <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">✕</button>
        </div>
        <div className="sidebar-section-label">MAIN MENU</div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "approvals" && <span className="nav-badge">{adminStats.pendingApprovals}</span>}
            </button>
          ))}
        </nav>
        <button className="logout-full-btn" style={{ marginTop: "auto" }} onClick={() => navigate("/login")}>↪ Logout</button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <div className="page-title">
              <h1>{currentPage.title}</h1>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search dashboard…" />
            </div>
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate("/404")}>🔔<span className="notif-dot" /></button>
          </div>
        </header>

        <div className="content-area">
          <PageComponent navigate={navigate} />
        </div>
      </main>
    </div>
  );
}