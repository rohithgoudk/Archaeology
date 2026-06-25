import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-root">
      <div className="notfound-overlay">
        <div className="notfound-content">
          <div className="notfound-artifact-icon">🏺</div>
          <h1 className="notfound-title">
            <span>4</span>
            <span className="notfound-zero">0</span>
            <span>4</span>
          </h1>
          <p className="notfound-subtitle">This excavation site has been lost to time</p>
          <p className="notfound-description">
            The page you're looking for has been buried beneath centuries of digital sediment.
            Perhaps it was never discovered, or perhaps it's waiting to be found again.
          </p>

          <div className="notfound-actions">
            <button
              className="notfound-btn notfound-btn-primary"
              onClick={() => navigate("/")}
            >
              <span className="notfound-btn-icon">⛏️</span>
              Return to Home
            </button>
            <button
              className="notfound-btn notfound-btn-secondary"
              onClick={() => navigate(-1)}
            >
              <span className="notfound-btn-icon">←</span>
              Go Back
            </button>
          </div>

          <div className="notfound-hints">
            <span>🔍</span>
            <p>Lost? Try searching our artifact database or return to the excavation site.</p>
          </div>

          <div className="notfound-dig-sites">
            <span className="notfound-sites-label">Active Dig Sites:</span>
            <div className="notfound-sites-dots">
              <span className="notfound-site-dot"></span>
              <span className="notfound-site-dot"></span>
              <span className="notfound-site-dot"></span>
              <span className="notfound-site-dot"></span>
              <span className="notfound-site-dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}