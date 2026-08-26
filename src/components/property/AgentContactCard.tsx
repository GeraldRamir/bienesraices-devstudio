"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import type { Agent, Property } from "@/types";
import { cn } from "@/lib/utils";

interface AgentContactCardProps {
  agent: Agent;
  property: Property;
  className?: string;
}

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-cream px-3 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted-light focus:border-accent-dark";

export function AgentContactCard({ agent, property, className }: AgentContactCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hola ${agent.name}, me interesa la propiedad "${property.title}" en ${property.location.sector}, ${property.location.city}. ¿Podrían brindarme más información?`
  );
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hola ${agent.name}, me interesa la propiedad "${property.title}". ${message}`
  );
  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;
  const phoneUrl = `tel:${agent.phone.replace(/\s/g, "")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <aside
      className={cn(
        "sticky top-24 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-ink">{agent.name}</p>
          <p className="text-[13px] text-muted">{agent.role}</p>
          <p className="text-[12px] text-muted-light">{agent.specialty}</p>
        </div>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-xl bg-badge-bg p-4 text-center">
          <p className="font-semibold text-badge-new">¡Mensaje enviado!</p>
          <p className="mt-1 text-[13px] text-muted">
            {agent.name} se pondrá en contacto contigo pronto.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <Field label="Nombre" icon={<User className="h-4 w-4" />}>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className={inputClass}
            />
          </Field>
          <Field label="Email" icon={<Mail className="h-4 w-4" />}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={inputClass}
            />
          </Field>
          <Field label="Teléfono" icon={<Phone className="h-4 w-4" />}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (809) 000-0000"
              className={inputClass}
            />
          </Field>
          <Field label="Mensaje" icon={<MessageCircle className="h-4 w-4" />}>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={cn(inputClass, "resize-none")}
            />
          </Field>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Send className="h-4 w-4" />
            Solicitar información
          </button>
        </form>
      )}

      <div className="mt-4 space-y-2">
        <Link
          href={`/contacto?propiedad=${property.slug}&agente=${agent.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-cream"
        >
          <Calendar className="h-4 w-4" />
          Agendar visita
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={phoneUrl}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-accent-dark py-3 text-[14px] font-semibold text-accent-dark transition-colors hover:bg-badge-bg"
        >
          <Phone className="h-4 w-4" />
          Llamar
        </a>
      </div>
    </aside>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
