import React, { useState, useEffect, useRef } from 'react';

const HIGHLIGHT_SLIDES = [
  {
    id: "titanium",
    eyebrow: "Titanio Aeroespacial",
    eyebrowColor: "silver",
    title: "Titanio para resistirlo todo",
    desc: "Un escudo de titanio forjado e integrado directamente en el marco. Máxima resistencia a golpes y caídas con un acabado satinado ultraligero.",
    image: "/images/highlight-titanium.jpg",
    ctaType: "link",
    ctaLabel: "Saber más de materiales",
    ctaHref: "#catalogo"
  },
  {
    id: "spen",
    eyebrow: "Diseño & S Pen",
    eyebrowColor: "blue",
    title: "Elegante. Resistente. Impactante.",
    desc: "Protegido por el nuevo cristal antirreflejante Corning® Gorilla® Armor y equipado con el S Pen integrado para notas, bocetos y precisión milimétrica.",
    image: "/images/highlight-spen.jpg",
    ctaType: "link",
    ctaLabel: "Ver en catálogo",
    ctaHref: "#catalogo"
  },
  {
    id: "cameras",
    eyebrow: "Cámaras",
    eyebrowColor: "orange",
    title: "Este zoom va a llegar muy lejos.",
    desc: "Sensor principal de 200 MP asistido por el procesador ProVisual. Zoom óptico de calidad cinematográfica en 2x, 3x, 5x y hasta 100x con IA.",
    image: "/images/highlight-camera.jpg",
    ctaType: "button",
    ctaLabel: "Comparar las cámaras del Galaxy",
    action: "openCameraModal"
  },
  {
    id: "chip",
    eyebrow: "Procesador & Batería",
    eyebrowColor: "silver",
    title: "Rendimiento a toda máquina. Extraordinaria autonomía.",
    desc: "Snapdragon 8 Gen 3 for Galaxy con cámara de vapor duplicada para mantener el equipo frío bajo cargas extremas de juegos con Ray Tracing.",
    image: "/images/highlight-chip.jpg",
    ctaType: "link",
    ctaLabel: "Explorar rendimiento",
    ctaHref: "#catalogo"
  }
];

export default function HighlightsSection({ onOpenCamerasModal }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const TICK_INTERVAL = 50; // 50ms progress tick

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % HIGHLIGHT_SLIDES.length);
          return 0;
        }
        return prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, TICK_INTERVAL);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeIndex]);

  const selectSlide = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentSlide = HIGHLIGHT_SLIDES[activeIndex];

  return (
    <section className="highlights-section" id="highlights" aria-label="Lo más destacado del Samsung Galaxy S24 Ultra">
      {/* Header with Title and Apple-style Controls */}
      <div className="highlights-header">
        <div className="highlights-title-group">
          <h2 className="font-samsung-sharp">Mira lo más destacado.</h2>
          <p className="font-samsung-one">Ingeniería sin límites que redefine el estándar de los smartphones insignia.</p>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="carousel-controls-bar" role="toolbar" aria-label="Controles del carrusel de destacados">
          <div className="carousel-indicators">
            {HIGHLIGHT_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`carousel-dot ${isActive ? 'active' : ''}`}
                  onClick={() => selectSlide(idx)}
                  aria-label={`Ver diapositiva ${idx + 1}: ${slide.title}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  {isActive && (
                    <span
                      className="carousel-dot-fill"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-play-toggle"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pausar rotación automática" : "Reanudar rotación automática"}
            title={isPlaying ? "Pausar" : "Reanudar"}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1.5" />
                <rect x="14" y="4" width="4" height="16" rx="1.5" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Highlights Stage */}
      <div className="highlights-stage">
        <div className="highlight-card">
          {/* Background Photo */}
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="highlight-card-bg"
            loading="lazy"
          />

          <div className="highlight-card-overlay" />

          {/* Top Info */}
          <div className="highlight-card-top">
            <span className={`highlight-eyebrow ${currentSlide.eyebrowColor} font-samsung-bold`}>
              {currentSlide.eyebrow}
            </span>
            <h3 className="highlight-card-title font-samsung-sharp">
              {currentSlide.title}
            </h3>
          </div>

          {/* Bottom Info & CTAs */}
          <div className="highlight-card-bottom">
            <p className="highlight-card-desc font-samsung-one">
              {currentSlide.desc}
            </p>

            {currentSlide.ctaType === "button" ? (
              <button
                type="button"
                className="btn-highlight-action btn-plus-accent font-samsung-bold"
                onClick={onOpenCamerasModal}
                aria-label="Abrir comparativa de cámaras del Galaxy S24 Ultra"
              >
                <span>{currentSlide.ctaLabel}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            ) : (
              <a
                href={currentSlide.ctaHref}
                className="btn-highlight-action font-samsung-bold"
              >
                <span>{currentSlide.ctaLabel}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
