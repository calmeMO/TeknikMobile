import React, { useState, useRef } from 'react';
import FloatingPillNavbar from './components/FloatingPillNavbar';
import HeroCinematic from './components/HeroCinematic';
import HighlightsSection from './components/HighlightsSection';
import CatalogSection from './components/CatalogSection';
import Footer from './components/Footer';
import CameraComparisonModal from './components/CameraComparisonModal';
import MobileMenuDialog from './components/MobileMenuDialog';
import { useEntranceMotion } from './hooks/useEntranceMotion';

export default function App() {
  const pageRef = useRef(null);
  const burgerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Hook for native animationend and 2-rAF fallback
  useEntranceMotion(pageRef);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    // Restore focus to burger button if still visible
    if (burgerRef.current && typeof burgerRef.current.focus === 'function') {
      burgerRef.current.focus();
    }
  };

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      handleCloseMenu();
    } else {
      handleOpenMenu();
    }
  };

  const handleOpenCameras = () => {
    setIsCameraModalOpen(true);
  };

  const handleCloseCameras = () => {
    setIsCameraModalOpen(false);
  };

  return (
    <>
      <div className="page" ref={pageRef} style={{ display: 'block', minHeight: '100vh', background: '#000000' }}>
        {/* Decorative grain */}
        <div className="grain" aria-hidden="true" />

        {/* Floating Pill Navbar (fixed / sticky floating top) */}
        <FloatingPillNavbar
          isMenuOpen={isMenuOpen}
          onToggleMenu={handleToggleMenu}
          burgerRef={burgerRef}
        />

        {/* 1. Cinematic Hero with Responsive WebM Videos & Samsung Typography */}
        <HeroCinematic />

        {/* 2. Highlights Section ("Mira lo más destacado") */}
        <HighlightsSection onOpenCamerasModal={handleOpenCameras} />

        {/* 3. Catalog Section with Cinematic Cards & RD$ Pricing */}
        <CatalogSection />

        {/* 4. Footer */}
        <Footer />
      </div>

      {/* Interactive Camera Comparison Modal */}
      <CameraComparisonModal
        isOpen={isCameraModalOpen}
        onClose={handleCloseCameras}
      />

      {/* Mobile Menu Dialog Drawer */}
      <MobileMenuDialog
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        openerRef={burgerRef}
      />
    </>
  );
}
