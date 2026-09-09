import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function MobileMenuDialog({ isOpen, onClose, openerRef }) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);
  const whatsAppUrl = getWhatsAppUrl();

  // Smooth curtain open / close lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      document.body.classList.add('menu-open');
    } else if (isMounted) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
        document.body.classList.remove('menu-open');
      }, 360);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close when window resizes to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px)');
    const handleMediaChange = (e) => {
      if (e.matches && isOpen) {
        onClose();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, [isOpen, onClose]);

  // Restore focus to opener button when closing
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
      if (openerRef?.current && typeof openerRef.current.focus === 'function') {
        openerRef.current.focus();
      }
    };
  }, [openerRef]);

  if (!isMounted && !isOpen) return null;
  if (typeof document === 'undefined') return null;

  const stateClass = isClosing ? 'is-closing' : 'is-open';

  return createPortal(
    <div
      ref={menuRef}
      id="mobile-menu"
      className={`mobile-menu-curtain ${stateClass}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
    >
      {/* Background backdrop blur */}
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Main sliding curtain panel */}
      <div className="mobile-menu-panel">
        {/* Header: Brand and Close (X) icon */}
        <div className="apple-menu-header">
          <a href="#top" className="logo font-samsung-sharp" onClick={onClose}>
            <svg
              className="logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="6" y="2" width="12" height="20" rx="3" />
              <path d="M10 5h4M11 19h2" />
            </svg>
            <span>
              {siteConfig.brandName} <span className="logo-suffix">{siteConfig.brandSuffix}</span>
            </span>
          </a>

          <button
            type="button"
            className="apple-close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Apple-style typography navigation: links top, action button bottom */}
        <nav className="apple-menu-nav" aria-label="Navegación móvil">
          <div className="apple-menu-links">
            {siteConfig.categories.map((item, index) => {
              return (
                <a
                  key={item.id}
                  href={item.href || '#top'}
                  className="apple-nav-item font-samsung-bold"
                  style={{ '--i': index }}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={onClose}
                >
                  <span className="apple-nav-label">{item.label}</span>
                  <span className="apple-nav-arrow" aria-hidden="true">→</span>
                </a>
              );
            })}
          </div>

          {/* Bottom Area: Action Button strictly at the bottom */}
          <div className="apple-menu-bottom" style={{ '--i': siteConfig.categories.length }}>
            <div className="apple-menu-divider" />

            {whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                className="btn btn-solid apple-whatsapp-btn font-samsung-bold"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
            ) : (
              <a
                href="#top"
                className="btn btn-solid apple-whatsapp-btn"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
            )}

            <div className="apple-menu-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>República Dominicana • Envíos a todo el país</span>
            </div>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
}
