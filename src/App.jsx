import React, { useState, useRef, useEffect } from 'react';
import FloatingPillNavbar from './components/FloatingPillNavbar';
import HeroCinematic from './components/HeroCinematic';
import BrandCarouselSection from './components/BrandCarouselSection';
import CatalogSection from './components/CatalogSection';
import Footer from './components/Footer';
import CameraComparisonModal from './components/CameraComparisonModal';
// MobileMenuDialog removed — the Dynamic Island pill handles mobile expansion
import { useEntranceMotion } from './hooks/useEntranceMotion';

export default function App() {
  const pageRef = useRef(null);
  const burgerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Hook for native animationend and 2-rAF fallback
  useEntranceMotion(pageRef);

  const [isHeroReady, setIsHeroReady] = useState(false);

  // Emil Kowalski safety fallback: ensure all elements reveal even if video stalls
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroReady = () => {
    setIsHeroReady(true);
  };

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

  const [activeBrand, setActiveBrand] = useState('all');

  const handleSelectBrand = (brand) => {
    setActiveBrand(brand);
  };

  return (
    <>
      {/* Floating Pill Navbar (fixed / sticky floating top) */}
      <FloatingPillNavbar
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
        burgerRef={burgerRef}
        activeBrand={activeBrand}
        onSelectBrand={handleSelectBrand}
        isHeroReady={isHeroReady}
      />

      <div className="page" ref={pageRef} style={{ display: 'block', minHeight: '100vh', background: '#000000' }}>
        {/* Decorative grain */}
        <div className="grain" aria-hidden="true" />

        {/* 1. Cinematic Hero with Responsive WebM Videos & Samsung Typography */}
        <HeroCinematic onVideoReady={handleHeroReady} />

        {/* 2. Explora por Categoría (Carrusel estilo Apple Family en Dark Mode con pastilla amarilla) */}
        <BrandCarouselSection onSelectBrand={handleSelectBrand} />

        {/* 3. Catalog Section with Cinematic Cards & RD$ Pricing */}
        <CatalogSection
          selectedBrand={activeBrand}
          onBrandChange={handleSelectBrand}
        />

        {/* 4. Footer */}
        <Footer />
      </div>

      {/* Interactive Camera Comparison Modal */}
      <CameraComparisonModal
        isOpen={isCameraModalOpen}
        onClose={handleCloseCameras}
      />

      {/* Mobile menu is now built into the Dynamic Island pill navbar */}
    </>
  );
}
