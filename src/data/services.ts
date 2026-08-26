import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc_001",
    title: "Compra y venta",
    description:
      "Asesoría integral en la compra o venta de casas, apartamentos, villas y terrenos en todo el territorio dominicano.",
    icon: "home",
    href: "/servicios/compra-venta",
  },
  {
    id: "svc_002",
    title: "Alquileres",
    description:
      "Gestión de alquileres residenciales y corporativos. Conectamos propietarios e inquilinos con contratos seguros y transparentes.",
    icon: "key",
    href: "/servicios/alquileres",
  },
  {
    id: "svc_003",
    title: "Inversión inmobiliaria",
    description:
      "Análisis de mercado, proyecciones de rendimiento y acceso a proyectos exclusivos para inversionistas locales e internacionales.",
    icon: "trending-up",
    href: "/servicios/inversion",
  },
  {
    id: "svc_004",
    title: "Proyectos en preventa",
    description:
      "Acceso anticipado a desarrollos nuevos con precios preferenciales. Acompañamiento desde la reserva hasta la entrega de llaves.",
    icon: "building-2",
    href: "/servicios/preventa",
  },
  {
    id: "svc_005",
    title: "Tasación de propiedades",
    description:
      "Valuaciones profesionales certificadas para compraventa, sucesiones, garantías hipotecarias y fines legales.",
    icon: "calculator",
    href: "/servicios/tasacion",
  },
  {
    id: "svc_006",
    title: "Propiedades comerciales",
    description:
      "Locales comerciales, oficinas corporativas, naves industriales y terrenos para desarrollo empresarial.",
    icon: "briefcase",
    href: "/servicios/comercial",
  },
  {
    id: "svc_007",
    title: "Administración de propiedades",
    description:
      "Gestión de alquileres vacacionales y residenciales: cobro de rentas, mantenimiento, reportes y atención al inquilino.",
    icon: "settings",
    href: "/servicios/administracion",
  },
  {
    id: "svc_008",
    title: "Asesoría legal inmobiliaria",
    description:
      "Red de abogados especializados en derecho inmobiliario para due diligence, contratos y transferencias de título.",
    icon: "scale",
    href: "/servicios/asesoria-legal",
  },
];
