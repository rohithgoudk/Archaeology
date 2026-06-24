// Artifacts.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Artifact.css";
import img1 from "../../assets/AR3.webp";
import img2 from "../../assets/AR5.webp";
import img3 from "../../assets/AR6.webp";
import img4 from "../../assets/AR7.webp";
import img5 from "../../assets/AR8.webp";
import img6 from "../../assets/AR11.webp";
import img7 from "../../assets/AR9.webp";

const IMAGES = {
  artifact1: img1,
  artifact2: img2,
  artifact3: img3,
  scroll: img4,
  ruins1: img5,
  ruins2: img6,
  ruins3: img7
};

export default function Artifacts() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/404");
  };

  return (
    <div className="artifacts-root">
      {/* Hero with Parallax */}
      <section className="artifacts-hero">
        <div className="artifacts-hero-bg" style={{ backgroundImage: `url(${IMAGES.artifact1})` }} />
        <div className="artifacts-hero-overlay" />
        <div className="artifacts-hero-content">
          <span className="artifacts-badge">Collection</span>
          <h1 className="artifacts-title">
            Objects that outlasted <span>their makers</span>
          </h1>
          <p className="artifacts-subtitle">Spanning 5,000 years of human creativity</p>
        </div>
        <div className="artifacts-scroll-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* Artifact Grid with Flip Cards */}
      <section className="artifacts-grid-section">
        <div className="artifacts-container">
          <div className="artifacts-header">
            <h2>Featured <span>Artifacts</span></h2>
            <p>Each piece tells a story of human ingenuity and survival</p>
          </div>
          
          <div className="artifacts-grid">
            {[
              {
                img: IMAGES.ruins2,
                title: "Terracotta Votive",
                period: "600 BCE",
                origin: "Mesopotamia",
                desc: "Hand-modeled clay figurine depicting a fertility goddess, found in a domestic shrine.",
                material: "Clay",
                dimensions: "12cm x 8cm"
              },
              {
                img: IMAGES.artifact2,
                title: "Bronze Axe Head",
                period: "1200 BCE",
                origin: "Mycenaean Greece",
                desc: "Ceremonial axe with intricate engravings, likely used in ritual sacrifices.",
                material: "Bronze",
                dimensions: "22cm x 10cm"
              },
              {
                img: IMAGES.scroll,
                title: "Papyrus Fragment",
                period: "280 BCE",
                origin: "Alexandria, Egypt",
                desc: "Partial text from the Library of Alexandria, containing philosophical discourse.",
                material: "Papyrus",
                dimensions: "45cm x 30cm"
              },
              {
                img: IMAGES.ruins1,
                title: "Limestone Relief",
                period: "450 BCE",
                origin: "Persepolis",
                desc: "Relief panel showing a royal procession, carved with exceptional detail.",
                material: "Limestone",
                dimensions: "90cm x 60cm"
              },
              {
                img: IMAGES.artifact3,
                title: "Jade Mask",
                period: "300 CE",
                origin: "Maya Civilization",
                desc: "Funerary mask crafted from polished jade, representing a divine ruler.",
                material: "Jade",
                dimensions: "18cm x 15cm"
              },
              {
                img: IMAGES.ruins3,
                title: "Cuneiform Tablet",
                period: "1800 BCE",
                origin: "Babylon",
                desc: "Administrative record detailing grain distribution and trade routes.",
                material: "Clay",
                dimensions: "8cm x 5cm"
              },
            ].map((item, idx) => (
              <div className="artifacts-card" key={idx}>
                <div className="artifacts-card-inner">
                  <div className="artifacts-card-front">
                    <div className="artifacts-card-image">
                      <img src={item.img} alt={item.title} />
                      <div className="artifacts-card-period">{item.period}</div>
                    </div>
                    <div className="artifacts-card-front-content">
                      <h3>{item.title}</h3>
                      <p className="artifacts-origin">{item.origin}</p>
                    </div>
                  </div>
                  <div className="artifacts-card-back">
                    <h4>{item.title}</h4>
                    <p className="artifacts-back-desc">{item.desc}</p>
                    <div className="artifacts-back-details">
                      <span><strong>Material:</strong> {item.material}</span>
                      <span><strong>Dimensions:</strong> {item.dimensions}</span>
                    </div>
                    <button 
                      className="artifacts-back-btn"
                      onClick={handleNavigate}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="artifacts-timeline">
        <div className="artifacts-container">
          <h2>Through the <span>Ages</span></h2>
          <div className="artifacts-timeline-track">
            <div 
              className="artifacts-timeline-item"
              onClick={handleNavigate}
              style={{ cursor: "pointer" }}
            >
              <div className="artifacts-timeline-dot"></div>
              <div className="artifacts-timeline-content">
                <h4>3000 BCE</h4>
                <p>Early Bronze Age artifacts emerge in Mesopotamia</p>
              </div>
            </div>
            <div 
              className="artifacts-timeline-item"
              onClick={handleNavigate}
              style={{ cursor: "pointer" }}
            >
              <div className="artifacts-timeline-dot"></div>
              <div className="artifacts-timeline-content">
                <h4>1200 BCE</h4>
                <p>Mycenaean metalworking reaches its peak</p>
              </div>
            </div>
            <div 
              className="artifacts-timeline-item"
              onClick={handleNavigate}
              style={{ cursor: "pointer" }}
            >
              <div className="artifacts-timeline-dot"></div>
              <div className="artifacts-timeline-content">
                <h4>450 BCE</h4>
                <p>Persian reliefs showcase imperial grandeur</p>
              </div>
            </div>
            <div 
              className="artifacts-timeline-item"
              onClick={handleNavigate}
              style={{ cursor: "pointer" }}
            >
              <div className="artifacts-timeline-dot"></div>
              <div className="artifacts-timeline-content">
                <h4>300 CE</h4>
                <p>Maya jade artistry reaches new heights</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}