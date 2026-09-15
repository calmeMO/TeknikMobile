import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function MobileMenuDialog({ isOpen, onClose, openerRef, activeBrand = 'all', onSelectBrand }) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);
  const whatsAppUrl = getWhatsAppUrl();

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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = (e) => { if (e.matches && isOpen) onClose(); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
      if (openerRef?.current?.focus) openerRef.current.focus();
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
      aria-label="Menu de navegacion movil"
    >
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="mobile-menu-panel">
        <nav className="apple-menu-nav" aria-label="Navegación móvil">
          <div className="apple-menu-links">
            {siteConfig.categories.map((item, index) => {
              const isSelected = item.brand && item.brand !== 'all' ? activeBrand === item.brand : false;
              return (
                <a
                  key={item.id}
                  href={item.href || '#top'}
                  className={`apple-nav-item font-samsung-bold ${isSelected ? 'active' : ''}`}
                  style={{ '--i': index }}
                  aria-current={isSelected ? 'page' : undefined}
                  onClick={() => {
                    if (item.brand) onSelectBrand?.(item.brand);
                    onClose();
                  }}
                >
                  <span className="apple-nav-label">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="apple-menu-bottom" style={{ '--i': siteConfig.categories.length }}>
            <div className="apple-menu-divider" />
            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                className="btn btn-solid apple-whatsapp-btn font-samsung-bold"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </a>
            )}
            <div className="apple-menu-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Republica Dominicana - Envios a todo el pais</span>
            </div>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
}