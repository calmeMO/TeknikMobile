import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function FloatingPillNavbar({
  isMenuOpen,
  onToggleMenu,
  burgerRef,
  activeBrand = 'all',
  onSelectBrand,
  isHeroReady = false
}) {
  const whatsAppUrl = getWhatsAppUrl();
  const headerRef = useRef(null);
  const [isPill, setIsPill] = useState(false);
  const scrolledRef = useRef(false);

  // Asymmetric Enter/Exit mount state for Apple Fullscreen Menu
  const [isMounted, setIsMounted] = useState(isMenuOpen);
  const [isClosing, setIsClosing] = useState(false);

  // Scroll listener: morphs to floating pill strictly on scroll past threshold
  useEffect(() => {
    const SCROLL_THRESHOLD = 50;

    const handleScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled;
        setIsPill(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Body scroll lock & transition controller
  useEffect(() => {
    let timer;
    if (isMenuOpen) {
      setIsMounted(true);
      setIsClosing(false);
      document.body.classList.add('menu-open');
    } else if (isMounted) {
      setIsClosing(true);
      // Synchronized with CSS closing animation (350ms)
      timer = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
        document.body.classList.remove('menu-open');
      }, 350);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isMenuOpen]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => document.body.classList.remove('menu-open');
  }, []);

  // ESC key listener for instant accessible dismissal
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onToggleMenu();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen, onToggleMenu]);

  // Auto-close when expanding to desktop viewport (> 900px)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = (e) => {
      if (e.matches && isMenuOpen) onToggleMenu();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [isMenuOpen, onToggleMenu]);

  const handleNavClick = (brand, href) => {
    if (brand) onSelectBrand?.(brand);
    if (isMenuOpen) onToggleMenu();
  };

  // Full collection links matching the iconic Apple reference
  const menuItems = [
    { id: 'inicio', label: 'Inicio', brand: 'all', href: '#top' },
    { id: 'samsung', label: 'Samsung', brand: 'samsung', href: '#catalogo' },
    { id: 'apple', label: 'Apple', brand: 'apple', href: '#catalogo' },
    { id: 'pixel', label: 'Pixel', brand: 'pixel', href: '#catalogo' },
    { id: 'accesorios', label: 'Accesorios', brand: 'accesorios', href: '#catalogo' },
    { id: 'catalogo', label: 'Catálogo', brand: 'all', href: '#catalogo' }
  ];

  return (
    <>
      <header
        className={`header${isPill ? ' is-pill' : ''}${isMenuOpen ? ' is-menu-open' : ''}${isHeroReady ? ' is-ready' : ''}`}
        ref={headerRef}
      >
        <div className={`floating-pill-navbar${isPill ? ' is-pill' : ''}${isMenuOpen ? ' is-menu-open' : ''}${isHeroReady ? ' is-ready' : ''}`}>
          {/* ── Main Row ── */}
          <div className="di-main-row">
            {/* Left: Logo */}
            <a
              href="#top"
              className="logo font-samsung-sharp"
              aria-label="Teknik Mobile — Inicio"
              onClick={() => {
                onSelectBrand?.('all');
                if (isMenuOpen) onToggleMenu();
              }}
            >
              <div className="logo-badge" aria-hidden="true">
                <img
                  src="/logo-teknik-icon.png"
                  alt=""
                  className="logo-img"
                  width="28"
                  height="28"
                />
                <div className="logo-sheen" />
              </div>
              <span className="logo-text">
                {siteConfig.brandName} <span className="logo-suffix">{siteConfig.brandSuffix}</span>
              </span>
            </a>

            {/* Center: Desktop Navigation (> 900px) */}
            <nav id="site-nav" aria-label="Navegación principal">
              {siteConfig.categories.map((cat) => {
                const isSelected = cat.brand && cat.brand !== 'all'
                  ? activeBrand === cat.brand
                  : (cat.brand === 'all' && activeBrand === 'all');

                if (cat.enabled) {
                  return (
                    <a
                      key={cat.id}
                      href={cat.href}
                      className={`nav-link font-samsung-bold ${isSelected ? 'active' : ''}`}
                      aria-current={isSelected ? 'page' : undefined}
                      onClick={() => {
                        if (cat.brand) onSelectBrand?.(cat.brand);
                      }}
                    >
                      {cat.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="nav-link nav-link--disabled font-samsung-bold"
                    disabled
                    title={cat.statusNote || 'Disponible próximamente'}
                    aria-disabled="true"
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="header-actions">
              {whatsAppUrl ? (
                <a
                  href={whatsAppUrl}
                  className="header-cta font-samsung-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Consultar por WhatsApp"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="header-cta is-disabled"
                  disabled
                  title="Contacto pendiente de configurar"
                  aria-label="WhatsApp — Contacto pendiente de configurar"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
              )}

              {/* Minimal 2-Line Burger Button */}
              <button
                ref={burgerRef}
                type="button"
                className={`burger-btn ${isMenuOpen ? 'is-open' : ''}`}
                onClick={onToggleMenu}
                aria-controls="apple-fullscreen-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <span className="burger-line" />
                <span className="burger-line" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Apple-Style Fullscreen Menu Overlay ── */}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <div
          id="apple-fullscreen-menu"
          className={`apple-fullscreen-menu ${isClosing ? 'is-closing' : 'is-open'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Left-Aligned Clean Apple Typography Navigation */}
          <nav className="apple-fullscreen-links" aria-label="Navegación principal">
            {menuItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className="apple-fullscreen-link font-samsung-sharp"
                style={{
                  '--i': index,
                  '--rev-i': menuItems.length - 1 - index
                }}
                onClick={() => handleNavClick(item.brand, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Bottom Footer: Apple-Style White-Bordered WhatsApp Action Button */}
          <div className="apple-fullscreen-footer">
            {whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                className="apple-whatsapp-btn font-samsung-bold"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onToggleMenu}
                aria-label="Consultar por WhatsApp"
              >
                <svg className="apple-whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z"/>
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
            ) : (
              <button
                type="button"
                className="apple-whatsapp-btn is-disabled font-samsung-bold"
                disabled
                aria-label="WhatsApp — Contacto pendiente de configurar"
              >
                <svg className="apple-whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z"/>
                </svg>
                <span>WhatsApp</span>
              </button>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
