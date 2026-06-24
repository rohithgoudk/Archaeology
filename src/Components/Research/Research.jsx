// Research.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Research.css";
import img1 from "../../assets/AR14.webp";

const IMAGES = {
  dig: img1,
};

export default function Research() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/404");
  };

  return (
    <div className="research-root">
      {/* Hero with Typewriter Effect */}
      <section className="research-hero">
        <div className="research-hero-bg" style={{ backgroundImage: `url(${IMAGES.dig})` }} />
        <div className="research-hero-overlay" />
        <div className="research-hero-content">
          <span className="research-badge">🔬 Research</span>
          <h1 className="research-title">
            Advancing <span>Archaeological Science</span>
          </h1>
          <div className="research-typewriter">
            <span>Uncovering the past through innovation</span>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="research-stats">
        <div className="research-stats-grid">
          <div className="research-stat-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
            <div className="research-stat-number" data-count="247">0</div>
            <span className="research-stat-label">Active Projects</span>
          </div>
          <div className="research-stat-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
            <div className="research-stat-number" data-count="56">0</div>
            <span className="research-stat-label">Countries</span>
          </div>
          <div className="research-stat-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
            <div className="research-stat-number" data-count="1,892">0</div>
            <span className="research-stat-label">Publications</span>
          </div>
          <div className="research-stat-item" onClick={handleNavigate} style={{ cursor: "pointer" }}>
            <div className="research-stat-number" data-count="43">0</div>
            <span className="research-stat-label">Research Centers</span>
          </div>
        </div>
      </section>

      {/* Research Programs with Glowing Cards */}
      <section className="research-programs">
        <div className="research-container">
          <h2>Our Research <span>Programs</span></h2>
          <p className="research-subtitle">Pioneering new frontiers in archaeology</p>
          
          <div className="research-grid">
            {[
              {
                icon: "🔬",
                title: "Isotopic Analysis",
                desc: "Tracing ancient migration patterns through bone chemistry and dental enamel analysis.",
                tag: "Bioarchaeology",
                color: "#8b5e3c"
              },
              {
                icon: "🛰️",
                title: "LiDAR Survey",
                desc: "Revealing hidden structures beneath dense jungle canopies using aerial laser scanning.",
                tag: "Remote Sensing",
                color: "#4a7c59"
              },
              {
                icon: "🧬",
                title: "DNA Sequencing",
                desc: "Extracting ancient DNA from human remains and environmental samples to understand past populations.",
                tag: "Genomics",
                color: "#c0392b"
              },
              {
                icon: "📷",
                title: "Photogrammetry",
                desc: "Creating 3D digital reconstructions of excavation sites and artifacts for remote study.",
                tag: "Digital Archaeology",
                color: "#2980b9"
              },
              {
                icon: "📐",
                title: "Stratigraphy",
                desc: "Analyzing soil layers and deposition patterns to establish chronological sequences.",
                tag: "Field Methods",
                color: "#8e44ad"
              },
              {
                icon: "🧪",
                title: "Residue Analysis",
                desc: "Identifying organic residues on pottery and tools to understand ancient diets.",
                tag: "Chemistry",
                color: "#d35400"
              },
            ].map((item, idx) => (
              <div 
                className="research-card" 
                key={idx} 
                style={{ '--card-color': item.color }}
                onClick={handleNavigate}
              >
                <div className="research-card-glow" />
                <div className="research-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="research-card-tag">{item.tag}</span>
                <div className="research-card-progress">
                  <div className="research-card-progress-bar" style={{ width: `${60 + Math.random() * 35}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications with Masonry Layout */}
      <section className="research-publications">
        <div className="research-container">
          <h2>Recent <span>Publications</span></h2>
          <div className="research-publications-masonry">
            {[
              {
                title: "The Indus Valley Script: A New Decipherment Approach",
                journal: "Journal of Ancient Languages",
                year: "2025",
                authors: "Dr. S. Patel, Dr. A. Kumar",
                type: "Paper"
              },
              {
                title: "Climate Change and Collapse: A Case Study from the Maya Lowlands",
                journal: "Environmental Archaeology",
                year: "2024",
                authors: "Dr. M. Rodriguez, Dr. T. Chen",
                type: "Study"
              },
              {
                title: "Ground-Penetrating Radar in Urban Archaeology",
                journal: "Archaeological Prospection",
                year: "2024",
                authors: "Prof. J. Smith, Dr. L. Brown",
                type: "Review"
              },
              {
                title: "Ancient DNA Reveals Migration Patterns in Bronze Age Europe",
                journal: "Nature Archaeology",
                year: "2024",
                authors: "Dr. E. Williams et al.",
                type: "Paper"
              },
              {
                title: "3D Reconstruction of Pompeii's Forgotten Insula",
                journal: "Digital Heritage Journal",
                year: "2023",
                authors: "Dr. C. Martinez",
                type: "Study"
              },
            ].map((pub, idx) => (
              <div 
                className="research-pub-card" 
                key={idx} 
                style={{ height: `${200 + Math.random() * 100}px` }}
                onClick={handleNavigate}
              >
                <div className="research-pub-type">{pub.type}</div>
                <h4>{pub.title}</h4>
                <p className="research-pub-journal">{pub.journal}</p>
                <div className="research-pub-meta">
                  <span>{pub.year}</span>
                  <span>{pub.authors}</span>
                </div>
                <a 
                  href="#" 
                  className="research-pub-link"
                  onClick={handleNavigate}
                >
                  Read Abstract →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}