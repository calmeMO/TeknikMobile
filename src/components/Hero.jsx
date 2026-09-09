import React from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function Hero() {
  const whatsAppUrl = getWhatsAppUrl();
  const catalogUrl = siteConfig.catalogUrl;

  return (
    <main className="hero" id="top">
      <div className="hero-copy">
        {/* Badge */}
        <div className="badge appear appear--pop" style={{ '--d': '0.22s' }}>
          <span className="badge-star" aria-hidden="true">
            <svg
              width="18"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
          </span>
          <span>Tu tienda de celulares en RD</span>
        </div>

        {/* H1 with two masked lines */}
        <h1>
          <span className="headline-line">
            <span className="headline-inner appear appear--mask" style={{ '--d': '0.42s' }}>
              Tu <em>próximo celular</em>.
            </span>
          </span>
          <span className="headline-line">
            <span className="headline-inner appear appear--mask" style={{ '--d': '0.62s' }}>
              está en Teknik Mobile.
            </span>
          </span>
        </h1>

        {/* Lede */}
        <p className="lede appear appear--soft" style={{ '--d': '0.82s' }}>
          Encuentra el celular que va contigo. Conoce nuestras opciones y consulta disponibilidad en Teknik Mobile.
        </p>

        {/* Hero Actions */}
        <div className="hero-actions">
          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              className="btn btn-solid appear appear--btn"
              style={{ '--d': '0.96s' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-solid appear appear--btn is-disabled"
              style={{ '--d': '0.96s' }}
              disabled
              title="Contacto pendiente de configurar"
              aria-label="Consultar por WhatsApp — Contacto pendiente de configurar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Consultar por WhatsApp</span>
            </button>
          )}

          {catalogUrl ? (
            <a
              href={catalogUrl}
              className="btn btn-ghost appear appear--side"
              style={{ '--d': '1.10s' }}
            >
              <span>Ver catálogo</span>
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-ghost appear appear--side is-disabled"
              style={{ '--d': '1.10s' }}
              disabled
              title="Catálogo disponible próximamente"
              aria-label="Ver catálogo — Disponible próximamente"
            >
              <span>Ver catálogo</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
