import React, { useEffect, useState } from 'react';

export default function CameraComparisonModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  // Smooth Apple lifecycle animation (enter and exit)
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      document.body.classList.add('modal-open');
    } else if (isMounted) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
        document.body.classList.remove('modal-open');
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted && !isOpen) return null;

  return (
    <div
      className={`camera-modal-backdrop ${isClosing ? 'is-closing' : 'is-open'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="camera-modal-title"
    >
      <div
        className="camera-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="camera-modal-close"
          onClick={onClose}
          aria-label="Cerrar modal de comparativa de cámaras"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div>
          <span className="highlight-eyebrow orange font-samsung-bold">
            Fotografía ProVisual
          </span>
          <h3 id="camera-modal-title" className="font-samsung-sharp" style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>
            Comparar sistema de cámaras del Galaxy S24 Ultra
          </h3>
          <p className="font-samsung-one" style={{ color: '#8e8e93', fontSize: '15px' }}>
            Un ecosistema de lentes impulsado por inteligencia artificial con el motor ProVisual Engine para capturar luz, texturas y zoom en cualquier distancia.
          </p>
        </div>

        <div className="camera-grid">
          {/* Cámara 1 */}
          <div className="camera-card">
            <div className="camera-card-tag font-samsung-bold">Gran Angular Principal</div>
            <div className="camera-card-mp font-samsung-sharp">200 MP</div>
            <div className="camera-card-type font-samsung-bold">Sensor ProVisual f/1.7 · OIS</div>
            <p className="camera-card-desc font-samsung-one">
              Procesa millones de píxeles con IA para extraer texturas hiperrealistas incluso con poca luz, con zoom 2x de calidad óptica sin pérdida.
            </p>
          </div>

          {/* Cámara 2 */}
          <div className="camera-card">
            <div className="camera-card-tag font-samsung-bold">Teleobjetivo Periscópico</div>
            <div className="camera-card-mp font-samsung-sharp">50 MP</div>
            <div className="camera-card-type font-samsung-bold">Zoom Óptico 5x · Calidad 10x</div>
            <p className="camera-card-desc font-samsung-one">
              Lente periscópica con estabilización OIS de ángulo ampliado. Captura rostros nítidos y detalles lejanos con fidelidad asombrosa.
            </p>
          </div>

          {/* Cámara 3 */}
          <div className="camera-card">
            <div className="camera-card-tag font-samsung-bold">Teleobjetivo Retrato</div>
            <div className="camera-card-mp font-samsung-sharp">10 MP</div>
            <div className="camera-card-type font-samsung-bold">Zoom Óptico 3x · f/2.4</div>
            <p className="camera-card-desc font-samsung-one">
              Distancia focal clásica de 70 mm diseñada específicamente para retratos humanos y de mascotas con desenfoque de fondo cinematográfico.
            </p>
          </div>

          {/* Cámara 4 */}
          <div className="camera-card">
            <div className="camera-card-tag font-samsung-bold">Ultra Gran Angular</div>
            <div className="camera-card-mp font-samsung-sharp">12 MP</div>
            <div className="camera-card-type font-samsung-bold">120° FOV · f/2.2 · Macro</div>
            <p className="camera-card-desc font-samsung-one">
              Visión panorámica expansiva con corrección de distorsión en bordes y modo macro para fotografiar detalles microscópicos a centímetros de distancia.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '28px', padding: '18px 22px', borderRadius: '18px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="font-samsung-bold" style={{ color: '#fff', fontSize: '15px' }}>
              Space Zoom 100x asistido por IA
            </div>
            <div className="font-samsung-one" style={{ color: '#8e8e93', fontSize: '13px' }}>
              Alineación multi-frame con aprendizaje automático para fotos lejanas y fotografía lunar.
            </div>
          </div>
          <a
            href="https://wa.me/18095550199?text=Hola%20Teknik%20Mobile%2C%20quiero%20conocer%20m%C3%A1s%20detalles%20de%20la%20c%C3%A1mara%20del%20S24%20Ultra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-card-whatsapp font-samsung-bold"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
