import React, { useRef, useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function HeroCinematic() {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 600;
    }
    return false;
  });
  const [isReady, setIsReady] = useState(false);
  const whatsAppUrl = getWhatsAppUrl();

  // Responsive device video detection (breakpoint 600px for true mobile smartphones)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When video metadata is ready, seek to second 3.1 and play once as entrance animation
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3.1;
      videoRef.current.play().then(() => {
        setIsReady(true);
      }).catch(() => {
        setIsReady(true);
      });
    }
  };

  const handleSeeked = () => {
    setIsReady(true);
  };

  // Desktop landscape video on computers/tablets, mobile portrait video on smartphones
  const videoSrc = isMobile
    ? "/galaxy-s24-ultra-highlights-form-factor-mo.webm"
    : "/galaxy-s24-ultra-highlights-form-factor.webm";

  return (
    <section className="hero-keynote-container" id="top" aria-label="Hero Samsung Galaxy">
      {/* 1. Video Entrance Animation at the Top: Starts at 3.1s, no loop, no buttons */}
      <div className="hero-video-stage">
        <video
          key={videoSrc}
          ref={videoRef}
          className={`hero-entrance-video ${isReady ? 'is-ready' : ''}`}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
        />
      </div>

      {/* 2. Text strictly BELOW the video */}
      <div className="hero-keynote-info">
        <h1 className="hero-keynote-title font-samsung-sharp">
          Samsung Galaxy
        </h1>
        <p className="hero-keynote-subtitle font-samsung-one">
          Uno de los teléfonos insignia de nuestra tienda
        </p>

        {/* 3. Action Buttons: "Ver inventario" y "Consultar por WhatsApp" */}
        <div className="hero-keynote-actions">
          <a href="#catalogo" className="btn-apple-glass font-samsung-bold">
            <span>Ver inventario</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>

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
        </div>
      </div>
    </section>
  );
}
