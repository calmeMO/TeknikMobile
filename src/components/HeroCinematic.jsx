import React, { useRef, useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function HeroCinematic() {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [isReady, setIsReady] = useState(false);
  const whatsAppUrl = getWhatsAppUrl();

  // Responsive device video detection (breakpoint 768px: desktop vs mobile)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop landscape video on computers/tablets, mobile portrait video on smartphones
  const videoSrc = isMobile
    ? "/galaxy-s24-ultra-highlights-form-factor-mo.webm"
    : "/galaxy-s24-ultra-highlights-form-factor.webm";

  // Seamless seeking to keynote showcase start (second 3.6)
  useEffect(() => {
    let timer = null;
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 1) {
        try {
          if (Math.abs(video.currentTime - 3.6) > 0.4) {
            video.currentTime = 3.6;
          }
          video.play().catch(() => {});
        } catch (e) {}
      }
    }
    // Safety fallback: ensure isReady triggers smoothly with Apple motion feel
    timer = setTimeout(() => {
      setIsReady(true);
    }, 450);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [videoSrc]);

  // When video metadata is ready, seek to second 3.6 and play once as entrance animation
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      try {
        if (Math.abs(video.currentTime - 3.6) > 0.4) {
          video.currentTime = 3.6;
        } else {
          setIsReady(true);
        }
        video.play().catch(() => {});
      } catch (e) {
        setIsReady(true);
      }
    }
  };

  const handleSeeked = () => {
    setIsReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="hero-keynote-container" id="top" aria-label="Hero Samsung Galaxy S24 Ultra">
      {/* 1. Video Entrance Animation at the Top: Starts at 3.6s, stops on back view */}
      <div className="hero-video-stage">
        <video
          key={videoSrc}
          ref={videoRef}
          className={`hero-entrance-video ${isReady ? 'is-ready' : ''}`}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setIsReady(true)}
          onPlay={() => setIsReady(true)}
          onSeeked={handleSeeked}
        />
      </div>

      {/* 2. Text strictly BELOW the video - matches user screenshot */}
      <div className="hero-keynote-info">
        <h1 className="hero-keynote-title font-samsung-sharp">
          Samsung Galaxy S24<br />Ultra
        </h1>
        <p className="hero-keynote-subtitle font-samsung-one">
          Descubre la innovación de Samsung en Teknik Mobile
        </p>

        {/* 3. Action Buttons: Stacked vertically exactly as in user reference */}
        <div className="hero-keynote-actions">
          <a href="#catalogo" className="btn-hero-inventory font-samsung-bold">
            <span>Ver inventario</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>

          <a
            href={whatsAppUrl || "https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20quiero%20informaci%C3%B3n%20del%20Samsung%20Galaxy"}
            className="btn-hero-whatsapp font-samsung-bold"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.21 1.26-1.74 1.34-.48.07-1.1.1-3.21-.77-2.69-1.12-4.43-3.85-4.57-4.03-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.24.53-.3.71-.3.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.43-.26.71-.15.29.1 1.83.86 2.14 1.02.31.15.52.23.59.36.08.12.08.73-.16 1.41z" />
            </svg>
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
