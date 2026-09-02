import {
  Headphones,
  MapPin,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeSection } from "./HomeSection";

const benefits = [
  {
    icon: UserCheck,
    title: "Asesoría personalizada",
    description: "Un agente dedicado que entiende tus necesidades, presupuesto y plazos.",
  },
  {
    icon: Users,
    title: "Agentes certificados",
    description: "Profesionales con experiencia comprobada en compraventa, alquiler e inversión.",
  },
  {
    icon: Shield,
    title: "Proceso transparente",
    description: "Due diligence legal, contratos claros y seguimiento en cada etapa.",
  },
  {
    icon: MapPin,
    title: "Cobertura nacional",
    description: "Presencia en Santo Domingo, Punta Cana, Santiago y las principales ciudades.",
  },
  {
    icon: TrendingUp,
    title: "Inversión inteligente",
    description: "Análisis de mercado y proyecciones para maximizar el retorno de tu patrimonio.",
  },
  {
    icon: Headphones,
    title: "Soporte post-venta",
    description: "Acompañamiento después del cierre con administración y referencias confiables.",
  },
];

export function WhyChooseUs() {
  return (
    <HomeSection variant="white">
      <SectionHeader
        eyebrow="Por qué Horizon"
        title="Inmobiliaria de confianza en RD"
        description="Combinamos conocimiento local, tecnología y un servicio excepcional para hacer realidad tu proyecto inmobiliario."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="pf-card p-6">
            <div className="pf-icon-wrap">
              <benefit.icon className="size-5" />
            </div>
            <h3 className="mt-5 text-[16px] font-bold text-ink">{benefit.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{benefit.description}</p>
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
