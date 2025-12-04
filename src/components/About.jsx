import { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && counter < 100) {
      const timer = setTimeout(() => {
        setCounter(prev => Math.min(prev + 2, 100));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isVisible, counter]);

  const features = [
    { icon: '✨', title: 'Clean Beauty', desc: 'No harmful chemicals, ever' },
    { icon: '🌍', title: 'Eco-Friendly', desc: 'Sustainable packaging' },
    { icon: '🐰', title: 'Cruelty-Free', desc: 'Never tested on animals' }
  ];

  return (
    <section className={`about ${isVisible ? 'visible' : ''}`} id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-visual">
          <div className="about-image-wrapper">
            <div className="about-image">
              <div className="image-placeholder">
                <div className="leaf leaf-1">🌿</div>
                <div className="leaf leaf-2">🍃</div>
                <div className="leaf leaf-3">🌱</div>
              </div>
              <div className="image-overlay"></div>
            </div>
            <div className="about-accent-box"></div>
            <div className="about-accent-circle"></div>
          </div>
          <div className="floating-badge">
            <span className="badge-number">{counter}%</span>
            <span className="badge-text">Natural</span>
            <div className="badge-ring"></div>
          </div>
        </div>

        <div className="about-content">
          <span className="section-label">our story</span>
          <h2 className="about-title">
            <span className="title-line">beauty with</span>
            <span className="title-line title-accent">purpose</span>
          </h2>
          <div className="about-text-container">
            <p className="about-text">
              At Onsko, we believe that true beauty comes from within. Our products 
              are crafted with the finest natural ingredients, designed to enhance 
              your natural glow while caring for our planet.
            </p>
            <p className="about-text">
              Every formula is cruelty-free, sustainably sourced, and created with 
              love in small batches to ensure the highest quality for your skin.
            </p>
          </div>

          <div className="about-features">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="feature"
                style={{ '--delay': `${index * 150 + 400}ms` }}
              >
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                  <div className="feature-icon-bg"></div>
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#about" className="about-cta">
            <span>Learn More About Us</span>
            <div className="cta-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>

      <div className="about-bg-text">NATURAL</div>
    </section>
  );
};

export default About;
