import React, { useState, useEffect, useRef, useCallback } from 'react';

const HIGHLIGHT_SLIDES = [
  {
    id: "cameras",
    headline: "Sensor de 200 MP.",
    subheadline: "Este zoom va a llegar muy lejos.",
    image: "/mobile-poster.jpg",
    desktopImage: "/desktop-poster.jpg",
    objectPosition: "center 28%",
    alt: "Primer plano de las cámaras del Samsung Galaxy S24 Ultra",
    hasModal: true
  },
  {
    id: "titanium",
    headline: "Titanio aeroespacial.",
    subheadline: "Titanio para resistirlo todo.",
    image: "/images/highlight-titanium.jpg",
    desktopImage: "/images/highlight-titanium.jpg",
    objectPosition: "center 60%",
    alt: "Bisel de titanio del Samsung Galaxy S24 Ultra",
    hasModal: false
  },
  {
    id: "spen",
    headline: "Diseño & S Pen.",
    subheadline: "Elegante. Resistente. Impactante.",
    image: "/images/highlight-spen.jpg",
    desktopImage: "/images/highlight-spen.jpg",
    objectPosition: "center 70%",
    alt: "Diseño posterior y S Pen del Samsung Galaxy S24 Ultra",
    hasModal: false
  },
  {
    id: "chip",
    headline: "Snapdragon 8 Gen 3.",
    subheadline: "Rendimiento a toda máquina con IA.",
    image: "/images/highlight-chip.jpg",
    desktopImage: "/images/highlight-chip.jpg",
    objectPosition: "center 65%",
    alt: "Procesador Snapdragon 8 Gen 3 for Galaxy",
    hasModal: false
  },
  {
    id: "battery-display",
    headline: "Pantalla & Autonomía.",
    subheadline: "Extraordinaria batería para todo el día.",
    image: "/images/product-s24ultra.jpg",
    desktopImage: "/images/product-s24ultra.jpg",
    objectPosition: "center 52%",
    alt: "Pantalla y diseño del Samsung Galaxy S24 Ultra",
    hasModal: false
  }
];

const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 520; // 450-650ms smooth deceleration

export default function HighlightsSection({ onOpenCamerasModal }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Starts paused per reference
  const [progress, setProgress] = useState(0); // Progress bar (0% - 100%)

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const cardPositionsRef = useRef([]);
  const padLeftRef = useRef(24);
  const activeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const animFrameRef = useRef(null);
  const scrollAnimRef = useRef(null);
  const playLoopRef = useRef(null);
  const playStartTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);

  // Drag state for mouse interaction on desktop ONLY
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Synchronize refs with states
  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const handleChange = (e) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        setIsPlaying(false);
        setProgress(0);
        textRefs.current.forEach((el) => {
          if (el) el.style.transform = 'translate3d(0, 0, 0)';
        });
        imgRefs.current.forEach((el) => {
          if (el) el.style.transform = 'none';
        });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute snap positions of each card relative to track
  const measurePositions = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const style = window.getComputedStyle(track);
    const padLeft = parseFloat(style.paddingLeft) || 24;
    padLeftRef.current = padLeft;

    cardPositionsRef.current = cardRefs.current.map((card) => {
      if (!card) return 0;
      return Math.max(0, card.offsetLeft - padLeft);
    });
  }, []);

  // Continuous horizontal parallax applied EXCLUSIVELY to the text layer
  const updateParallax = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const currentScroll = track.scrollLeft;
    const isDesktop = window.innerWidth >= 769;

    if (reducedMotionRef.current) {
      textRefs.current.forEach((el) => {
        if (el) el.style.transform = 'translate3d(0, 0, 0)';
      });
      return;
    }

    // Proportional parallax for text layer only:
    // Mobile (~330px card): max 80px text offset
    // Desktop PC (1280px card): max 160px text offset
    const maxTextOffset = isDesktop ? 160 : 80;
    const textFactor = isDesktop ? 0.22 : 0.28;

    cardPositionsRef.current.forEach((pos, idx) => {
      const textEl = textRefs.current[idx];
      if (!textEl) return;

      // d is signed distance between current card position and its active alignment position
      // When card is active, track.scrollLeft == pos, so d = 0.
      // When card moves left (user scrolled right, track.scrollLeft > pos), d is negative.
      const d = pos - currentScroll;

      // Accelerated text parallax in same direction (image and card move 1:1 without parallax):
      const textOffset = Math.max(-maxTextOffset, Math.min(maxTextOffset, d * textFactor));
      textEl.style.transform = `translate3d(${textOffset}px, 0, 0)`;
    });
  }, []);

  // Detect active card index based on current scroll position
  const detectActiveCard = useCallback(() => {
    const track = trackRef.current;
    if (!track || cardPositionsRef.current.length === 0) return;

    const currentScroll = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;

    cardPositionsRef.current.forEach((pos, idx) => {
      const dist = Math.abs(pos - currentScroll);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });

    if (closest !== activeRef.current) {
      activeRef.current = closest;
      setActiveIndex(closest);
      // Reset play progress for newly active slide
      playStartTimeRef.current = performance.now();
      setProgress(0);
    }
  }, []);

  // Custom programmatic smooth scroll with cubic ease-out deceleration
  const smoothScrollTo = useCallback((targetLeft, duration = TRANSITION_DURATION) => {
    const track = trackRef.current;
    if (!track) return;

    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }

    if (reducedMotionRef.current || duration <= 0) {
      track.scrollLeft = targetLeft;
      updateParallax();
      detectActiveCard();
      return;
    }

    // Disable CSS snap during programmatic animation so browser snap does not fight JS
    track.style.scrollSnapType = 'none';

    const startLeft = track.scrollLeft;
    const distance = targetLeft - startLeft;
    if (Math.abs(distance) < 1) {
      track.style.scrollSnapType = 'x mandatory';
      return;
    }

    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progressRatio);

      track.scrollLeft = startLeft + distance * eased;
      updateParallax();
      detectActiveCard();

      if (progressRatio < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        track.scrollLeft = targetLeft;
        track.style.scrollSnapType = 'x mandatory';
        updateParallax();
        detectActiveCard();
        scrollAnimRef.current = null;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  }, [detectActiveCard, updateParallax]);

  // Navigate directly to a specific slide index
  const scrollToSlide = useCallback((index) => {
    if (index < 0 || index >= HIGHLIGHT_SLIDES.length) return;
    measurePositions();
    const target = cardPositionsRef.current[index] ?? 0;
    smoothScrollTo(target);
  }, [measurePositions, smoothScrollTo]);

  // Snap to closest card after mouse drag on desktop
  const snapToNearestCard = useCallback(() => {
    const track = trackRef.current;
    if (!track || cardPositionsRef.current.length === 0) return;

    const currentScroll = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;

    cardPositionsRef.current.forEach((pos, idx) => {
      const dist = Math.abs(pos - currentScroll);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });

    scrollToSlide(closest);
  }, [scrollToSlide]);

  // Native scrolling, touch listeners, resize
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measurePositions();
    updateParallax();

    const handleScroll = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        updateParallax();
        detectActiveCard();
      });
    };

    // User manual touch/scroll pauses auto-advance immediately
    const handleManualInteraction = () => {
      if (isPlayingRef.current) {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    const handleResize = () => {
      measurePositions();
      requestAnimationFrame(updateParallax);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('touchstart', handleManualInteraction, { passive: true });
    track.addEventListener('wheel', handleManualInteraction, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const timer = setTimeout(() => {
      measurePositions();
      updateParallax();
    }, 150);

    return () => {
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('touchstart', handleManualInteraction);
      track.removeEventListener('wheel', handleManualInteraction);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    };
  }, [detectActiveCard, measurePositions, updateParallax]);

  // MOUSE-ONLY drag support for desktop (touch devices use native horizontal scrolling!)
  const handlePointerDown = (e) => {
    // Only intercept mouse drag on desktop! Mobile touch uses native scrolling.
    if (e.pointerType !== 'mouse' || e.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    if (isPlayingRef.current) {
      setIsPlaying(false);
      setProgress(0);
    }
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    scrollStartRef.current = track.scrollLeft;

    // Temporarily release CSS snap while dragging so drag is completely free and unhooked
    track.style.scrollSnapType = 'none';

    try {
      track.setPointerCapture?.(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || e.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;

    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 4) {
      hasMovedRef.current = true;
    }

    track.scrollLeft = scrollStartRef.current - dx;
    updateParallax();
    detectActiveCard();
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current || e.pointerType !== 'mouse') return;
    isDraggingRef.current = false;
    const track = trackRef.current;
    if (!track) return;

    try {
      track.releasePointerCapture?.(e.pointerId);
    } catch (_) {}

    snapToNearestCard();
  };

  const handlePointerCancel = (e) => {
    if (!isDraggingRef.current || e.pointerType !== 'mouse') return;
    isDraggingRef.current = false;
    snapToNearestCard();
  };

  // Play animation loop: smoothly animates progress fill and advances every 5 seconds
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      if (playLoopRef.current) {
        cancelAnimationFrame(playLoopRef.current);
        playLoopRef.current = null;
      }
      return;
    }

    playStartTimeRef.current = performance.now();

    const loop = (now) => {
      const elapsed = now - playStartTimeRef.current;
      const pct = Math.min(100, (elapsed / AUTOPLAY_INTERVAL) * 100);
      setProgress(pct);

      if (pct < 100) {
        playLoopRef.current = requestAnimationFrame(loop);
      } else {
        // 5 seconds completed on this slide
        const current = activeRef.current;
        const next = current + 1;
        if (next >= HIGHLIGHT_SLIDES.length) {
          // Reached last slide: stop playback and return to play state per spec
          setIsPlaying(false);
          setProgress(0);
        } else {
          scrollToSlide(next);
          playStartTimeRef.current = performance.now();
          setProgress(0);
          playLoopRef.current = requestAnimationFrame(loop);
        }
      }
    };

    playLoopRef.current = requestAnimationFrame(loop);

    return () => {
      if (playLoopRef.current) {
        cancelAnimationFrame(playLoopRef.current);
        playLoopRef.current = null;
      }
    };
  }, [isPlaying, scrollToSlide]);

  // Click on indicator button
  const handleSelectSlide = (index) => {
    setIsPlaying(false);
    setProgress(0);
    scrollToSlide(index);
  };

  // Toggle play/pause button
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setProgress(0);
    } else {
      if (activeRef.current >= HIGHLIGHT_SLIDES.length - 1) {
        scrollToSlide(0);
      }
      setIsPlaying(true);
      playStartTimeRef.current = performance.now();
      setProgress(0);
    }
  };

  // Keyboard navigation for carousel track
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsPlaying(false);
      setProgress(0);
      const next = Math.min(HIGHLIGHT_SLIDES.length - 1, activeRef.current + 1);
      scrollToSlide(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsPlaying(false);
      setProgress(0);
      const prev = Math.max(0, activeRef.current - 1);
      scrollToSlide(prev);
    }
  };

  return (
    <section
      className="highlights-section"
      id="highlights"
      aria-label="Lo más destacado del Samsung Galaxy S24 Ultra"
    >
      {/* Header aligned with content margin */}
      <div className="highlights-header">
        <div className="hl-header-top">
          <span className="hl-product-badge font-samsung-bold">
            Samsung Galaxy S24 Ultra
          </span>
          <a href="#catalogo" className="hl-explore-link font-samsung-bold">
            Explorar
          </a>
        </div>
        <h2 className="hl-section-title font-samsung-sharp">
          Mira lo más destacado.
        </h2>
      </div>

      {/* Horizontal Carousel Track with Native Touch & Desktop Mouse Drag */}
      <div
        className="highlights-track"
        ref={trackRef}
        role="region"
        aria-label="Carrusel de tarjetas destacadas"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {HIGHLIGHT_SLIDES.map((slide, idx) => (
          <article
            key={slide.id}
            className={`hl-card ${idx === activeIndex ? 'is-active' : ''}`}
            ref={(el) => { cardRefs.current[idx] = el; }}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${idx + 1} de ${HIGHLIGHT_SLIDES.length}: ${slide.headline} ${slide.subheadline}`}
          >
            {/* Layer 1: Immersive Cover Image (Responsive Picture for Mobile & Desktop PC) */}
            <picture className="hl-card-picture">
              {slide.desktopImage && (
                <source media="(min-width: 769px)" srcSet={slide.desktopImage} />
              )}
              <img
                src={slide.image}
                alt={slide.alt}
                className="hl-card-img"
                style={{ objectPosition: slide.objectPosition }}
                loading={idx < 2 ? 'eager' : 'lazy'}
                draggable="false"
              />
            </picture>

            {/* Subtle top vignette for legibility while keeping main product details vivid */}
            <div className="hl-card-vignette" aria-hidden="true" />

            {/* Layer 2: Independent HTML Text Layer with Horizontal Parallax */}
            <div
              className="hl-card-text-layer"
              ref={(el) => { textRefs.current[idx] = el; }}
            >
              <div className="hl-card-text-box">
                <h3 className="hl-card-headline font-samsung-sharp">
                  {slide.headline}
                </h3>
                <p className="hl-card-subheadline font-samsung-bold">
                  {slide.subheadline}
                </p>
                {slide.hasModal && (
                  <button
                    type="button"
                    className="hl-camera-modal-btn font-samsung-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCamerasModal?.();
                    }}
                    aria-label="Comparar las cámaras del Galaxy S24 Ultra"
                  >
                    <span>Comparar cámaras</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Controls: Pill Capsule + Circular Play Button */}
      <div
        className="hl-controls"
        role="toolbar"
        aria-label="Controles del carrusel de destacados"
      >
        {/* Horizontal Capsule (~188px wide, 60px high) */}
        <div className="hl-controls-capsule" role="tablist" aria-label="Seleccionar diapositiva">
          {HIGHLIGHT_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`hl-indicator-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelectSlide(idx)}
                aria-selected={isActive}
                aria-label={`Diapositiva ${idx + 1}: ${slide.headline}`}
                tabIndex={isActive ? 0 : -1}
              >
                <span className="hl-indicator-dot">
                  {isActive && (
                    <span
                      className="hl-indicator-fill"
                      style={{
                        width: isPlaying ? `${progress}%` : '100%'
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Circular Play/Pause Button (60px, #28282a, white centered icon) */}
        <button
          type="button"
          className="hl-play-btn"
          onClick={handleTogglePlay}
          aria-label={
            isPlaying
              ? 'Pausar avance automático'
              : 'Iniciar avance automático'
          }
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              style={{ transform: 'translateX(1px)' }}
            >
              <path d="M8 5.14v13.72a1 1 0 001.53.85l11-6.86a1 1 0 000-1.7l-11-6.86A1 1 0 008 5.14z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
