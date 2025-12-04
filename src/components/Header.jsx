import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✿</span>
          <span className="logo-text">onsko</span>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link active">home</a>
            </li>
            <li className="nav-item">
              <a href="#shop" className="nav-link">shop</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">about</a>
            </li>
            <li className="nav-item">
              <a href="#blog" className="nav-link">blog</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="user-name" style={{ 
                fontSize: '0.9rem', 
                color: 'var(--color-text)',
                marginRight: '0.5rem'
              }}>
                {user?.name}
              </span>
              <button 
                className="action-link" 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="action-link">log in</Link>
          )}
          <button className="action-btn wishlist-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="wishlist-count">0</span>
          </button>
          <button 
            className={`action-btn search-btn ${isSearchOpen ? 'active' : ''}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <span>Search</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              autoFocus
            />
            <button className="search-close" onClick={() => setIsSearchOpen(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
