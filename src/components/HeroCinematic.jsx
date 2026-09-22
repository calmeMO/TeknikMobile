import React, { useRef, useState, useEffect } from 'react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export default function HeroCinematic({ onVideoReady }) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [isReady, setIsReady] = useState(false);
  const whatsAppUrl = getWhatsAppUrl();

  const triggerReady = () => {
    setIsReady(true);
    if (onVideoReady) {
      onVideoReady();
    }
  };

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
    // Safety fallback: ensure isReady triggers smoothly with Apple / Emil motion feel
    timer = setTimeout(() => {
      triggerReady();
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
          triggerReady();
        }
        video.play().catch(() => {});
      } catch (e) {
        triggerReady();
      }
    }
  };

  const handleSeeked = () => {
    triggerReady();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="hero-keynote-container" id="top" aria-label="Hero Teknik Mobile">
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
          onCanPlay={triggerReady}
          onPlay={triggerReady}
          onSeeked={handleSeeked}
        />
      </div>

      {/* 2. Text strictly BELOW the video - enters choreographed after video */}
      <div className={`hero-keynote-info ${isReady ? 'is-ready' : ''}`}>
        <h1 className="hero-keynote-title font-samsung-sharp">
          Tu próximo dispositivo está aquí.
        </h1>
        <p className="hero-keynote-subtitle font-samsung-one">
          Descubre Samsung, Apple, Google Pixel, Smartwatches y teléfonos Calidad A+.
        </p>

        {/* 3. Action Buttons: Minimalist Apple Web Design (Ver Catálogo y Contacto) */}
        <div className="hero-keynote-actions">
          <a
            href="#catalogo"
            className="btn-hero-catalog font-samsung-bold"
            aria-label="Ver Catálogo"
          >
            <svg
              className="btn-hero-icon"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.6" />
              <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.6" />
              <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.6" />
              <rect x="9" y="9" width="5.5" height="5.5" rx="1.6" />
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
            <svg
              className="btn-hero-icon"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 1.5C3.86 1.5 0.5 4.52 0.5 8.25c0 2.22 1.2 4.17 3.06 5.38-.15.8-.57 2-.62 2.18-.08.28.16.55.45.49.88-.18 2.25-.56 3.19-1.35.45.09.92.14 1.42.14 4.14 0 7.5-3.02 7.5-6.75S12.14 1.5 8 1.5Z" />
            </svg>
            <span>Contacto</span>
          </a>
        </div>
      </div>
    </section>
  );
}
