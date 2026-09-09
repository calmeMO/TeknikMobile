import React from 'react';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  return (
    <footer className="site-footer" id="contacto" aria-label="Pie de página de Teknik Mobile">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <h3 className="footer-brand-title font-samsung-sharp">
              Teknik<span style={{ color: '#86868b' }}> Mobile</span>
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
              <li><a href="#top">Inicio & Hero</a></li>
              <li><a href="#highlights">Lo más destacado</a></li>
              <li><a href="#catalogo">Catálogo Samsung & iPhone</a></li>
              <li><a href="https://wa.me/18095550199" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a></li>
            </ul>
          </div>

          {/* Benefits Col */}
          <div className="footer-col">
            <h4 className="font-samsung-bold">Garantía & Envíos RD</h4>
            <ul className="footer-links font-samsung-one">
              <li>✓ Envíos asegurados a Santo Domingo y todo el país</li>
              <li>✓ Equipos nuevos, sellados en caja</li>
              <li>✓ Garantía local respaldada por Teknik Mobile</li>
              <li>✓ Transferencias Banreservas, Popular y BHD</li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="footer-col">
            <h4 className="font-samsung-bold">Contacto Directo</h4>
            <p className="font-samsung-one" style={{ marginBottom: '12px' }}>
              ¿Tienes preguntas sobre modelos, colores o financiamiento? Escríbenos directamente a nuestro WhatsApp oficial:
            </p>
            <a
              href="https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-whatsapp font-samsung-bold"
              style={{ display: 'inline-flex' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
