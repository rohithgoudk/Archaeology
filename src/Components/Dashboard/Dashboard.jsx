import { useState } from "react";
import "./Dashboard.css";
import logo from "../../assets/Stacklyimg1.webp"
import { useNavigate } from "react-router-dom";
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

const fieldTeam = [
  { name: "Dr. Sarah Chen", role: "Lead Archaeologist — Egypt", experience: 14, avatar: "SC", status: "active", projects: 3, speciality: "Egyptian Tombs & Hieroglyphics", email: "s.chen@strata.org" },
  { name: "Dr. Nikos Papadopoulos", role: "Field Director — Greece", experience: 11, avatar: "NP", status: "active", projects: 2, speciality: "Minoan & Mycenaean Cultures", email: "n.papadopoulos@strata.org" },
  { name: "Dr. Elena Rodriguez", role: "Maya Specialist — Guatemala", experience: 9, avatar: "ER", status: "away", projects: 2, speciality: "Mesoamerican Civilisations", email: "e.rodriguez@strata.org" },
  { name: "Dr. James O'Neill", role: "Mesopotamia Expert — Iraq", experience: 16, avatar: "JO", status: "active", projects: 2, speciality: "Cuneiform & Ancient Trade", email: "j.oneill@strata.org" },
  { name: "Dr. Priya Sharma", role: "Indus Specialist — Pakistan", experience: 8, avatar: "PS", status: "active", projects: 1, speciality: "Harappan Urbanism", email: "p.sharma@strata.org" },
  { name: "Dr. Marco Ferretti", role: "Roman Archaeologist — Italy", experience: 12, avatar: "MF", status: "active", projects: 1, speciality: "Roman Urban Planning", email: "m.ferretti@strata.org" },
];

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

const researchPapers = [
  { title: "Trade Networks in Bronze Age Crete", authors: "Papadopoulos, N. et al.", journal: "Journal of Hellenic Studies", year: 2025, status: "Published", citations: 12 },
  { title: "Cuneiform Evidence for Long-Distance Commerce in the Third Dynasty of Ur", authors: "O'Neill, J., Al-Rashid, M.", journal: "Iraq (British School of Archaeology)", year: 2025, status: "Published", citations: 7 },
  { title: "Isotopic Analysis of Mummified Remains from KV-63", authors: "Chen, S. et al.", journal: "Journal of Archaeological Science", year: 2025, status: "In Review", citations: 0 },
  { title: "Urban Water Management at Mohenjo-daro: New Geophysical Survey Results", authors: "Sharma, P., Khan, R.", journal: "Cambridge Archaeological Journal", year: 2024, status: "Published", citations: 31 },
  { title: "LiDAR Survey of Tikal Hinterlands: Settlement Patterns Reconsidered", authors: "Rodriguez, E., Flores, A.", journal: "Latin American Antiquity", year: 2024, status: "Published", citations: 44 },
  { title: "Pompeii's Eastern Neighbourhood: Class, Commerce and Urban Resilience", authors: "Ferretti, M. et al.", journal: "Papers of the British School at Rome", year: 2025, status: "In Draft", citations: 0 },
];

const scheduleEvents = [
  { date: "Jun 21", event: "Valley of Kings — Phase 2 excavation begins", site: "Luxor, Egypt", type: "urgent" },
  { date: "Jun 25", event: "Knossos — Structural analysis of west wing", site: "Crete, Greece", type: "normal" },
  { date: "Jul 2", event: "Ur — Cuneiform tablet cataloguing session", site: "Dhi Qar, Iraq", type: "normal" },
  { date: "Jul 10", event: "Team debrief: Tikal final report review", site: "Virtual", type: "meeting" },
  { date: "Jul 18", event: "Pompeii — Ground-penetrating radar survey", site: "Naples, Italy", type: "normal" },
  { date: "Aug 5", event: "Mohenjo-daro — 3D reconstruction final review", site: "Sindh, Pakistan", type: "normal" },
  { date: "Aug 14", event: "Annual field directors' symposium", site: "London, UK", type: "meeting" },
  { date: "Sep 1", event: "Machu Picchu — Sector B excavation resumes", site: "Cusco, Peru", type: "normal" },
  { date: "Oct 15", event: "Pompeii — Phase 1 report submission deadline", site: "Naples, Italy", type: "urgent" },
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

const publications = [
  { title: "Strata Annual Review 2024", type: "Annual Report", year: 2024, pages: 128, downloads: 3841 },
  { title: "Handbook of Field Documentation Methods", type: "Technical Manual", year: 2023, pages: 264, downloads: 7120 },
  { title: "Egyptian Royal Tombs: A Comparative Study", type: "Monograph", year: 2024, pages: 312, downloads: 2450 },
  { title: "Digital Archaeology: LiDAR and Photogrammetry in Practice", type: "Field Guide", year: 2025, pages: 96, downloads: 5633 },
  { title: "Conservation Ethics in Active Excavation Contexts", type: "Proceedings", year: 2023, pages: 180, downloads: 1920 },
];

const liveFeed = [
  { icon: "🏛️", text: "Unmarked tomb discovered in Valley of the Kings with intact burial chamber", time: "2h ago", type: "discovery" },
  { icon: "📜", text: "New cuneiform tablets translated from Ur — revealing ancient trading routes", time: "4h ago", type: "research" },
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
  Active: "status-active", "Field Work": "status-field",
  Completed: "status-complete", Review: "status-review",
};

const conditionColor = { Excellent: "#22c55e", Good: "#f59e0b", Fragmented: "#ef4444" };
const paperStatusColor = { Published: "#22c55e", "In Review": "#f59e0b", "In Draft": "#8B9DAF" };
const scheduleTypeColor = { urgent: "#ef4444", normal: "#D4A574", meeting: "#8B9DAF" };

function fmt(n) { return "$" + n.toLocaleString(); }

// ─── PAGE COMPONENTS ───────────────────────────────────────────────

function DashboardPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "🏛️", delta: "+3 this month", value: "12", label: "Active Excavations", bar: 72, accent: true },
          { icon: "📜", delta: "+42 this week", value: "2,847", label: "Artifacts Catalogued", bar: 64 },
          { icon: "💰", delta: "On track", value: "$4.2M", label: "Research Funding", bar: 88 },
          { icon: "🌍", delta: "+2 this quarter", value: "18", label: "Active Countries", bar: 90 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span><span className="stat-delta up">{s.delta}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <section className="mid-grid">
        <div className="card">
          <div className="card-header">
            <div><h2 className="card-title">Active Excavations</h2><p className="card-sub">Current field operations overview</p></div>
          </div>
          <div className="table-wrapper">
            <table className="excavations-table">
              <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>End Date</th><th>Budget</th></tr></thead>
              <tbody>
                {excavationsData.slice(0, 5).map(t => (
                  <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                    <td><div className="t-name">{t.name}</div><div className="t-sub">{t.site} · {t.director}</div></td>
                    <td><span className="region-tag" style={{ color: siteAccents[t.region], borderColor: siteAccents[t.region], background: `${siteAccents[t.region]}1f` }}>{t.region}</span></td>
                    <td className="type-col">{t.type}</td>
                    <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                    <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="progress-pct">{t.progress}%</span></div></td>
                    <td className="date-col">{t.endDate}</td>
                    <td className="budget-col">{t.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Live Feed</h2><p className="card-sub">Field updates</p></div></div>
          <ul className="activity-list">
            {liveFeed.map((a, i) => (
              <li key={i} className={`activity-item act-${a.type}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="act-icon">{a.icon}</span>
                <div><p className="act-text">{a.text}</p><span className="act-time">{a.time}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Field Team</h2><p className="card-sub">Active researchers</p></div></div>
          <ul className="team-list">
            {fieldTeam.slice(0, 4).map((m, i) => (
              <li key={i} className="team-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="member-avatar">{m.avatar}<span className={`online-dot dot-${m.status}`} /></div>
                <div className="member-info"><div className="member-name">{m.name}</div><div className="member-role">{m.role}</div></div>
                <div className="member-projects"><span className="proj-count">{m.experience}</span><span className="proj-label">yrs</span></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Upcoming Deadlines</h2><p className="card-sub">Next 60 days</p></div></div>
          <ul className="milestone-list">
            {[
              { site: "Valley of the Kings", event: "Tomb chamber excavation — Phase 2", date: "Jun 21", done: false, urgent: true },
              { site: "Knossos Palace", event: "West wing structural analysis", date: "Jun 25", done: false, urgent: false },
              { site: "Ur Excavation", event: "Cuneiform tablet cataloguing", date: "Jul 2", done: false, urgent: false },
              { site: "Mohenjo-daro", event: "3D site reconstruction — Final review", date: "Aug 05", done: false, urgent: false },
              { site: "Tikal Temple", event: "Final report submission", date: "Jun 14", done: true, urgent: false },
            ].map((m, i) => (
              <li key={i} className={`milestone-item ${m.done ? "ms-done" : ""} ${m.urgent ? "ms-urgent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="ms-date"><span>{m.date.split(" ")[0]}</span><span>{m.date.split(" ")[1]}</span></div>
                <div className="ms-line"><div className="ms-dot" /></div>
                <div className="ms-body"><div className="ms-event">{m.event}</div><div className="ms-project">{m.site}</div></div>
                {m.urgent && <span className="ms-tag">Urgent</span>}
                {m.done && <span className="ms-tag ms-done-tag">Done</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Site Distribution</h2><p className="card-sub">By region</p></div></div>
          <div className="donut-chart" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#1f1f2e" strokeWidth="16" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#D4A574" strokeWidth="16" strokeDasharray="65 212" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#8B9DAF" strokeWidth="16" strokeDasharray="57 212" strokeDashoffset="-65" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#5D8A5E" strokeWidth="16" strokeDasharray="49 212" strokeDashoffset="-122" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#C49A6C" strokeWidth="16" strokeDasharray="41 212" strokeDashoffset="-171" strokeLinecap="round" />
              <text x="60" y="56" textAnchor="middle" className="donut-num">18</text>
              <text x="60" y="68" textAnchor="middle" className="donut-label">Sites</text>
            </svg>
          </div>
          <ul className="legend-list">
            {[{ color: "#D4A574", label: "Egypt", count: 5 }, { color: "#8B9DAF", label: "Greece", count: 4 }, { color: "#5D8A5E", label: "Maya", count: 4 }, { color: "#C49A6C", label: "Mesopotamia", count: 3 }, { color: "#B8860B", label: "Indus", count: 2 }].map((l, i) => (
              <li key={i} className="legend-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="legend-dot" style={{ background: l.color }} />
                <span className="legend-label">{l.label}</span>
                <span className="legend-count">{l.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ExcavationsPage({ navigate }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Active", "Field Work", "Review", "Completed"];
  const filtered = filter === "All" ? excavationsData : excavationsData.filter(e => e.status === filter);
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "🏛️", value: excavationsData.length, label: "Total Sites", bar: 100 },
          { icon: "🟢", value: excavationsData.filter(e => e.status === "Active").length, label: "Active Now", bar: 60, accent: true },
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
          <div><h2 className="card-title">All Excavations</h2><p className="card-sub">Full list of field operations</p></div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {statuses.map(s => (
              <button key={s} className={`btn-outline ${filter === s ? "btn-active" : ""}`} onClick={() => setFilter(s)}
                style={filter === s ? { borderColor: "#D4A574", color: "#D4A574" } : {}}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="excavations-table">
            <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>Director</th><th>End Date</th><th>Budget</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td><div className="t-name">{t.name}</div><div className="t-sub">{t.site}</div></td>
                  <td><span className="region-tag" style={{ color: siteAccents[t.region], borderColor: siteAccents[t.region], background: `${siteAccents[t.region]}1f` }}>{t.region}</span></td>
                  <td className="type-col">{t.type}</td>
                  <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                  <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="progress-pct">{t.progress}%</span></div></td>
                  <td className="date-col" style={{ fontSize: 12 }}>{t.director}</td>
                  <td className="date-col">{t.endDate}</td>
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

function TeamsPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "👥", value: fieldTeam.length, label: "Researchers", bar: 80 },
          { icon: "🟢", value: fieldTeam.filter(m => m.status === "active").length, label: "Online Now", bar: 85, accent: true },
          { icon: "📋", value: fieldTeam.reduce((a, m) => a + m.projects, 0), label: "Active Projects", bar: 70 },
          { icon: "🏅", value: Math.round(fieldTeam.reduce((a, m) => a + m.experience, 0) / fieldTeam.length), label: "Avg. Yrs Exp.", bar: 75 },
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
        <div className="card-header"><div><h2 className="card-title">Field Researchers</h2><p className="card-sub">Full team directory</p></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {fieldTeam.map((m, i) => (
            <div key={i} style={{ background: "var(--surface-2)", borderRadius: 12, padding: "18px 20px", border: "1px solid var(--border)", transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,116,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div className="member-avatar" style={{ width: 46, height: 46, fontSize: 14 }}>{m.avatar}<span className={`online-dot dot-${m.status}`} /></div>
                <div>
                  <div className="member-name" style={{ fontSize: 15 }}>{m.name}</div>
                  <div className="member-role">{m.role}</div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.55)", lineHeight: 1.9 }}>
                <div>🎓 {m.speciality}</div>
                <div>✉️ {m.email}</div>
                <div>📂 {m.projects} active project{m.projects !== 1 ? "s" : ""} · {m.experience} yrs experience</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ArtifactsPage({ navigate }) {
  const [search, setSearch] = useState("");
  const filtered = artifactsData.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.site.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📜", value: "2,847", label: "Total Catalogued", bar: 75, accent: true },
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
            <input placeholder="Search artifacts…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="excavations-table">
            <thead><tr><th>ID</th><th>Artifact</th><th>Site</th><th>Era</th><th>Date</th><th>Condition</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td className="type-col" style={{ fontSize: 11.5, fontFamily: "monospace" }}>{a.id}</td>
                  <td><div className="t-name">{a.name}</div><div className="t-sub">{a.region}</div></td>
                  <td className="date-col">{a.site}</td>
                  <td className="type-col" style={{ fontSize: 12 }}>{a.era}</td>
                  <td className="date-col">{a.date}</td>
                  <td><span style={{ color: conditionColor[a.condition], fontWeight: 700, fontSize: 12 }}>{a.condition}</span></td>
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

function ResearchPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📄", value: researchPapers.length, label: "Active Papers", bar: 80, accent: true },
          { icon: "✅", value: researchPapers.filter(p => p.status === "Published").length, label: "Published", bar: 70 },
          { icon: "🔍", value: researchPapers.filter(p => p.status === "In Review").length, label: "In Review", bar: 20 },
          { icon: "📊", value: researchPapers.reduce((a, p) => a + p.citations, 0), label: "Total Citations", bar: 60 },
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
        <div className="card-header"><div><h2 className="card-title">Research Papers</h2><p className="card-sub">Active publications and submissions</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {researchPapers.map((p, i) => (
            <div key={i} style={{ padding: "16px 20px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)", transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,116,0.35)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.6)", marginBottom: 6 }}>{p.authors}</div>
                  <div style={{ fontSize: 12, color: "rgba(245,245,247,0.45)" }}>{p.journal} · {p.year}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <span style={{ background: paperStatusColor[p.status] + "22", color: paperStatusColor[p.status], borderRadius: 999, padding: "3px 10px", fontSize: 11.5, fontWeight: 700 }}>{p.status}</span>
                  {p.citations > 0 && <span style={{ fontSize: 12, color: "rgba(245,245,247,0.5)" }}>📊 {p.citations} citations</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SchedulePage({ navigate }) {
  return (
    <>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Field Calendar</h2><p className="card-sub">All upcoming deadlines and events</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {scheduleEvents.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 12px", borderRadius: 10, transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ width: 50, flexShrink: 0, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: scheduleTypeColor[ev.type], textTransform: "uppercase", letterSpacing: "0.04em" }}>{ev.date.split(" ")[0]}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{ev.date.split(" ")[1]}</div>
              </div>
              <div style={{ width: 3, alignSelf: "stretch", borderRadius: 999, background: scheduleTypeColor[ev.type], opacity: 0.7, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{ev.event}</div>
                <div style={{ fontSize: 12, color: "rgba(245,245,247,0.55)", marginTop: 3 }}>📍 {ev.site}</div>
              </div>
              {ev.type === "urgent" && <span style={{ background: "rgba(239,68,68,0.16)", color: "#fca5a5", borderRadius: 999, padding: "3px 10px", fontSize: 11.5, fontWeight: 700, flexShrink: 0 }}>Urgent</span>}
              {ev.type === "meeting" && <span style={{ background: "rgba(139,157,175,0.2)", color: "#8B9DAF", borderRadius: 999, padding: "3px 10px", fontSize: 11.5, fontWeight: 700, flexShrink: 0 }}>Meeting</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BudgetPage({ navigate }) {
  const totalAllocated = budgetData.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = budgetData.reduce((a, b) => a + b.spent, 0);
  const remaining = totalAllocated - totalSpent;
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "💰", value: fmt(totalAllocated), label: "Total Allocated", bar: 100, accent: true },
          { icon: "📉", value: fmt(totalSpent), label: "Total Spent", bar: Math.round((totalSpent / totalAllocated) * 100) },
          { icon: "✅", value: fmt(remaining), label: "Remaining", bar: Math.round((remaining / totalAllocated) * 100) },
          { icon: "📊", value: Math.round((totalSpent / totalAllocated) * 100) + "%", label: "Utilisation Rate", bar: Math.round((totalSpent / totalAllocated) * 100) },
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

function PublicationsPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📚", value: publications.length, label: "Publications", bar: 80, accent: true },
          { icon: "📥", value: publications.reduce((a, p) => a + p.downloads, 0).toLocaleString(), label: "Total Downloads", bar: 90 },
          { icon: "📄", value: publications.reduce((a, p) => a + p.pages, 0).toLocaleString(), label: "Total Pages", bar: 65 },
          { icon: "🗓️", value: "2025", label: "Latest Year", bar: 100 },
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
        <div className="card-header"><div><h2 className="card-title">Published Works</h2><p className="card-sub">Books, guides, and reports</p></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {publications.map((pub, i) => (
            <div key={i} style={{ background: "var(--surface-2)", borderRadius: 12, padding: "20px", border: "1px solid var(--border)", transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,116,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>📖</div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 6, lineHeight: 1.4 }}>{pub.title}</div>
              <div style={{ fontSize: 12, color: "rgba(245,245,247,0.5)", marginBottom: 14 }}>{pub.type} · {pub.year} · {pub.pages} pages</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#D4A574", fontWeight: 700 }}>📥 {pub.downloads.toLocaleString()} downloads</span>
                <button className="btn-outline" style={{ padding: "5px 12px", fontSize: 11.5 }} onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>View</button>
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
    <div onClick={() => onChange(!value)} style={{ width: 42, height: 24, borderRadius: 999, background: value ? "#D4A574" : "rgba(255,255,255,0.12)", cursor: "pointer", transition: "all 0.3s ease", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: value ? 20 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );

  return (
    <>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Account</h2><p className="card-sub">Your profile information</p></div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
          <img src="https://placehold.co/64x64/1b1b29/f5f5f7?text=You" alt="avatar" style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(212,165,116,0.4)" }} />
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>Dr. Alex Morgan</div>
            <div style={{ fontSize: 13, color: "rgba(245,245,247,0.55)", marginTop: 2 }}>Programme Director · alex.morgan@strata.org</div>
            <div style={{ fontSize: 12, color: "#D4A574", marginTop: 4 }}>🏛️ 7 years with Strata</div>
          </div>
        </div>
        <button className="btn-outline" style={{ borderColor: "#D4A574", color: "#D4A574" }} onClick={() => navigate("/404")}>Edit Profile</button>
      </div>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Preferences</h2><p className="card-sub">Notifications and display</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Push Notifications", sub: "Receive alerts for discoveries and deadline changes", value: notifications, set: setNotifications },
            { label: "Weekly Email Digest", sub: "Summary of field activity sent every Monday", value: emailDigest, set: setEmailDigest },
            { label: "Dark Mode", sub: "Use dark colour scheme across the dashboard", value: darkMode, set: setDarkMode },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{item.label}</div>
                <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.5)", marginTop: 2 }}>{item.sub}</div>
              </div>
              <Toggle value={item.value} onChange={item.set} />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18 }}>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>Language</div>
              <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.5)", marginTop: 2 }}>Interface display language</div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "#fff", borderRadius: 8, padding: "7px 12px", fontSize: 13, outline: "none" }}>
              {["English", "French", "Spanish", "Arabic", "Greek"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Danger Zone</h2><p className="card-sub">Irreversible account actions</p></div></div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn-outline" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }} onClick={() => navigate("/404")}>Reset Password</button>
          <button className="btn-outline" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }} onClick={() => navigate("/404")}>Delete Account</button>
        </div>
      </div>
    </>
  );
}

const pageMap = {
  dashboard: { title: "Dashboard", sub: "Welcome back — here's your archaeological overview.", component: DashboardPage },
  excavations: { title: "Excavations", sub: "All active and completed field operations.", component: ExcavationsPage },
  teams: { title: "Field Teams", sub: "Manage your researchers and field directors.", component: TeamsPage },
  artifacts: { title: "Artifacts", sub: "Registry of all catalogued archaeological finds.", component: ArtifactsPage },
  research: { title: "Research", sub: "Publications, papers, and academic output.", component: ResearchPage },
  schedule: { title: "Schedule", sub: "Deadlines, field dates, and upcoming events.", component: SchedulePage },
  budget: { title: "Budget", sub: "Funding allocation and expenditure tracking.", component: BudgetPage },
  publications: { title: "Publications", sub: "Books, manuals, and annual reports.", component: PublicationsPage },
  settings: { title: "Settings", sub: "Account preferences and configuration.", component: SettingsPage },
};

export default function Dashboard() {
  const navigate=useNavigate()
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
          {navItems.slice(0, 6).map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "excavations" && <span className="nav-badge">7</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-section-label">MANAGEMENT</div>
        <nav className="sidebar-nav">
          {navItems.slice(6).map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="logout-full-btn" style={{ marginTop: "auto" }} onClick={()=>navigate("/login")}>↪ Logout</button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <div className="page-title">
              <h1>{currentPage.title}</h1>
              <p>{currentPage.sub}</p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search sites, artifacts, researchers…" />
            </div>
            <button className="icon-btn" aria-label="Notifications" onClick={()=>navigate("/404")}>🔔<span className="notif-dot" /></button>
          </div>
        </header>

        <div className="content-area">
          <PageComponent navigate={navigate} />
        </div>
      </main>
    </div>
  );
}