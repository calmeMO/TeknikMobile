/**
 * Site Configuration for Teknik Mobile
 * 
 * Keep destinations and contact information in this small module.
 * Start whatsappNumber, catalogUrl, and category URLs empty unless verified values are supplied.
 * Buttons for missing destinations render an honest disabled state with accessible explanations.
 */

export const siteConfig = {
  brandName: "Teknik",
  brandSuffix: "Mobile",
  // WhatsApp number in Dominican Republic (can be customized by owner):
  whatsappNumber: "18095550199", 
  whatsappMessage: "Hola Teknik Mobile, me interesa consultar los celulares disponibles en tienda y envíos en RD.",
  // Catalog anchor:
  catalogUrl: "#catalogo",
  // Category destinations:
  categories: [
    {
      id: "inicio",
      label: "Inicio",
      href: "#top",
      active: true,
      appearClass: "appear--scale",
      delay: "0.16s",
      enabled: true
    },
    {
      id: "destacados",
      label: "Destacados",
      href: "#highlights",
      active: false,
      appearClass: "appear--soft",
      delay: "0.24s",
      enabled: true
    },
    {
      id: "catalogo",
      label: "Catálogo",
      href: "#catalogo",
      active: false,
      appearClass: "appear--scale",
      delay: "0.32s",
      enabled: true
    },
    {
      id: "contacto",
      label: "Contacto RD",
      href: "#contacto",
      active: false,
      appearClass: "appear--soft",
      delay: "0.40s",
      enabled: true
    }
  ]
};

/**
 * Builds the WhatsApp direct chat URL if a verified number exists.
 * Returns null if no number is configured.
 */
export function getWhatsAppUrl() {
  if (!siteConfig.whatsappNumber) return null;
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  const encodedMsg = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${digits}?text=${encodedMsg}`;
}
