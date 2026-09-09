import React, { useRef, useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function HeroCinematic() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const whatsAppUrl = getWhatsAppUrl();

  useEffect(() => {
    // Ensure video attempts to play smoothly on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: paused state if blocked
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="hero-cinematic-container" id="top" aria-label="Hero Samsung Galaxy S24 Ultra">
      {/* Background Video Layer */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="/desktop-poster.jpg"
        >
          {/* Mobile WebM for narrow viewports */}
          <source
            src="/galaxy-s24-ultra-highlights-form-factor-mo.webm"
            type="video/webm"
            media="(max-width: 768px)"
          />
          {/* Desktop WebM for larger displays */}
          <source
            src="/galaxy-s24-ultra-highlights-form-factor.webm"
            type="video/webm"
          />
        </video>
        <div className="hero-video-mask" />
      </div>

      {/* Floating Video Control Pill */}
      <button
        type="button"
        className="video-ctrl-pill font-samsung-bold"
        onClick={toggleVideoPlayback}
        aria-label={isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}
        title={isPlaying ? "Pausar video" : "Reproducir video"}
      >
        {isPlaying ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
            <span>Pausar</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Reproducir</span>
          </>
        )}
      </button>

      {/* Hero Content */}
      <div className="hero-cinematic-content">
        {/* Status Badge */}
        <div className="hero-pill-badge font-samsung-bold">
          <span className="hero-pulsing-dot" aria-hidden="true" />
          <span>Flagship 2024 · Disponible en Teknik Mobile RD</span>
        </div>

        {/* Main H1 Title in Samsung Sharp Sans Bold 700 */}
        <h1 className="hero-cinematic-title font-samsung-sharp">
          Samsung Galaxy S24 Ultra.<br />
          <span className="accent-gradient">La era de Galaxy AI está aquí.</span>
        </h1>

        {/* Lede in SamsungOne Regular 400 */}
        <p className="hero-cinematic-desc font-samsung-one">
          Forjado en titanio aeroespacial con pantalla Dynamic AMOLED 2X, sensor fotográfico de 200 MP y toda la potencia de Snapdragon 8 Gen 3. Adquiérelo hoy en Teknik Mobile con garantía local en República Dominicana.
        </p>

        {/* Action Buttons in SamsungOne Bold 700 */}
        <div className="hero-cinematic-actions">
          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              className="btn-apple-primary font-samsung-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          ) : (
            <a
              href="https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20quiero%20informaci%C3%B3n%20del%20Galaxy%20S24%20Ultra"
              className="btn-apple-primary font-samsung-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          )}

          <a href="#highlights" className="btn-apple-glass font-samsung-bold">
            <span>Ver destacados</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
