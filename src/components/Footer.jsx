import React from 'react';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  return (
    <footer className="site-footer" id="contacto" aria-label="Pie de página de Teknik Mobile">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <h3 className="footer-brand-title font-samsung-sharp" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <img src="/logo-teknik-icon.png" alt="" width="24" height="24" style={{ objectFit: 'contain' }} aria-hidden="true" />
              <span>Teknik<span style={{ color: '#86868b' }}> Mobile</span></span>
            </h3>
            <p className="font-samsung-one" style={{ lineHeight: 1.6, marginBottom: '20px' }}>
              Tu tienda especializada en smartphones insignia y tecnología de última generación en República Dominicana. Equipos 100% originales con garantía local.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#25d366' }} className="font-samsung-bold">
              <span className="hero-pulsing-dot" aria-hidden="true" />
              <span>Atención activa en Santo Domingo, RD</span>
            </div>
          </div>

          {/* Nav Col */}
          <div className="footer-col">
            <h4 className="font-samsung-bold">Explorar</h4>
            <ul className="footer-links font-samsung-one">
              <li><a href="#top">Inicio</a></li>
              <li><a href="#catalogo">Samsung</a></li>
              <li><a href="#catalogo">Apple</a></li>
              <li><a href="#catalogo">Pixel & Accesorios</a></li>
            </ul>
          </div>

          {/* Benefits Col */}
          <div className="footer-col">
            <h4 className="font-samsung-bold">Garantía & Envíos RD</h4>
            <ul className="footer-links font-samsung-one">
              <li>✓ Equipos 100% sellados de fábrica</li>
              <li>✓ Factura y garantía local en RD</li>
              <li>✓ Envíos a todo el país vía Metro Pac & Caribe Pack</li>
              <li>✓ Pagos contra entrega en Santo Domingo</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h4 className="font-samsung-bold">Contacto Directo</h4>
            <p className="font-samsung-one" style={{ marginBottom: '12px' }}>
              Escríbenos para cotizaciones inmediatas y disponibilidad de inventario:
            </p>
            <a
              href="https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-whatsapp font-samsung-bold"
              style={{ display: 'inline-flex' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z"/>
              </svg>
              <span>+1 (809) 555-0199</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar font-samsung-one">
          <div>
            © {new Date().getFullYear()} Teknik Mobile RD. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>República Dominicana</span>
            <span>Diseño Dark Apple & Tipografía Samsung</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
