"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { calculateMortgage, cn, formatPrice } from "@/lib/utils";

interface MortgageCalculatorProps {
  price: number;
  currency?: "USD" | "DOP";
  className?: string;
}

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-cream px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent-dark";

export function MortgageCalculator({
  price,
  currency = "USD",
  className,
}: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const downPayment = useMemo(() => price * (downPaymentPct / 100), [price, downPaymentPct]);

  const monthlyPayment = useMemo(
    () => calculateMortgage(price, downPayment, rate, years),
    [price, downPayment, rate, years]
  );

  return (
    <div className={cn("rounded-2xl border border-black/[0.06] bg-white p-6", className)}>
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-accent-dark" />
        <h3 className="font-serif text-xl font-semibold text-ink">Calculadora hipotecaria</h3>
      </div>
      <p className="mt-1 text-[13px] text-muted">
        Estima tu cuota mensual según el precio de la propiedad.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold text-muted">
            Precio de la propiedad
          </label>
          <p className="rounded-xl bg-cream px-3 py-2.5 text-[15px] font-semibold text-ink">
            {formatPrice(price, currency)}
          </p>
        </div>

        <div>
          <label htmlFor="down-payment" className="mb-1.5 flex justify-between text-[12px] font-semibold text-muted">
            <span>Inicial</span>
            <span>{downPaymentPct}% · {formatPrice(downPayment, currency)}</span>
          </label>
          <input
            id="down-payment"
            type="range"
            min={10}
            max={50}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-accent-dark"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rate" className="mb-1.5 block text-[12px] font-semibold text-muted">
              Tasa anual (%)
            </label>
            <input
              id="rate"
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="years" className="mb-1.5 block text-[12px] font-semibold text-muted">
              Plazo (años)
            </label>
            <select
              id="years"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className={inputClass}
            >
              {[10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>
                  {y} años
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-ink p-5 text-white">
        <p className="text-[12px] font-medium uppercase tracking-wider text-white/70">
          Cuota mensual estimada
        </p>
        <p className="mt-1 font-serif text-3xl font-semibold">
          {formatPrice(Math.round(monthlyPayment), currency)}
        </p>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-light">
        * Este cálculo es referencial y no constituye una oferta de financiamiento. Las
        condiciones reales dependen de la entidad bancaria, historial crediticio y otros
        factores. Consulta con un asesor para obtener cotizaciones precisas.
      </p>
    </div>
  );
}
