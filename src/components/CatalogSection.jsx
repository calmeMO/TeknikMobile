import React, { useState } from 'react';
import { catalogProducts, formatDOP, buildProductWhatsAppUrl } from '../config/catalogData';
import { siteConfig } from '../config/siteConfig';

export default function CatalogSection({ selectedBrand: externalBrand, onBrandChange }) {
  const [internalBrand, setInternalBrand] = useState('all');
  const selectedBrand = externalBrand !== undefined ? externalBrand : internalBrand;
  const setSelectedBrand = onBrandChange || setInternalBrand;

  // State for each product's chosen color and storage
  const [productSelections, setProductSelections] = useState(() => {
    const initial = {};
    catalogProducts.forEach((p) => {
      initial[p.id] = {
        color: p.colors[0],
        storage: p.storageOptions[0]
      };
    });
    return initial;
  });

  const handleColorChange = (productId, color) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color
      }
    }));
  };

  const handleStorageChange = (productId, storage) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        storage
      }
    }));
  };

  const filteredProducts = catalogProducts.filter((product) => {
    if (selectedBrand === 'all') return true;
    return product.brand === selectedBrand;
  });

  return (
    <section className="catalog-section" id="catalogo" aria-label="Catálogo de Teléfonos en Teknik Mobile">
      <div className="catalog-header">
        <h2 className="catalog-title font-samsung-sharp">
          Equipos Insignia Disponibles.
        </h2>
        <p className="catalog-subtitle font-samsung-one">
          Equipos 100% nuevos y originales, sellados en caja con garantía local en República Dominicana y envíos asegurados a todo el país.
        </p>

        {/* Brand Filter Tabs */}
        <div className="catalog-filters font-samsung-bold" role="tablist" aria-label="Filtro por marca">
          <button
            type="button"
            className={`filter-btn ${selectedBrand === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedBrand('all')}
            role="tab"
            aria-selected={selectedBrand === 'all'}
          >
            Todos
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedBrand === 'samsung' ? 'active' : ''}`}
            onClick={() => setSelectedBrand('samsung')}
            role="tab"
            aria-selected={selectedBrand === 'samsung'}
          >
            Samsung
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedBrand === 'apple' ? 'active' : ''}`}
            onClick={() => setSelectedBrand('apple')}
            role="tab"
            aria-selected={selectedBrand === 'apple'}
          >
            Apple
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedBrand === 'pixel' ? 'active' : ''}`}
            onClick={() => setSelectedBrand('pixel')}
            role="tab"
            aria-selected={selectedBrand === 'pixel'}
          >
            Pixel
          </button>
          <button
            type="button"
            className={`filter-btn ${selectedBrand === 'accesorios' ? 'active' : ''}`}
            onClick={() => setSelectedBrand('accesorios')}
            role="tab"
            aria-selected={selectedBrand === 'accesorios'}
          >
            Accesorios
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="catalog-grid">
        {filteredProducts.map((product) => {
          const currentSelection = productSelections[product.id] || {
            color: product.colors[0],
            storage: product.storageOptions[0]
          };
          const { color, storage } = currentSelection;
          const whatsAppQuoteUrl = buildProductWhatsAppUrl(
            product,
            color,
            storage,
            siteConfig.whatsappNumber
          );

          return (
            <article key={product.id} className="product-card" aria-labelledby={`prod-${product.id}`}>
              {/* Header Badges */}
              <div className="product-badge-wrap">
                <span className="product-badge font-samsung-bold">{product.badge}</span>
                <span className="product-brand-tag font-samsung-one">{product.brandLabel}</span>
              </div>

              {/* Product Visual Box */}
              <div className="product-image-box">
                <img
                  src={product.image}
                  alt={`${product.name} en color ${color.name}`}
                  className="product-card-img"
                  loading="lazy"
                />
              </div>

              {/* Title & Tagline */}
              <h3 id={`prod-${product.id}`} className="product-name font-samsung-sharp">
                {product.name}
              </h3>
              <p className="product-tagline font-samsung-one">
                {product.tagline}
              </p>

              {/* Color Selector */}
              <div className="product-colors-row" aria-label="Seleccionar color">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`color-swatch ${color.name === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleColorChange(product.id, c)}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
                <span className="color-selected-name font-samsung-one">
                  {color.name}
                </span>
              </div>

              {/* Storage Capacity Selector */}
              <div className="product-storage-row" aria-label="Seleccionar almacenamiento">
                {product.storageOptions.map((opt) => (
                  <button
                    key={opt.capacity}
                    type="button"
                    className={`storage-pill font-samsung-bold ${storage.capacity === opt.capacity ? 'active' : ''}`}
                    onClick={() => handleStorageChange(product.id, opt)}
                  >
                    {opt.capacity}
                  </button>
                ))}
              </div>

              {/* Specs Capsules */}
              <div className="product-specs-grid">
                {product.specs.map((spec, i) => (
                  <div key={i} className="spec-capsule">
                    <div className="spec-capsule-label font-samsung-one">{spec.label}</div>
                    <div className="spec-capsule-val font-samsung-bold" title={spec.value}>{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Footer Price & WhatsApp CTA */}
              <div className="product-footer-row">
                <div>
                  <div className="price-box-dop font-samsung-sharp">
                    {formatDOP(storage.priceDOP)}
                  </div>
                  <div className="price-box-usd font-samsung-one">
                    Aprox. ${storage.priceUSD} USD
                  </div>
                </div>

                <a
                  href={whatsAppQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-card-whatsapp font-samsung-bold"
                  aria-label={`Cotizar ${product.name} de ${storage.capacity} por WhatsApp`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Cotizar</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
