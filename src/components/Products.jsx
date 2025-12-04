import { useEffect, useRef, useState } from 'react';
import './Products.css';

const products = [
  {
    id: 1,
    name: 'Glow Serum',
    category: 'Face Care',
    price: 48,
    color: '#8BC34A',
    description: 'Vitamin C infused brightening serum'
  },
  {
    id: 2,
    name: 'Hydra Cream',
    category: 'Moisturizer',
    price: 52,
    color: '#F4A460',
    description: 'Deep hydration for all skin types'
  },
  {
    id: 3,
    name: 'Rose Toner',
    category: 'Toner',
    price: 38,
    color: '#DDA0DD',
    description: 'Balancing rose water formula'
  },
  {
    id: 4,
    name: 'Sun Shield',
    category: 'SPF Protection',
    price: 42,
    color: '#87CEEB',
    description: 'Lightweight SPF 50+ protection'
  }
];

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
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

  return (
    <section className={`products ${isVisible ? 'visible' : ''}`} id="shop" ref={sectionRef}>
      <div className="products-container">
        <div className="section-header">
          <span className="section-label">our collection</span>
          <h2 className="section-title">
            <span className="title-reveal">bestsellers</span>
          </h2>
          <p className="section-subtitle">
            Carefully crafted formulas that celebrate your natural beauty
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <article 
              key={product.id} 
              className={`product-card ${isVisible ? 'animate' : ''}`}
              style={{ '--delay': `${index * 150}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className="product-image"
                style={{ background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}dd 100%)` }}
              >
                <div className="product-image-bg"></div>
                <div className={`product-bottle ${hoveredId === product.id ? 'hovered' : ''}`}>
                  <span className="bottle-brand">onsko</span>
                </div>
                <button className="quick-add">
                  <span className="quick-add-icon">+</span>
                  <span className="quick-add-text">Quick Add</span>
                </button>
                <div className="product-badge">New</div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button className="add-to-cart">
                    <span>Add to Cart</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="products-cta">
          <a href="#shop" className="view-all-btn">
            <span>View All Products</span>
            <div className="btn-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
