// NotFound.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for 3D-like effect
    const particles = [];
    const numParticles = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 200;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `hsl(${35 + Math.random() * 20}, ${50 + Math.random() * 30}%, ${60 + Math.random() * 30}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        // 3D perspective effect
        const perspective = 200 / (200 + this.z);
        const size = this.size * perspective;
        const opacity = this.opacity * perspective;

        // Wrap around
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.z < -100) this.z = 200;
        if (this.z > 200) this.z = -100;

        return { x: this.x, y: this.y, size, opacity };
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    // Artifact fragments
    const fragments = [];
    const numFragments = 8;

    class Fragment {
      constructor() {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 300;
        this.y = canvas.height / 2 + (Math.random() - 0.5) * 200;
        this.size = Math.random() * 15 + 8;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = (Math.random() - 0.5) * 0.02;
        this.driftX = (Math.random() - 0.5) * 0.3;
        this.driftY = (Math.random() - 0.5) * 0.3;
        this.shape = Math.floor(Math.random() * 3); // 0: rectangle, 1: triangle, 2: circle
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = `hsl(${30 + Math.random() * 20}, ${60 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`;
      }

      update() {
        this.rotation += this.speed;
        this.x += this.driftX;
        this.y += this.driftY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.driftX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.driftY *= -1;

        const alpha = 0.3 + Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        return { 
          x: this.x, 
          y: this.y, 
          size: this.size, 
          rotation: this.rotation,
          shape: this.shape,
          opacity: this.opacity * alpha,
          color: this.color
        };
      }
    }

    for (let i = 0; i < numFragments; i++) {
      fragments.push(new Fragment());
    }

    // Glow particles
    const glowParticles = [];
    for (let i = 0; i < 30; i++) {
      glowParticles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 400,
        y: canvas.height / 2 + (Math.random() - 0.5) * 300,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        life: Math.random() * 100 + 50,
        maxLife: 150,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3D particle field
      particles.forEach((particle) => {
        const { x, y, size, opacity } = particle.update();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${opacity * 0.6})`;
        ctx.fill();
        ctx.shadowColor = `rgba(212, 165, 116, ${opacity * 0.3})`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw glowing dust
      glowParticles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        if (p.life <= 0) {
          p.x = canvas.width / 2 + (Math.random() - 0.5) * 400;
          p.y = canvas.height / 2 + (Math.random() - 0.5) * 300;
          p.life = p.maxLife;
        }
        const alpha = p.life / p.maxLife;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(212, 165, 116, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(212, 165, 116, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating artifact fragments
      fragments.forEach((fragment) => {
        const { x, y, size, rotation, shape, opacity, color } = fragment.update();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity * 0.7;
        ctx.shadowColor = `rgba(212, 165, 116, 0.2)`;
        ctx.shadowBlur = 20;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        if (shape === 0) {
          // Rectangle fragment
          ctx.strokeRect(-size/2, -size/3, size, size * 0.6);
          // Inner detail
          ctx.beginPath();
          ctx.moveTo(-size/4, 0);
          ctx.lineTo(size/4, 0);
          ctx.stroke();
        } else if (shape === 1) {
          // Triangle fragment
          ctx.beginPath();
          ctx.moveTo(0, -size/2);
          ctx.lineTo(-size/2, size/2);
          ctx.lineTo(size/2, size/2);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Circle fragment with detail
          ctx.beginPath();
          ctx.arc(0, 0, size/2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, size/4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.restore();
      });

      // Draw central 3D Artifact (rotating)
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 20;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotating glow ring
      const ringRadius = 120 + Math.sin(time * 0.5) * 15;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 165, 116, ${0.1 + Math.sin(time * 0.7) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 15]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Second ring
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 165, 116, ${0.05 + Math.sin(time * 0.5 + 1) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Main artifact - 3D rotating urn/vase shape
      ctx.rotate(time * 0.15);
      
      // Shadow/glow under artifact
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
      glowGradient.addColorStop(0, 'rgba(212, 165, 116, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(212, 165, 116, 0.05)');
      glowGradient.addColorStop(1, 'rgba(212, 165, 116, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.fill();

      // Artifact body - 3D effect with multiple layers
      const scale = 1 + Math.sin(time * 0.3) * 0.03;
      
      // Outer glow
      ctx.shadowColor = 'rgba(212, 165, 116, 0.3)';
      ctx.shadowBlur = 40;

      // Main vase shape
      ctx.beginPath();
      ctx.moveTo(0, -55 * scale);
      ctx.quadraticCurveTo(40 * scale, -50 * scale, 45 * scale, -20 * scale);
      ctx.quadraticCurveTo(50 * scale, 10 * scale, 40 * scale, 35 * scale);
      ctx.quadraticCurveTo(25 * scale, 50 * scale, 0, 55 * scale);
      ctx.quadraticCurveTo(-25 * scale, 50 * scale, -40 * scale, 35 * scale);
      ctx.quadraticCurveTo(-50 * scale, 10 * scale, -45 * scale, -20 * scale);
      ctx.quadraticCurveTo(-40 * scale, -50 * scale, 0, -55 * scale);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(-50, -55, 50, 55);
      gradient.addColorStop(0, '#D4A574');
      gradient.addColorStop(0.2, '#C49A6C');
      gradient.addColorStop(0.5, '#B8860B');
      gradient.addColorStop(0.7, '#8B6F4A');
      gradient.addColorStop(1, '#6B4F2A');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Artifact details - hieroglyphic-like patterns
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(212, 165, 116, 0.4)';
      ctx.lineWidth = 1.5;

      // Top band
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 28 * Math.cos(angle) * scale;
        const y1 = 28 * Math.sin(angle) * scale - 10 * scale;
        ctx.beginPath();
        ctx.arc(x1, y1, 3 * scale, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Middle band - symbols
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.05;
        const x1 = 35 * Math.cos(angle) * scale;
        const y1 = 20 * Math.sin(angle) * scale;
        ctx.beginPath();
        ctx.moveTo(x1 - 5 * scale, y1 - 5 * scale);
        ctx.lineTo(x1 + 5 * scale, y1 + 5 * scale);
        ctx.moveTo(x1 + 5 * scale, y1 - 5 * scale);
        ctx.lineTo(x1 - 5 * scale, y1 + 5 * scale);
        ctx.stroke();
      }

      // Bottom band
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + 0.3;
        const x1 = 30 * Math.cos(angle) * scale;
        const y1 = 30 * Math.sin(angle) * scale + 20 * scale;
        ctx.beginPath();
        ctx.arc(x1, y1, 2 * scale, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Handle on the right
      ctx.beginPath();
      ctx.moveTo(42 * scale, -10 * scale);
      ctx.quadraticCurveTo(60 * scale, -5 * scale, 42 * scale, 15 * scale);
      ctx.stroke();

      // Handle on the left
      ctx.beginPath();
      ctx.moveTo(-42 * scale, -10 * scale);
      ctx.quadraticCurveTo(-60 * scale, -5 * scale, -42 * scale, 15 * scale);
      ctx.stroke();

      // Small dots around artifact
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time * 0.1;
        const dotRadius = 55 * scale;
        const dx = dotRadius * Math.cos(angle);
        const dy = dotRadius * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${0.3 + Math.sin(time + i) * 0.1})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();

      // Draw 404 text with 3D effect
      ctx.save();
      const textX = canvas.width / 2;
      const textY = canvas.height / 2 + 130;

      // Text shadow
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      // Main 404 text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const gradientText = ctx.createLinearGradient(textX - 100, textY - 30, textX + 100, textY + 30);
      gradientText.addColorStop(0, '#D4A574');
      gradientText.addColorStop(0.5, '#F5F0E8');
      gradientText.addColorStop(1, '#B8860B');
      
      ctx.font = 'bold 80px "Instrument Serif", Georgia, serif';
      ctx.fillStyle = gradientText;
      ctx.shadowColor = 'rgba(212, 165, 116, 0.3)';
      ctx.shadowBlur = 40;
      ctx.fillText('404', textX, textY);
      
      ctx.shadowBlur = 0;

      // Subtitle
      ctx.font = '18px "Inter", system-ui, sans-serif';
      ctx.fillStyle = 'rgba(245, 240, 232, 0.6)';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 10;
      ctx.fillText('Artifact Not Found', textX, textY + 50);
      ctx.shadowBlur = 0;

      ctx.restore();

      // Draw connecting lines between particles (for 3D depth effect)
      ctx.save();
      const particlesArray = particles.map(p => p.update());
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.strokeStyle = `rgba(212, 165, 116, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="notfound-root">
      <canvas ref={canvasRef} className="notfound-canvas" />

      {/* Overlay content */}
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