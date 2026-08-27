import React, { useState, useEffect, useCallback } from 'react';
import { Page1 } from './pages/Page1/Page1';
import { Page2 } from './pages/Page2/Page2';
import { MenuOverlay } from './components/Page1/MenuOverlay/MenuOverlay';

export function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#darkroom' || hash === '#page2') {
        return 'page2';
      }
    }
    return 'page1';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTriggerRect, setMenuTriggerRect] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#darkroom' || hash === '#page2') {
        setCurrentPage('page2');
      } else {
        setCurrentPage('page1');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenMenu = useCallback((rect) => {
    setMenuTriggerRect(rect);
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleSelectPage = useCallback((pageId) => {
    if (pageId === 'page2') {
      setCurrentPage('page2');
      window.location.hash = 'darkroom';
      window.scrollTo(0, 0);
    } else if (pageId === 'page1') {
      setCurrentPage('page1');
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {currentPage === 'page2' ? (
        <Page2 onOpenMenu={handleOpenMenu} />
      ) : (
        <Page1 onOpenMenu={handleOpenMenu} />
      )}

      {/* Global Persistent MenuOverlay for Symmetrical Morphing */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onSelectPage={handleSelectPage}
        triggerRect={menuTriggerRect}
      />
    </>
  );
}

export default App;
