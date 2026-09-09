import React, { useRef, useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function HeroCinematic() {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const whatsAppUrl = getWhatsAppUrl();

  // Responsive device video detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When video source loads, start from second 2, play once as entrance animation
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasEnded(false);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const replayAnimation = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasEnded(false);
      }).catch(() => {});
    }
  };

  const videoSrc = isMobile
    ? "/galaxy-s24-ultra-highlights-form-factor-mo.webm"
    : "/galaxy-s24-ultra-highlights-form-factor.webm";

  const posterSrc = isMobile ? "/mobile-poster.jpg" : "/desktop-poster.jpg";

  return (
    <section className="hero-keynote-container" id="top" aria-label="Hero Samsung Galaxy">
      {/* Top Header Information: Apple/Samsung style */}
      <div className="hero-keynote-header">
        <h1 className="hero-keynote-title font-samsung-sharp">
          Samsung Galaxy
        </h1>
        <p className="hero-keynote-subtitle font-samsung-one">
          Uno de los teléfonos insignia de nuestra tienda
        </p>

        {/* Action CTAs */}
        <div className="hero-keynote-actions">
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
              href="https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20quiero%20informaci%C3%B3n%20del%20Samsung%20Galaxy"
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

      {/* Hero Showcase Video: Adapted for Devices, starts at 2s, plays once */}
      <div className="hero-keynote-stage">
        <video
          key={videoSrc}
          ref={videoRef}
          className="hero-keynote-video"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        {/* Discreet replay button when animation concludes */}
        {hasEnded && (
          <button
            type="button"
            className="video-replay-pill font-samsung-bold"
            onClick={replayAnimation}
            aria-label="Volver a reproducir animación de entrada"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Volver a ver</span>
          </button>
        )}
      </div>
    </section>
  );
}
