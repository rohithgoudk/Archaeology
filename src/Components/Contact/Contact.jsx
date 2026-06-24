// Contact.jsx
import React, { useState } from "react";
import "./Contact.css";
import img from "../../assets/contact.webp";
import { useNavigate, Link } from "react-router-dom";

const IMAGES = {
  team: img,
};

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  // Validate name - only alphabets and spaces
  const validateName = (value) => {
    const alphabetsOnly = /^[A-Za-z\s]*$/;
    if (!value.trim()) {
      return "Name is required";
    }
    if (!alphabetsOnly.test(value)) {
      return "Name must contain only alphabets";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  // Validate email - only Gmail
  const validateEmail = (value) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!value) {
      return "Email is required";
    }
    if (!gmailRegex.test(value)) {
      return "Only @gmail.com addresses are allowed";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For name field, filter out non-alphabetic characters
    let newValue = value;
    if (name === "name") {
      newValue = value.replace(/[^A-Za-z\s]/g, '');
    }
    
    setFormData({ ...formData, [name]: newValue });

    // Real-time validation
    if (name === "name") {
      const error = validateName(newValue);
      setErrors(prev => ({ ...prev, name: error }));
    }
    if (name === "email") {
      const error = validateEmail(newValue);
      setErrors(prev => ({ ...prev, email: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    
    setErrors({
      name: nameError,
      email: emailError,
    });

    // Check if there are any errors
    const hasErrors = nameError !== "" || emailError !== "";
    
    if (!hasErrors && formData.name && formData.email && formData.subject && formData.message) {
      // Navigate to 404 after successful submission
      navigate("/404");
    }
  };

  return (
    <div className="contact-root">
      {/* Hero with Particle-like Effect */}
      <section className="contact-hero">
        <div className="contact-hero-bg" style={{ backgroundImage: `url(${IMAGES.team})` }} />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-particles">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
        <div className="contact-hero-content">
          <span className="contact-badge">📬 Get in Touch</span>
          <h1 className="contact-title">
            Connect with <span>Us</span>
          </h1>
          <p className="contact-subtitle">Have questions? Want to join an expedition? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Form with Glassmorphism */}
            <div className="contact-form-wrap">
              <div className="contact-form-header">
                <h2>Send a <span>Message</span></h2>
                <p>We'll respond within 24 hours</p>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-group">
                  <label htmlFor="name">
                    <span className="contact-label-icon">👤</span> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name (alphabets only)"
                    className={errors.name ? "contact-input-error" : ""}
                  />
                  {errors.name && <span className="contact-error">{errors.name}</span>}
                  <span className="contact-hint">Only alphabets are allowed</span>
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email">
                    <span className="contact-label-icon">✉️</span> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="yourname@gmail.com"
                    className={errors.email ? "contact-input-error" : ""}
                  />
                  {errors.email && <span className="contact-error">{errors.email}</span>}
                  <span className="contact-hint">Only @gmail.com addresses are accepted</span>
                </div>
                <div className="contact-form-group">
                  <label htmlFor="subject">
                    <span className="contact-label-icon">📌</span> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="message">
                    <span className="contact-label-icon">💬</span> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
                    rows="5"
                  />
                  <div className="contact-character-count">{formData.message.length}/500</div>
                </div>
                <button type="submit" className="contact-submit-btn">
                  Send Message
                  <span className="contact-btn-arrow">→</span>
                </button>
              </form>
            </div>

            {/* Contact Info with Hover Cards */}
            <div className="contact-info">
              <h3>Connect <span>With Us</span></h3>
              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon">📍</div>
                  <div className="contact-info-content">
                    <h4>Visit Us</h4>
                    <p>Madhapur</p>
                    <p>Hyderabad, India</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon">📞</div>
                  <div className="contact-info-content">
                    <h4>Call Us</h4>
                    <p>+91 9878965412</p>
                    <p>Mon–Fri, 9am–6pm GMT</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon">✉️</div>
                  <div className="contact-info-content">
                    <h4>Email Us</h4>
                    <p>stackly@archaeology.org</p>
                    <p>stackly@research-archaeology.org</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="contact-social">
                <h4>Follow Our Work</h4>
                <div className="contact-social-links">
                  <Link to="/404" className="contact-social-link">
                    <span className="contact-social-icon">🐦</span> Twitter
                  </Link>
                  <Link to="/404" className="contact-social-link">
                    <span className="contact-social-icon">📸</span> Instagram
                  </Link>
                  <Link to="/404" className="contact-social-link">
                    <span className="contact-social-icon">▶️</span> YouTube
                  </Link>
                  <Link to="/404" className="contact-social-link">
                    <span className="contact-social-icon">🔗</span> LinkedIn
                  </Link>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-map" onClick={() => navigate("/404")}>
                <div className="contact-map-placeholder">
                  <span>🗺️</span>
                  <p>Find us in London</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}