import React from 'react';

export const MenuDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="modal-tag">NAVIGATION</div>
          <h2 className="modal-title" style={{ fontSize: '2rem' }}>INDEX & WORKS</h2>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '2rem 0' }}>
            {['01. EXPERT DIGITAL PRODUCTION', '02. 3D HELICAL GALLERY', '03. RECENT CAMPAIGNS', '04. ABOUT DIALECT', '05. CONTACT LAB'].map((link, idx) => (
              <a 
                key={idx}
                href="#"
                onClick={(e) => { e.preventDefault(); onClose(); }}
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: '0.12em',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#e6ff00'}
                onMouseLeave={(e) => e.target.style.color = '#fff'}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <button className="btn-close-modal" onClick={onClose}>
          [ CLOSE MENU ]
        </button>
      </div>
    </div>
  );
};
