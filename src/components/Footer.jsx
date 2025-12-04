import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">✿</span>
              <span className="logo-text">onsko</span>
            </div>
            <p className="footer-tagline">
              Beauty that reflects your spirit. Sustainable, cruelty-free skincare for the conscious consumer.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 11.5c0-2.5 2-4.5 4-4.5s4 2 4 4.5c0 2.5-1.5 5-4 5"/>
                  <path d="M12 17v4"/>
                  <path d="M10 21l2-4"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><a href="#">Face Care</a></li>
                <li><a href="#">Body Care</a></li>
                <li><a href="#">Hair Care</a></li>
                <li><a href="#">Gift Sets</a></li>
                <li><a href="#">New Arrivals</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About</h4>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Ingredients</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Help</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Track Order</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe for exclusive offers, skincare tips, and new product launches.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © 2024 Onsko Beauty. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

