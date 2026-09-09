import React from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function FloatingPillNavbar({ isMenuOpen, onToggleMenu, burgerRef }) {
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <header className="header">
      <div className="floating-pill-navbar">
        {/* Left: Logo */}
        <a
          href="#top"
          className="logo font-samsung-sharp appear appear--scale"
          style={{ '--d': '0.08s' }}
          aria-label="Teknik Mobile — Inicio"
        >
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

        {/* Center: Desktop Navigation */}
        <nav id="site-nav" aria-label="Navegación principal">
          {siteConfig.categories.map((cat) => {
            const appearClass = `appear ${cat.appearClass || 'appear--scale'}`;
            if (cat.enabled) {
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  className={`nav-link font-samsung-bold ${appearClass}`}
                  style={{ '--d': cat.delay }}
                  aria-current={cat.active ? 'page' : undefined}
                >
                  {cat.label}
                </a>
              );
            }
            return (
              <button
                key={cat.id}
                type="button"
                className={`nav-link nav-link--disabled font-samsung-bold ${appearClass}`}
                style={{ '--d': cat.delay }}
                disabled
                title={cat.statusNote || 'Disponible próximamente'}
                aria-disabled="true"
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Header Actions (CTA + Mobile Burger) */}
        <div className="header-actions">
          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              className="btn btn-solid header-cta font-samsung-bold appear appear--scale"
              style={{ '--d': '0.34s' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-solid header-cta appear appear--scale is-disabled"
              style={{ '--d': '0.34s' }}
              disabled
              title="Contacto pendiente de configurar"
              aria-label="WhatsApp — Contacto pendiente de configurar"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WhatsApp</span>
            </button>
          )}

          {/* Mobile Burger Button */}
          <button
            ref={burgerRef}
            type="button"
            className="burger-btn appear appear--scale"
            style={{ '--d': '0.34s' }}
            onClick={onToggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
