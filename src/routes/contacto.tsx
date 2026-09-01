import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y asesoría técnica | dieselgarcia.com" },
      {
        name: "description",
        content:
          "Escríbenos para identificar tu referencia diésel: email, teléfono, horario y ubicación del almacén.",
      },
      { property: "og:title", content: "Contacto | dieselgarcia.com" },
      {
        property: "og:description",
        content: "Asesoría técnica diésel por email o teléfono, de lunes a sábado.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const { notify } = useCart();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">Hablemos de tu motor</h1>
        <p className="mt-3 text-muted-foreground">
          Envíanos la matrícula o el número de bastidor y te confirmamos la referencia exacta
          antes de comprar.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* Formulario */}
        <Reveal>
          <form
            className="surface-card p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              notify("Mensaje enviado (simulado). Te respondemos en 24 h.");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Formulario de contacto
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nombre" className="mb-1.5 block text-sm font-medium">
                  Nombre
                </label>
                <input id="c-nombre" required placeholder="Tu nombre" className="field-input" />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="field-input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="c-msg"
                  rows={6}
                  required
                  placeholder="Modelo, motorización y síntoma..."
                  className="field-input resize-y"
                />
              </div>
            </div>
            <button type="submit" className="btn-base btn-cta mt-6 w-full py-3.5 text-lg sm:w-auto">
              <Send className="h-4 w-4" /> Enviar mensaje
            </button>
            {sent && (
              <p className="mt-4 text-sm font-medium text-success">
                Mensaje registrado en la demo. Ningún dato se ha enviado realmente.
              </p>
            )}
          </form>
        </Reveal>

        {/* Datos + mapa simulado */}
        <Reveal delay={120} className="space-y-4">
          <ul className="surface-card space-y-5 p-6">
            {[
              { icon: Mail, t: "Email", d: "soporte@dieselgarcia.com" },
              { icon: Phone, t: "Teléfono", d: "+34 910 000 000" },
              { icon: Clock, t: "Horario", d: "L-V 8:00-19:00 · S 9:00-14:00" },
              { icon: MapPin, t: "Almacén", d: "Pol. Ind. Las Fraguas, 14 · Madrid" },
            ].map((item) => (
              <li key={item.t} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-foreground">{item.t}</p>
                  <p className="text-sm text-muted-foreground">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div
            aria-label="Mapa simulado de la ubicación"
            className="surface-card relative grid h-56 place-items-center overflow-hidden gradient-hero"
          >
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(oklch(1_0_0/0.5)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.5)_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="relative text-center text-primary-foreground">
              <MapPin className="mx-auto h-9 w-9 text-accent" />
              <p className="mt-2 font-display text-xl font-semibold">Madrid · Las Fraguas</p>
              <p className="text-sm text-primary-foreground/70">Mapa de demostración</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
