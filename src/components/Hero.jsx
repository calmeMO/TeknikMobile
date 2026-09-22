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
              Tu próximo dispositivo
            </span>
          </span>
          <span className="headline-line">
            <span className="headline-inner appear appear--mask" style={{ '--d': '0.62s' }}>
              está aquí.
            </span>
          </span>
        </h1>

        {/* Lede */}
        <p className="lede appear appear--soft" style={{ '--d': '0.82s' }}>
          Descubre Samsung, Apple, Google Pixel, Smartwatches y teléfonos Calidad A+.
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1.5C3.86 1.5 0.5 4.52 0.5 8.25c0 2.22 1.2 4.17 3.06 5.38-.15.8-.57 2-.62 2.18-.08.28.16.55.45.49.88-.18 2.25-.56 3.19-1.35.45.09.92.14 1.42.14 4.14 0 7.5-3.02 7.5-6.75S12.14 1.5 8 1.5Z" />
              </svg>
              <span>Contacto</span>
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-solid appear appear--btn is-disabled"
              style={{ '--d': '0.96s' }}
              disabled
              title="Contacto pendiente de configurar"
              aria-label="Contacto — pendiente de configurar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1.5C3.86 1.5 0.5 4.52 0.5 8.25c0 2.22 1.2 4.17 3.06 5.38-.15.8-.57 2-.62 2.18-.08.28.16.55.45.49.88-.18 2.25-.56 3.19-1.35.45.09.92.14 1.42.14 4.14 0 7.5-3.02 7.5-6.75S12.14 1.5 8 1.5Z" />
              </svg>
              <span>Contacto</span>
            </button>
          )}

          {catalogUrl ? (
            <a
              href={catalogUrl}
              className="btn btn-ghost appear appear--side"
              style={{ '--d': '1.10s' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.6" />
                <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.6" />
                <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.6" />
                <rect x="9" y="9" width="5.5" height="5.5" rx="1.6" />
              </svg>
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
