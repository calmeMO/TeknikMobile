/**
 * Catalog Data for Teknik Mobile
 * Phones available in Dominican Republic with pricing in RD$ and USD reference.
 */

export const catalogProducts = [
  {
    id: "galaxy-s24-ultra",
    brand: "samsung",
    brandLabel: "Samsung Galaxy",
    name: "Galaxy S24 Ultra",
    tagline: "El pináculo de la innovación: titanio aeroespacial, cámara de 200 MP y Galaxy AI.",
    badge: "Insignia 2024",
    image: "/images/product-s24ultra.jpg",
    colors: [
      { name: "Gris Titanio", hex: "#7a7771" },
      { name: "Negro Titanio", hex: "#2c2b2e" },
      { name: "Violeta Titanio", hex: "#524b5d" },
      { name: "Amarillo Titanio", hex: "#c9be9b" }
    ],
    storageOptions: [
      { capacity: "256 GB", priceDOP: 67900, priceUSD: 1150 },
      { capacity: "512 GB", priceDOP: 74900, priceUSD: 1270 },
      { capacity: "1 TB", priceDOP: 84900, priceUSD: 1440 }
    ],
    specs: [
      { label: "Pantalla", value: "6.8\" QHD+ AMOLED 120Hz" },
      { label: "Cámara Pro", value: "200 MP + Zoom 100x" },
      { label: "Procesador", value: "Snapdragon 8 Gen 3" },
      { label: "Batería", value: "5,000 mAh · Carga 45W" }
    ]
  },
  {
    id: "iphone-16-pro-max",
    brand: "apple",
    brandLabel: "Apple iPhone",
    name: "iPhone 16 Pro Max",
    tagline: "Diseño en titanio de grado 5, Control de Cámara y la potencia del Chip A18 Pro.",
    badge: "Lo más nuevo",
    image: "/images/product-iphone16pro.jpg",
    colors: [
      { name: "Titanio Desierto", hex: "#b59e87" },
      { name: "Titanio Natural", hex: "#8c8780" },
      { name: "Titanio Blanco", hex: "#e2e1dc" },
      { name: "Titanio Negro", hex: "#323031" }
    ],
    storageOptions: [
      { capacity: "256 GB", priceDOP: 76900, priceUSD: 1300 },
      { capacity: "512 GB", priceDOP: 84900, priceUSD: 1440 },
      { capacity: "1 TB", priceDOP: 94900, priceUSD: 1610 }
    ],
    specs: [
      { label: "Pantalla", value: "6.9\" Super Retina XDR" },
      { label: "Cámaras", value: "48 MP Fusión + 5x Tele" },
      { label: "Chip", value: "A18 Pro (Apple Intelligence)" },
      { label: "Batería", value: "Hasta 33 hrs de video" }
    ]
  },
  {
    id: "galaxy-s24-plus",
    brand: "samsung",
    brandLabel: "Samsung Galaxy",
    name: "Galaxy S24+",
    tagline: "Pantalla QHD+ inmersiva, marcos de Armor Aluminum y todo el ecosistema Galaxy AI.",
    badge: "Recomendado",
    image: "/images/product-s24ultra.jpg",
    colors: [
      { name: "Negro Ónix", hex: "#232325" },
      { name: "Gris Mármol", hex: "#8d8e92" },
      { name: "Violeta Cobalto", hex: "#4e4c63" }
    ],
    storageOptions: [
      { capacity: "256 GB", priceDOP: 51900, priceUSD: 880 },
      { capacity: "512 GB", priceDOP: 57900, priceUSD: 980 }
    ],
    specs: [
      { label: "Pantalla", value: "6.7\" QHD+ AMOLED 120Hz" },
      { label: "Cámara", value: "50 MP Triple Cámara" },
      { label: "Procesador", value: "Exynos 2400 / Snapdragon" },
      { label: "Batería", value: "4,900 mAh" }
    ]
  },
  {
    id: "iphone-16-pro",
    brand: "apple",
    brandLabel: "Apple iPhone",
    name: "iPhone 16 Pro",
    tagline: "El equilibrio perfecto entre ergonomía compacta de 6.3\", titanio y cámaras de estudio.",
    badge: "Pro",
    image: "/images/product-iphone16pro.jpg",
    colors: [
      { name: "Titanio Natural", hex: "#8c8780" },
      { name: "Titanio Desierto", hex: "#b59e87" },
      { name: "Titanio Negro", hex: "#323031" }
    ],
    storageOptions: [
      { capacity: "128 GB", priceDOP: 66900, priceUSD: 1130 },
      { capacity: "256 GB", priceDOP: 71900, priceUSD: 1220 },
      { capacity: "512 GB", priceDOP: 79900, priceUSD: 1350 }
    ],
    specs: [
      { label: "Pantalla", value: "6.3\" Super Retina XDR" },
      { label: "Cámaras", value: "48 MP + Zoom óptico 5x" },
      { label: "Chip", value: "A18 Pro" },
      { label: "Batería", value: "Hasta 27 hrs de video" }
    ]
  },
  {
    id: "iphone-15-pro",
    brand: "apple",
    brandLabel: "Apple iPhone",
    name: "iPhone 15 Pro",
    tagline: "El primer iPhone forjado en titanio aeroespacial con botón de Acción y Chip A17 Pro.",
    badge: "Excelente Valor",
    image: "/images/product-iphone16pro.jpg",
    colors: [
      { name: "Titanio Natural", hex: "#8c8780" },
      { name: "Titanio Azul", hex: "#2b3648" },
      { name: "Titanio Negro", hex: "#2e2d30" }
    ],
    storageOptions: [
      { capacity: "128 GB", priceDOP: 53900, priceUSD: 915 },
      { capacity: "256 GB", priceDOP: 58900, priceUSD: 1000 }
    ],
    specs: [
      { label: "Pantalla", value: "6.1\" ProMotion 120Hz" },
      { label: "Cámaras", value: "48 MP + 3x Telefoto" },
      { label: "Chip", value: "A17 Pro Bionic" },
      { label: "Conector", value: "USB-C 10 Gbps" }
    ]
  },
  {
    id: "pixel-9-pro-xl",
    brand: "pixel",
    brandLabel: "Google Pixel",
    name: "Pixel 9 Pro XL",
    tagline: "El mejor sistema fotográfico computacional del mercado impulsado por Google Tensor G4 y Gemini.",
    badge: "Fotografía Pro",
    image: "/images/product-pixel9pro.jpg",
    colors: [
      { name: "Obsidian", hex: "#222326" },
      { name: "Porcelain", hex: "#f1f0eb" },
      { name: "Hazel", hex: "#83897f" }
    ],
    storageOptions: [
      { capacity: "128 GB", priceDOP: 59900, priceUSD: 1015 },
      { capacity: "256 GB", priceDOP: 65900, priceUSD: 1115 },
      { capacity: "512 GB", priceDOP: 73900, priceUSD: 1250 }
    ],
    specs: [
      { label: "Pantalla", value: "6.8\" Super Actua LTPO" },
      { label: "Cámaras", value: "50 MP + 48 MP 5x Zoom" },
      { label: "Procesador", value: "Google Tensor G4" },
      { label: "Batería", value: "5,060 mAh · 37W" }
    ]
  },
  {
    id: "accesorios-pro-pack",
    brand: "accesorios",
    brandLabel: "Accesorios",
    name: "Kit de Carga Rápida & Audio Pro",
    tagline: "Cargador GaN 45W ultrarrápido, pad inalámbrico magnético y auriculares Hi-Fi de alta fidelidad.",
    badge: "Esenciales",
    image: "/images/product-accessories.jpg",
    colors: [
      { name: "Negro Mate", hex: "#1e1e22" },
      { name: "Blanco Puro", hex: "#f3f3f5" }
    ],
    storageOptions: [
      { capacity: "Kit Esencial", priceDOP: 3890, priceUSD: 65 },
      { capacity: "Kit Pro Ultra", priceDOP: 6490, priceUSD: 110 }
    ],
    specs: [
      { label: "Potencia", value: "Carga 45W GaN Dual" },
      { label: "Compatibilidad", value: "Samsung, iPhone & Pixel" },
      { label: "Conexión", value: "USB-C Power Delivery" },
      { label: "Garantía", value: "1 año local en RD" }
    ]
  }
];

/**
 * Formats a number to Dominican Pesos: e.g. "RD$ 67,900"
 */
export function formatDOP(amount) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    maximumFractionDigits: 0
  }).format(amount).replace('DOP', 'RD$');
}

/**
 * Builds direct WhatsApp URL for product consultation in RD
 */
export function buildProductWhatsAppUrl(product, selectedColor, selectedStorage, storePhone = "") {
  const phone = storePhone || "18090000000"; // fallback generic RD number or siteConfig
  const msg = `Hola Teknik Mobile, estoy interesado en el ${product.name} (${selectedColor.name}, ${selectedStorage.capacity}) por ${formatDOP(selectedStorage.priceDOP)}. ¿Tienen disponibilidad en tienda y envíos en RD?`;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}
