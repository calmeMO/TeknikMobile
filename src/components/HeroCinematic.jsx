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

        {/* 3. Action Buttons: Minimalist Dark Theme (Ver Catálogo y Contacto) */}
        <div className="hero-keynote-actions">
          <a
            href="#catalogo"
            className="btn-hero-catalog font-samsung-bold"
            aria-label="Ver Catálogo"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="7" height="7" x="3" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="14" rx="1.5" />
              <rect width="7" height="7" x="3" y="14" rx="1.5" />
            </svg>
            <span>Ver Catálogo</span>
          </a>

          <a
            href={whatsAppUrl || "#contacto"}
            className="btn-hero-contact font-samsung-bold"
            target={whatsAppUrl ? "_blank" : undefined}
            rel={whatsAppUrl ? "noopener noreferrer" : undefined}
            aria-label="Contacto"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Contacto</span>
          </a>
        </div>
      </div>
    </section>
  );
}
