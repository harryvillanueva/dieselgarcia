import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-diesel.jpg";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "dieselgarcia.com | Recambio diésel de alto rendimiento" },
      {
        name: "description",
        content:
          "Inyectores, turbos, filtros y lubricantes diésel con garantía de taller y envío en 24-48 h.",
      },
      { property: "og:title", content: "dieselgarcia.com | Recambio diésel" },
      {
        property: "og:description",
        content: "Piezas diésel probadas en banco: inyección, turbos, filtros y refrigeración.",
      },
    ],
  }),
  component: Index,
});

const CATEGORY_COPY: Record<string, string> = {
  Inyección: "Inyectores y bombas calibradas en banco",
  Turbos: "Geometría variable y kits de montaje",
  Filtros: "Combustible, aire y aceite",
  Encendido: "Bujías de precalentamiento cerámicas",
  Lubricantes: "Sintéticos low-SAPS para DPF",
  Refrigeración: "EGR, intercoolers y radiadores",
};

function Index() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Turbo e inyectores diésel sobre fondo azul industrial"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/95 via-primary-deep/80 to-primary/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36">
          <div className="max-w-2xl">
            <span className="badge-offer">Envío 24/48h en península</span>
            <h1 className="mt-5 text-5xl font-bold leading-[0.95] text-primary-foreground md:text-7xl">
              Potencia diésel sin
              <span className="text-accent"> compromisos</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
              Inyección, turbos y refrigeración probados pieza a pieza en banco. La misma
              exigencia del taller, ahora en tu puerta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/tienda" className="btn-base btn-cta px-8 py-3.5 text-lg">
                Explorar Tienda <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contacto" className="btn-base btn-ghost-light px-7 py-3.5 text-lg">
                Asesoría técnica
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Garantía 24 meses", d: "En toda la inyección y turbos" },
            { icon: Truck, t: "Envío exprés", d: "Pedidos antes de las 17:00" },
            { icon: Wrench, t: "Soporte de taller", d: "Técnicos diésel reales" },
          ].map((f, i) => (
            <Reveal as="li" key={f.t} delay={i * 90}>
              <div className="surface-card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <f.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-foreground">{f.t}</p>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Productos destacados */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Productos destacados
            </h2>
            <p className="mt-2 text-muted-foreground">
              Lo más vendido este mes entre talleres y flotas.
            </p>
          </div>
          <Link to="/tienda" className="btn-base btn-outline">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Categorías</h2>
          <p className="mt-2 text-muted-foreground">Encuentra la pieza por sistema del motor.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat} delay={i * 70}>
              <Link
                to="/tienda"
                search={{ cat }}
                className="surface-card group flex items-center justify-between gap-4 p-6"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-semibold text-primary">{cat}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{CATEGORY_COPY[cat]}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
