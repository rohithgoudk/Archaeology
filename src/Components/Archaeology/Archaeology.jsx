// ArchaeologyPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ArchaeologyPage.css";
import bg1 from "../../assets/bg1.webp";
import bg2 from "../../assets/bg2.webp";
import bg3 from "../../assets/bg3.webp";
import img1 from "../../assets/AR1.webp";
import img2 from "../../assets/AR2.webp";
import img3 from "../../assets/AR3.webp";
import img4 from "../../assets/AR4.webp";
import img5 from "../../assets/AR5.webp";
import img6 from "../../assets/AR6.webp";
import img7 from "../../assets/AR7.webp";
import img8 from "../../assets/AR8.webp";
import img9 from "../../assets/AR9.webp";
import img10 from "../../assets/AR10.webp";
import img11 from "../../assets/AR11.webp";
import img12 from "../../assets/AR12.webp";
import img13 from "../../assets/AR13.webp";
import img14 from "../../assets/AR14.webp";

// ----- 3 HERO SLIDESHOW IMAGES (7s zoom per image) -----
const HERO_SLIDES = [img6, bg2, img2];

// Other static images for rest of page
const IMAGES = {
  dig: img1,
  ruins1: img2,
  ruins2: img3,
  artifact1: img4,
  artifact2: img5,
  artifact3: img6,
  expedition: img7,
  cave: img8,
  scroll: img9,
  team: img10,
  egypt: img11,
  greece: img12,
  mexico: img13,
};

export default function ArchaeologyPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  // ----- SLIDESHOW: each image zooms for 7s, then cut to the next -----
  useEffect(() => {
    const totalSlides = HERO_SLIDES.length;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 7000);

    // Preload all images
    HERO_SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => clearInterval(intervalRef.current);
  }, []);

  // Navigation handler for all buttons and links
  const handleNavigate = (e, path = "/404") => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="arq-root">
      {/* ── HERO with 3-IMAGE ZOOM SLIDESHOW ── */}
      <section className="arq-hero">
        <div className="arq-slideshow">
          {HERO_SLIDES.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={isActive ? `${src}-${activeIndex}` : src}
                className={`arq-slide${isActive ? " arq-slide--active" : ""}`}
                style={{ backgroundImage: `url(${src})` }}
                aria-hidden={!isActive}
              />
            );
          })}
          <div className="arq-slideshow-overlay" />
        </div>

        {/* Hero content */}
        <div className="arq-hero-content">
          <p className="arq-eyebrow arq-fade-rise">· Field Archaeology</p>
          <h1 className="arq-headline arq-fade-rise">
            Beneath the dust,{" "}
            <em>civilisations wait</em>
            <br />
            to speak again.
          </h1>
          <p className="arq-hero-desc arq-fade-rise-d1">
            We excavate lost worlds, decode ancient languages, and preserve the
            fragile evidence of human ingenuity — one careful brushstroke at a time.
          </p>
          <div className="arq-hero-actions arq-fade-rise-d2">
            <button 
              className="arq-btn arq-btn--hero" 
              onClick={handleNavigate}
            >
              Begin Expedition
            </button>
            <a 
              href="#discoveries" 
              className="arq-link-arrow"
              onClick={(e) => handleNavigate(e)}
            >
              Latest Discoveries <span>↓</span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="arq-scroll-cue">
          <span />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="arq-stats">
        <div className="arq-container arq-stats-grid">
          {[
            { n: "4,200+", l: "Sites Excavated" },
            { n: "38", l: "Countries Active" },
            { n: "1.2M", l: "Artifacts Catalogued" },
            { n: "101", l: "Years of Field Work" },
          ].map((s) => (
            <div className="arq-stat" key={s.l}>
              <span className="arq-stat-n">{s.n}</span>
              <span className="arq-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCOVERIES ── */}
      <section className="arq-section arq-discoveries" id="discoveries">
        <div className="arq-container">
          <p className="arq-section-label">Latest Discoveries</p>
          <h2 className="arq-section-title">
            The earth still holds <em>infinite secrets.</em>
          </h2>
          <div className="arq-discoveries-grid">
            <DiscoveryCard
              img={IMAGES.egypt}
              label="Egypt · 2024"
              title="The Unmarked Tomb of Saqqara"
              desc="A sealed chamber predating the Third Dynasty, its hieroglyphs unlike any known script — possibly a proto-writing system lost to history."
              onNavigate={handleNavigate}
            />
            <DiscoveryCard
              img={IMAGES.greece}
              label="Greece · 2024"
              title="Submerged Agora of the Aegean"
              desc="Rising sea levels had swallowed this Hellenistic marketplace. Sonar mapping revealed colonnades and bronze market weights still in place."
              onNavigate={handleNavigate}
            />
            <DiscoveryCard
              img={IMAGES.mexico}
              label="Mexico · 2023"
              title="Cenote Burial Complex, Yucatán"
              desc="Fourteen intact offering bundles and a royal sarcophagus found in an underwater cave system, rewriting early Maya succession records."
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="arq-section arq-method">
        <div className="arq-container arq-method-inner">
          <div className="arq-method-img-wrap">
            <img src={IMAGES.dig} alt="Archaeologists at a dig site" className="arq-method-img" />
            <div className="arq-method-badge">
              <span>Ground</span>
              <span>Penetrating</span>
              <span>Radar</span>
            </div>
          </div>
          <div className="arq-method-text">
            <p className="arq-section-label">Our Methodology</p>
            <h2 className="arq-section-title">
              Precision tools, <em>patient hands.</em>
            </h2>
            <p className="arq-body">
              Modern archaeology is a fusion of intuition and instrumentation. We
              deploy LiDAR aerial surveys, ground-penetrating radar, and DNA
              sequencing alongside the trowel, brush, and trained eye.
            </p>
            <ul className="arq-method-list">
              {[
                "Stratigraphic excavation & context recording",
                "Isotopic analysis for origin tracing",
                "Photogrammetric 3-D site modelling",
                "Archival cross-referencing with field finds",
              ].map((item) => (
                <li key={item} className="arq-method-item">
                  <span className="arq-dot" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              className="arq-btn arq-btn--outline"
              onClick={handleNavigate}
            >
              Read Field Protocols
            </button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="arq-section arq-gallery">
        <div className="arq-container">
          <p className="arq-section-label">Artifact Collection</p>
          <h2 className="arq-section-title">
            Objects that outlasted <em>their makers.</em>
          </h2>
          <div className="arq-gallery-grid">
            <div className="arq-gallery-cell arq-gallery-cell--tall" onClick={handleNavigate}>
              <img src={IMAGES.artifact1} alt="Ancient artifact" />
              <div className="arq-gallery-caption">
                <span>Terracotta Votive · 600 BCE</span>
              </div>
            </div>
            <div className="arq-gallery-col">
              <div className="arq-gallery-cell" onClick={handleNavigate}>
                <img src={IMAGES.artifact2} alt="Bronze tool" />
                <div className="arq-gallery-caption">
                  <span>Bronze Axe Head · 1200 BCE</span>
                </div>
              </div>
              <div className="arq-gallery-cell" onClick={handleNavigate}>
                <img src={IMAGES.scroll} alt="Ancient scroll" />
                <div className="arq-gallery-caption">
                  <span>Papyrus Fragment · 280 BCE</span>
                </div>
              </div>
            </div>
            <div className="arq-gallery-cell arq-gallery-cell--tall" onClick={handleNavigate}>
              <img src={IMAGES.ruins1} alt="Ancient ruins" />
              <div className="arq-gallery-caption">
                <span>Limestone Relief · 450 BCE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPEDITION MAP ── */}
      <section className="arq-section arq-expedition">
        <div className="arq-expedition-img">
          <img src={IMAGES.expedition} alt="Expedition landscape" />
          <div className="arq-expedition-overlay" />
        </div>
        <div className="arq-container arq-expedition-content">
          <p className="arq-section-label arq-section-label--light">Active Expeditions</p>
          <h2 className="arq-section-title arq-section-title--light">
            Six continents. <em>One mission.</em>
          </h2>
          <div className="arq-expedition-cards">
            {[
              { region: "North Africa", site: "Siwa Oasis Necropolis", status: "Active" },
              { region: "South Asia", site: "Indus Valley, Sindh Province", status: "Active" },
              { region: "Central America", site: "Petén Basin, Guatemala", status: "Survey" },
              { region: "Eastern Europe", site: "Thracian Plain, Bulgaria", status: "Lab Phase" },
            ].map((e) => (
              <div 
                className="arq-exp-card" 
                key={e.site}
                onClick={handleNavigate}
                style={{ cursor: "pointer" }}
              >
                <span className={`arq-exp-status arq-exp-status--${e.status.toLowerCase().replace(" ", "")}`}>
                  {e.status}
                </span>
                <p className="arq-exp-region">{e.region}</p>
                <p className="arq-exp-site">{e.site}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIELD NOTES ── */}
      <section className="arq-section arq-journal">
        <div className="arq-container">
          <p className="arq-section-label">Field Notes</p>
          <h2 className="arq-section-title">
            From the <em>dig diary.</em>
          </h2>
          <div className="arq-journal-grid">
            {[
              {
                date: "12 Jun 2025",
                tag: "Osteology",
                title: "What a 3,000-year-old femur tells us about migration",
                img: IMAGES.cave,
              },
              {
                date: "28 May 2025",
                tag: "Epigraphy",
                title: "Decoding the merchant tablets of Ugarit",
                img: IMAGES.ruins2,
              },
              {
                date: "04 Apr 2025",
                tag: "Conservation",
                title: "Reversible consolidants: a new approach to fresco repair",
                img: IMAGES.artifact2,
              },
            ].map((note) => (
              <article className="arq-journal-card" key={note.title}>
                <div className="arq-journal-img">
                  <img src={note.img} alt={note.title} />
                </div>
                <div className="arq-journal-body">
                  <div className="arq-journal-meta">
                    <span className="arq-journal-tag">{note.tag}</span>
                    <span className="arq-journal-date">{note.date}</span>
                  </div>
                  <h3 className="arq-journal-title">{note.title}</h3>
                  <a 
                    href="#" 
                    className="arq-journal-link"
                    onClick={handleNavigate}
                  >
                    Read note →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="arq-section arq-cta">
        <div className="arq-cta-bg">
          <img src={IMAGES.team} alt="Field team" />
          <div className="arq-cta-overlay" />
        </div>
        <div className="arq-container arq-cta-content">
          <p className="arq-section-label arq-section-label--light">Join the Work</p>
          <h2 className="arq-cta-title">
            The past needs
            <br />
            <em>your hands.</em>
          </h2>
          <p className="arq-cta-desc">
            Whether you are a seasoned field archaeologist, a data scientist who
            speaks GIS, or simply someone who believes the past deserves a
            careful witness — there is a place for you at Strata.
          </p>
          <div className="arq-cta-actions">
            <button 
              className="arq-btn arq-btn--hero"
              onClick={handleNavigate}
            >
              Apply for the Field
            </button>
            <button 
              className="arq-btn arq-btn--ghost"
              onClick={handleNavigate}
            >
              Support Our Research
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ----- Discovery Card Component -----
function DiscoveryCard({ img, label, title, desc, onNavigate }) {
  return (
    <div className="arq-disc-card">
      <div className="arq-disc-img">
        <img src={img} alt={title} />
        <span className="arq-disc-label">{label}</span>
      </div>
      <div className="arq-disc-body">
        <h3 className="arq-disc-title">{title}</h3>
        <p className="arq-disc-desc">{desc}</p>
        <a 
          href="#" 
          className="arq-disc-link"
          onClick={onNavigate}
        >
          Read full report →
        </a>
      </div>
    </div>
  );
}