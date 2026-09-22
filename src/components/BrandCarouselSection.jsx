import React, { useRef, useState, useEffect } from 'react';

const brandCategories = [
  {
    id: "samsung",
    brandKey: "samsung",
    title: "Samsung",
    description: "Innovación que se adapta a ti.",
    image: "/images/category-samsung.jpg",
    alt: "Samsung Galaxy en Teknik Mobile",
    bg: "linear-gradient(165deg, #1a1d2e 0%, #111318 100%)",
  },
  {
    id: "apple",
    brandKey: "apple",
    title: "Apple",
    description: "Potencia. Diseño. Ecosistema.",
    image: "/images/category-apple.jpg",
    alt: "Apple iPhone en Teknik Mobile",
    bg: "linear-gradient(165deg, #252220 0%, #141210 100%)",
  },
  {
    id: "pixel",
    brandKey: "pixel",
    title: "Google Pixel",
    description: "La experiencia Android, llevada más lejos.",
    image: "/images/category-pixel.jpg",
    alt: "Google Pixel en Teknik Mobile",
    bg: "linear-gradient(165deg, #181e1a 0%, #0f1310 100%)",
  },
  {
    id: "smartwatches",
    brandKey: "accesorios",
    title: "Smartwatches",
    description: "Tu día. En tu muñeca.",
    image: "/images/category-smartwatches.jpg",
    alt: "Smartwatches en Teknik Mobile",
    bg: "linear-gradient(165deg, #1f1c18 0%, #13110d 100%)",
  },
  {
    id: "calidad-a",
    brandKey: "all",
    title: "Calidad A+",
    description: "Seminuevos certificados con garantía real.",
    image: "/images/category-calidad-a.jpg",
    alt: "Teléfonos Calidad A+ en Teknik Mobile",
    bg: "linear-gradient(165deg, #22201a 0%, #141210 100%)",
  }
];

export default function BrandCarouselSection({ onSelectBrand }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 12;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
    setCanScrollLeft(!atLeft);
    setCanScrollRight(!atRight);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleScroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = 320;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSelectCategory = (brandKey) => {
    if (onSelectBrand) {
      onSelectBrand(brandKey);
    }
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="brand-section" id="marcas" aria-label="Explora por categoría">
      <div className="brand-section-container">
        {/* Section Header — Apple: bold title only */}
        <h2 className="brand-heading font-samsung-sharp">
          Explora por categoría.
        </h2>

        {/* Carousel */}
        <div
          className="brand-carousel-track"
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-label="Carrusel de categorías"
        >
          {brandCategories.map((cat) => (
            <article key={cat.id} className="brand-item">
              {/* Squircle with colored gradient bg + centered product */}
              <div
                className="brand-visual-card"
                style={{ background: cat.bg }}
                onClick={() => handleSelectCategory(cat.brandKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectCategory(cat.brandKey);
                  }
                }}
                aria-label={`Ver modelos de ${cat.title}`}
              >
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="brand-visual-img"
                  loading="lazy"
                />
              </div>

              {/* Title + desc + single CTA */}
              <h3 className="brand-item-title font-samsung-sharp">
                {cat.title}
              </h3>
              <p className="brand-item-desc font-samsung-one">
                {cat.description}
              </p>
              <button
                type="button"
                className="btn-brand-yellow font-samsung-bold"
                onClick={() => handleSelectCategory(cat.brandKey)}
                aria-label={`Ver modelos de ${cat.title}`}
              >
                Ver modelos
              </button>
            </article>
          ))}
        </div>

        {/* Bottom arrows — right-aligned like Apple */}
        <div className="brand-bottom-bar">
          <div className="brand-carousel-controls">
            <button
              type="button"
              className="brand-arrow-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              className="brand-arrow-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Siguiente"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
