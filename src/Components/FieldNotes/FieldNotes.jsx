// FieldNotes.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FieldNotes.css";
import img1 from "../../assets/AR5.webp";
import img2 from "../../assets/AR10.webp";
import img3 from "../../assets/AR14.webp";
import img4 from "../../assets/AR12.webp";
import img5 from "../../assets/AR15.webp";
import img6 from "../../assets/bg3.webp";

const IMAGES = {
  cave: img1,
  ruins2: img2,
  artifact2: img3,
  expedition: img4,
  scroll: img5,
  featured: img6
};

export default function FieldNotes() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/404");
  };

  return (
    <div className="fieldnotes-root">
      {/* Hero with Journal Effect */}
      <section className="fieldnotes-hero">
        <div className="fieldnotes-hero-bg" style={{ backgroundImage: `url(${IMAGES.expedition})` }} />
        <div className="fieldnotes-hero-overlay" />
        <div className="fieldnotes-hero-content">
          <span className="fieldnotes-badge">📝 Field Notes</span>
          <h1 className="fieldnotes-title">
            From the <span>Dig Diary</span>
          </h1>
          <p className="fieldnotes-subtitle">First-hand accounts from our excavations around the world</p>
        </div>
      </section>

      {/* Featured Note with Parallax */}
      <section className="fieldnotes-featured">
        <div className="fieldnotes-featured-bg" style={{ backgroundImage: `url(${IMAGES.featured})` }} />
        <div className="fieldnotes-featured-overlay" />
        <div className="fieldnotes-featured-content">
          <span className="fieldnotes-featured-tag">⭐ Featured Entry</span>
          <h2>The Cenote of Souls</h2>
          <p className="fieldnotes-featured-location">Yucatán, Mexico · June 2025</p>
          <p className="fieldnotes-featured-excerpt">
            "The water was impossibly clear. As we descended into the cenote, 
            our lights caught glimpses of pottery, jade, and something larger 
            — a royal sarcophagus, untouched for over a millennium..."
          </p>
          <button 
            className="fieldnotes-featured-btn"
            onClick={handleNavigate}
          >
            Read Full Story →
          </button>
        </div>
      </section>

      {/* Notes Grid with Hover Reveal (flip disabled on touch, see CSS) */}
      <section className="fieldnotes-grid-section">
        <div className="fieldnotes-container">
          <h2>Recent <span>Entries</span></h2>
          <div className="fieldnotes-grid">
            {[
              {
                date: "June 12, 2025",
                location: "Saqqara, Egypt",
                title: "The Unmarked Tomb",
                excerpt: "Today we broke through the final seal. The chamber before us was untouched for over 4,500 years.",
                img: IMAGES.scroll,
                tag: "Egyptology",
                
              },
              {
                date: "May 28, 2025",
                location: "Aegean Sea, Greece",
                title: "Submerged City Rising",
                excerpt: "The sonar showed clear outlines of a Hellenistic agora, complete with colonnades and market stalls.",
                img: IMAGES.ruins2,
                tag: "Maritime",
               
              },
              {
                date: "April 4, 2025",
                location: "Yucatán, Mexico",
                title: "Cenote Burial",
                excerpt: "With each meter we descended, we found another offering bundle, perfectly preserved.",
                img: IMAGES.cave,
                tag: "Maya Studies",
                
              },
              {
                date: "March 15, 2025",
                location: "Bulgaria",
                title: "Thracian Gold",
                excerpt: "Among the usual potsherds and stone tools, we uncovered something extraordinary — a gold phiale.",
                img: IMAGES.artifact2,
                tag: "Metalwork",
                
              },
            ].map((note, idx) => (
              <div className="fieldnotes-card" key={idx}>
                <div className="fieldnotes-card-inner">
                  <div className="fieldnotes-card-front">
                    <div className="fieldnotes-card-image">
                      <img src={note.img} alt={note.title} />
                      <span className="fieldnotes-card-emoji">{note.emoji}</span>
                    </div>
                    <div className="fieldnotes-card-content">
                      <div className="fieldnotes-card-meta">
                        <span className="fieldnotes-card-date">{note.date}</span>
                        <span className="fieldnotes-card-location">{note.location}</span>
                      </div>
                      <h3>{note.title}</h3>
                      <p className="fieldnotes-card-excerpt">{note.excerpt}</p>
                      <span className="fieldnotes-card-tag">{note.tag}</span>
                      {/* This button is hidden by default (only the
                          back face's button is normally visible after
                          the 3D flip on hover). On touch devices the
                          CSS disables the flip and reveals this button
                          instead, so the action stays reachable without
                          a hover state. */}
                      <button
                        className="fieldnotes-card-mobile-btn"
                        onClick={handleNavigate}
                      >
                        Read Full Entry →
                      </button>
                    </div>
                  </div>
                  <div className="fieldnotes-card-back">
                    <h4>Continue Reading</h4>
                    <p>This entry reveals fascinating details about the excavation process, the challenges faced by the team, and the significance of the discovery.</p>
                    <button 
                      className="fieldnotes-card-btn"
                      onClick={handleNavigate}
                    >
                      Read Full Entry →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}