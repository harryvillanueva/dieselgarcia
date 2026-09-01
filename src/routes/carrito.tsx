import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito de compra | dieselgarcia.com" },
      {
        name: "description",
        content: "Revisa las piezas diésel de tu pedido, ajusta cantidades y consulta el total.",
      },
      { property: "og:title", content: "Carrito | dieselgarcia.com" },
      { property: "og:description", content: "Resumen de tu pedido de recambio diésel." },
    ],
  }),
  component: Carrito,
});

function Carrito() {
  const { lines, setQty, remove, subtotal, shipping, total } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">Carrito de compra</h1>
      <p className="mt-2 text-muted-foreground">
        Simulación visual: no se procesa ningún pago real.
      </p>

      {lines.length === 0 ? (
        <div className="surface-card mt-10 p-12 text-center">
          <p className="font-display text-2xl font-semibold text-foreground">
            Tu carrito está vacío
          </p>
          <p className="mt-2 text-muted-foreground">Añade piezas desde el catálogo.</p>
          <Link to="/tienda" className="btn-base btn-cta mt-6">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* Líneas del pedido */}
          <ul className="space-y-4">
            {lines.map((line) => (
              <li
                key={line.product.id}
                className="surface-card grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-4 p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
              >
                <Link
                  to="/producto/$id"
                  params={{ id: line.product.id }}
                  className="zoom-media rounded-xl bg-secondary"
                >
                  <img
                    src={line.product.images[0]}
                    alt={line.product.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </Link>

                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-semibold text-foreground">
                    {line.product.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {line.product.brand} · {formatPrice(line.product.price)} / ud.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-border p-1">
                      <button
                        type="button"
                        aria-label="Reducir cantidad"
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-display font-semibold">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.product.id)}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" /> Quitar
                    </button>
                  </div>
                </div>

                <p className="col-span-2 text-right font-display text-2xl font-bold text-primary sm:col-span-1">
                  {formatPrice(line.product.price * line.qty)}
                </p>
              </li>
            ))}
          </ul>

          {/* Resumen del pedido */}
          <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Resumen del pedido
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Envío estimado</dt>
                <dd className="font-semibold">
                  {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-display text-lg font-semibold">Total</dt>
                <dd className="font-display text-2xl font-bold text-primary">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn-base btn-cta mt-6 w-full py-3.5 text-lg">
              Proceder al Pago
            </Link>
            <Link to="/tienda" className="btn-base btn-outline mt-3 w-full">
              Seguir comprando
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
