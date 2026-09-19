import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Page1 } from './pages/Page1/Page1';
import { MenuOverlay } from './components/Page1/MenuOverlay/MenuOverlay';
import { IntroEffect } from './components/IntroEffect/IntroEffect';

const Page2 = lazy(() => import('./pages/Page2/Page2'));
const Page3 = lazy(() => import('./pages/Page3/Page3'));
const Page4 = lazy(() => import('./pages/Page4/Page4'));

export function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#darkroom' || hash === '#page2') {
        return 'page2';
      }
      if (hash === '#exhibits' || hash === '#page3') {
        return 'page3';
      }
      if (hash === '#specsheet' || hash === '#spec-sheet' || hash === '#page4') {
        return 'page4';
      }
    }
    return 'page1';
  });

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (!hash || hash === '#home' || hash === '#page1') {
        return true;
      }
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTriggerRect, setMenuTriggerRect] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#darkroom' || hash === '#page2') {
        setCurrentPage('page2');
      } else if (hash === '#exhibits' || hash === '#page3') {
        setCurrentPage('page3');
      } else if (hash === '#specsheet' || hash === '#spec-sheet' || hash === '#page4') {
        setCurrentPage('page4');
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
    if (pageId === 'page4') {
      setCurrentPage('page4');
      window.location.hash = 'specsheet';
      window.scrollTo(0, 0);
    } else if (pageId === 'page3') {
      setCurrentPage('page3');
      window.location.hash = 'exhibits';
      window.scrollTo(0, 0);
    } else if (pageId === 'page2') {
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
      {showIntro && currentPage === 'page1' && (
        <IntroEffect onComplete={() => setShowIntro(false)} />
      )}

      {currentPage === 'page4' ? (
        <Suspense fallback={null}>
          <Page4 onOpenMenu={handleOpenMenu} />
        </Suspense>
      ) : currentPage === 'page3' ? (
        <Suspense fallback={null}>
          <Page3 onOpenMenu={handleOpenMenu} />
        </Suspense>
      ) : currentPage === 'page2' ? (
        <Suspense fallback={null}>
          <Page2 onOpenMenu={handleOpenMenu} />
        </Suspense>
      ) : (
        <Page1 onOpenMenu={handleOpenMenu} isIntroActive={showIntro} />
      )}

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onSelectPage={handleSelectPage}
        triggerRect={menuTriggerRect}
        currentPage={currentPage}
      />
    </>
  );
}

export default App;
