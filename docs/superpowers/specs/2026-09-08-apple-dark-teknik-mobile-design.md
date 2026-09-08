# Diseño del Sitio Web Teknik Mobile: Experiencia Dark Apple con Tipografía Samsung

**Fecha:** 2026-09-08  
**Estado:** Validado con el usuario  
**Alcance:** Hero Cinemático, Sección "Mira lo más destacado" (Highlights Interactivos) y Catálogo de Dispositivos con Cards Cinemáticas Premium.

---

## 1. Contexto y Objetivos

Teknik Mobile es una tienda de teléfonos inteligentes y tecnología con base en República Dominicana. El objetivo de este proyecto es elevar la experiencia digital de la tienda a un nivel de buque insignia internacional, fusionando:
1. **Estética Minimalista Dark de Apple:** Fondo negro profundo (`#000000`), iluminación de borde especular, tarjetas tipo bento redondeadas, micro-animaciones fluidas y controles en forma de pastilla (*pill buttons*).
2. **Tipografía Oficial de Samsung:**
   * **Samsung Sharp Sans Bold (700):** Títulos de alto impacto visual y encabezados principales.
   * **SamsungOne Regular (400):** Párrafos, descripciones y especificaciones.
   * **SamsungOne Bold (700):** Botones, precios en RD$, selectores de almacenamiento y etiquetas destacadas.
3. **Videos Cinemáticos Nativos:** Implementación de los videos WebM en la raíz del proyecto (`galaxy-s24-ultra-highlights-form-factor.webm` para escritorio y `galaxy-s24-ultra-highlights-form-factor-mo.webm` para móvil).
4. **Highlights Interactivos (Inspirados en las referencias de Apple & Samsung):**
   * *Titanio para resistirlo todo* (borde de titanio satinado).
   * *Elegante. Resistente. Impactante.* (vista superior de cámaras y S-Pen).
   * *Mira lo más destacado.* (carrusel con control de progreso e icono de play/pausa).
   * *Cámaras: Este zoom va a llegar muy lejos.* (con modal de comparación de sensores).
5. **Catálogo Cinemático:**
   * Tarjetas oscuras premium para Samsung Galaxy y Apple iPhone con precios en pesos dominicanos (RD$), selectores de color y capacidad, y cotización directa por WhatsApp.

---

## 2. Arquitectura de Tipografía y Diseño

### 2.1 Carga de Fuentes Samsung
Se configurarán las fuentes mediante reglas `@font-face` con fuentes webfont confiables y fallbacks consistentes:
* **Samsung Sharp Sans Bold:**
  * `font-family: 'SamsungSharpSans', 'Inter', -apple-system, sans-serif;`
  * `font-weight: 700;`
* **SamsungOne Regular:**
  * `font-family: 'SamsungOne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
  * `font-weight: 400;`
* **SamsungOne Bold:**
  * `font-family: 'SamsungOne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
  * `font-weight: 700;`

### 2.2 Tokens de Diseño
* **Color de fondo base:** `#000000` (negro puro OLED).
* **Superficies elevadas:** `#09090d`, `#111117`, `#181822`.
* **Bordes y acentos:** `rgba(255, 255, 255, 0.08)` a `rgba(255, 255, 255, 0.16)`.
* **Acentos de marca:** Blanco titanio (`#f5f5f7`), Gris titanio (`#86868b`), Naranja cámara (`#ff6900`), Azul acento (`#2997ff`) y Verde WhatsApp (`#25d366`).
* **Radios de curvatura:** `9999px` para pastillas, `24px` a `32px` para tarjetas bento.

---

## 3. Especificación de Componentes

### 3.1 `FloatingPillNavbar.jsx`
* Barra de navegación flotante centrada con efecto cristal (`backdrop-filter: blur(20px)`).
* Enlaces dinámicos a las secciones: `#top` (Inicio), `#highlights` (Destacados), `#catalogo` (Catálogo), `#contacto` (WhatsApp).
* Soporte para menú móvil en pantallas pequeñas.

### 3.2 `HeroCinematic.jsx`
* Contenedor de altura completa (`min-h-screen` o `100svh`) con video cinemático WebM nativo.
* `<video>` con atributos: `autoPlay`, `muted`, `loop`, `playsInline`.
* `<source>` dual:
  * Móvil: `galaxy-s24-ultra-highlights-form-factor-mo.webm` con media query `(max-width: 768px)`.
  * Escritorio: `galaxy-s24-ultra-highlights-form-factor.webm`.
* Botón flotante discreto en esquina inferior derecha para pausar/reanudar video con icono play/pause.
* Copia y contenido:
  * Píldora de estado: *"Flagship 2024 · Disponible en República Dominicana"*.
  * Título principal: *"Samsung Galaxy S24 Ultra"* y *"La era de Galaxy AI está en Teknik Mobile."*
  * Subtítulo: *"Titanio aeroespacial, cámara de 200 MP y el poder de Snapdragon 8 Gen 3 for Galaxy con garantía local en RD."*
  * CTAs:
    * Botón primario: *"Consultar por WhatsApp"* (abre WhatsApp directo con consulta prellenada).
    * Botón secundario: *"Ver destacados"* (hace scroll suave hacia `#highlights`).

### 3.3 `HighlightsSection.jsx` ("Mira lo más destacado")
* Encabezado con título *"Mira lo más destacado."* en `SamsungSharpSans` Bold 700.
* Barra de estado interactiva:
  * Indicadores en píldora activa con animación de progreso.
  * Botón circular oscuro de reproducción/pausa de auto-rotación.
* Tarjetas del carrusel:
  1. **Titanio:** Imagen de macro del bisel de titanio. Titular: *"Titanio para resistirlo todo"*. Texto de durabilidad y ligereza con marco de titanio grado aeroespacial.
  2. **Diseño y S-Pen:** Perspectiva superior de cámaras y S-Pen extraído. Titular: *"Elegante. Resistente. Impactante."*.
  3. **Cámaras Pro:** Etiqueta naranja *"Cámaras"*. Titular: *"Este zoom va a llegar muy lejos."*. Macro del sensor de 200 MP. Botón píldora *"Comparar cámaras (+)"* que activa el modal.
  4. **Potencia y Batería:** Chip Snapdragon 8 Gen 3 con cámara de vapor. Titular: *"Rendimiento a toda máquina. Extraordinaria autonomía."*.

### 3.4 `CameraComparisonModal.jsx`
* Diálogo accesible modal (`role="dialog"`, `aria-modal="true"`) con cierre al presionar `Escape` o clic en el backdrop.
* Muestra la comparativa técnica de las 4 cámaras del Galaxy S24 Ultra:
  * 12 MP Ultra Gran Angular (120° FOV).
  * 200 MP Gran Angular (Sensor ProVisual con OIS 2x).
  * 50 MP Teleobjetivo periscópico (Zoom óptico 5x y calidad óptica 10x).
  * 10 MP Teleobjetivo (Zoom óptico 3x).
  * 100 MP Space Zoom con procesamiento asistido por IA.

### 3.5 `CatalogSection.jsx` ("Dispositivos Disponibles")
* Encabezado: *"Modelos disponibles en Teknik Mobile"* con selector de filtro:
  * `Todos`
  * `Samsung Galaxy`
  * `Apple iPhone`
* Cuadrícula de tarjetas cinemáticas oscuras:
  * Imagen de alta resolución del equipo sobre fondo oscuro.
  * Selector de color interactivo con nombre del color reflejado.
  * Selector de almacenamiento (ej. 256GB / 512GB / 1TB).
  * Precio dinámico en pesos dominicanos (RD$) y referencia en USD.
  * Botón directo *"Cotizar por WhatsApp"* con mensaje específico del modelo y configuración seleccionada.
* Modelos iniciales provistos en `src/config/catalogData.js`:
  * **Samsung Galaxy S24 Ultra** (Titanium Gray, Black, Violet).
  * **Samsung Galaxy S24+** (Onyx Black, Marble Gray, Cobalt Violet).
  * **Apple iPhone 16 Pro Max** (Desert Titanium, Natural Titanium, Black Titanium).
  * **Apple iPhone 16 Pro** (Natural Titanium, White Titanium).
  * **Apple iPhone 15 Pro** (Blue Titanium, Natural Titanium).

### 3.6 `Footer.jsx`
* Identidad de Teknik Mobile en República Dominicana.
* Horarios de atención, envíos a Santo Domingo y todo el país.
* Botón de WhatsApp flotante y enlaces directos de contacto.

---

## 4. Plan de Pruebas y Criterios de Aceptación
1. **Video Responsivo:** El video desktop se reproduce en pantallas de escritorio y el video móvil en dispositivos móviles sin parpadeos ni bloqueos de autoplay.
2. **Control de Video:** El botón flotante pausa y reproduce el video correctamente.
3. **Fuentes Samsung:** Las tres variantes tipográficas se aplican correctamente a los elementos definidos sin layout shift brusco.
4. **Highlights:** El carrusel permite cambiar manualmente entre diapositivas, pausar la rotación y abrir la comparativa de cámaras.
5. **Catálogo:** Los filtros alternan instantáneamente entre marcas, el selector de almacenamiento actualiza el precio y el botón de WhatsApp genera la URL correcta con mensaje preconfigurado.
6. **Rendimiento:** 60fps constantes en animaciones y transiciones suaves en navegadores modernos.
