import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { PRODUCTS, formatPrice, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Producto no disponible" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | dieselgarcia.com` },
        { name: "description", content: product.short },
        { property: "og:title", content: `${product.name} | dieselgarcia.com` },
        { property: "og:description", content: product.short },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="Migas de pan">
        <Link to="/" className="hover:text-primary">
          Inicio
        </Link>
        <span className="px-2">/</span>
        <Link to="/tienda" className="hover:text-primary">
          Tienda
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galería */}
        <div>
          <div className="zoom-media surface-card !hover:translate-y-0 bg-secondary">
            <img
              src={product.images[active]}
              alt={product.name}
              width={900}
              height={900}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`overflow-hidden rounded-xl border-2 bg-secondary transition-colors ${
                  active === i ? "border-accent" : "border-border hover:border-primary-glow"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category} · {product.brand}
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {product.rating.toFixed(1)} · 128 valoraciones
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="font-display text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <>
                <p className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </p>
                <span className="badge-offer">Oferta</span>
              </>
            )}
          </div>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {product.specs.map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Cantidad + CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Reducir cantidad"
                className="grid h-9 w-9 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-lg font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar cantidad"
                className="grid h-9 w-9 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => add(product, qty)}
              className="btn-base btn-cta flex-1 px-8 py-3.5 text-lg sm:flex-none"
            >
              <ShoppingCart className="h-5 w-5" /> Añadir al Carrito
            </button>
          </div>

          <ul className="mt-7 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Envío en 24/48 h, gratis desde 250 €
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Garantía y factura con IVA
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Devolución en 30 días
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground">Productos relacionados</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
