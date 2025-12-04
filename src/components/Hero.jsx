import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`hero ${isLoaded ? 'loaded' : ''}`} id="home">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${15 + Math.random() * 20}s`,
                '--delay': `${Math.random() * 5}s`,
                '--size': `${5 + Math.random() * 15}px`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="text-reveal">
            <h1 className="hero-title">
              <span className="title-line">
                <span className="title-word">shine</span>
                <span className="title-word">on</span>
              </span>
            </h1>
          </div>
          <p className="hero-subtitle">
            <span className="subtitle-line">beauty that reflects your spirit</span>
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary">
              <span className="btn-text">Shop Now</span>
              <span className="btn-icon">→</span>
            </button>
            <button className="btn btn-secondary">
              <span className="btn-text">Discover More</span>
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-circle hero-circle-1"></div>
            <div className="hero-circle hero-circle-2"></div>
            <div className="hero-circle hero-circle-3"></div>
            <div className="product-float">
              <div className="product-card-hero">
                <div className="product-glow"></div>
                <div className="product-image-placeholder">
                  <span className="product-brand">onsko</span>
                  <span className="product-type">glow serum</span>
                </div>
              </div>
            </div>
            <div className="model-silhouette model-1"></div>
            <div className="model-silhouette model-2"></div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>scroll</span>
        <div className="scroll-line"></div>
      </div>

      <div className="hero-marquee">
        <div className="marquee-content">
          <span>✦ Clean Beauty</span>
          <span>✦ Cruelty Free</span>
          <span>✦ Sustainable</span>
          <span>✦ Natural Ingredients</span>
          <span>✦ Clean Beauty</span>
          <span>✦ Cruelty Free</span>
          <span>✦ Sustainable</span>
          <span>✦ Natural Ingredients</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
