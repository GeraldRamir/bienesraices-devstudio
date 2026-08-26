export const SITE = {
  name: "Horizon Bienes Raíces",
  tagline: "Tu próximo hogar, con confianza y exclusividad",
  description:
    "Inmobiliaria premium en República Dominicana. Compra, alquiler e inversión en las mejores zonas del país.",
  url: "https://bienesraices.devstudioo.com",
  phone: "+1 (809) 555-0198",
  whatsapp: "18095550198",
  email: "contacto@horizonbienesraices.com",
  address: "Av. Winston Churchill 1099, Piantini, Santo Domingo",
  hours: "Lun – Vie: 9:00 AM – 6:00 PM · Sáb: 9:00 AM – 2:00 PM",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
} as const;

export const CITIES = [
  "Santo Domingo",
  "Punta Cana",
  "Santiago",
  "La Romana",
  "Puerto Plata",
  "Bávaro",
] as const;

export const AMENITY_ICONS: Record<string, string> = {
  Piscina: "pool",
  Gimnasio: "dumbbell",
  "Seguridad 24/7": "shield",
  "Área infantil": "baby",
  Terraza: "sun",
  Balcón: "layout",
  Ascensor: "arrow-up-down",
  "Planta eléctrica": "zap",
  "Área BBQ": "flame",
  Lobby: "building",
  "Acceso controlado": "lock",
  "Vista al mar": "waves",
};
