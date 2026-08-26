import {
  Headphones,
  MapPin,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SectionHeader } from "@/components/ui/SectionHeader";

const benefits = [
  {
    icon: UserCheck,
    title: "Asesoría personalizada",
    description: "Cada cliente recibe un agente dedicado que entiende sus necesidades y presupuesto.",
  },
  {
    icon: Users,
    title: "Red de agentes certificados",
    description: "Profesionales con experiencia comprobada en compraventa, alquiler e inversión.",
  },
  {
    icon: Shield,
    title: "Proceso transparente",
    description: "Due diligence legal, contratos claros y seguimiento en cada etapa de la transacción.",
  },
  {
    icon: MapPin,
    title: "Cobertura nacional",
    description: "Presencia en Santo Domingo, Punta Cana, Santiago y las principales ciudades del país.",
  },
  {
    icon: TrendingUp,
    title: "Inversión inteligente",
    description: "Análisis de mercado y proyecciones de rendimiento para maximizar tu patrimonio.",
  },
  {
    icon: Headphones,
    title: "Soporte post-venta",
    description: "Te acompañamos después del cierre con administración, mantenimiento y referencias.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            eyebrow="Por qué elegirnos"
            title="Experiencia inmobiliaria de confianza"
            description="Horizon Bienes Raíces combina conocimiento local, tecnología y un servicio excepcional para hacer realidad tu proyecto."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <div className="hz-hover-feature rounded-[28px] border border-black/[0.06] bg-white p-7">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-badge-bg text-accent-dark">
                  <benefit.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
