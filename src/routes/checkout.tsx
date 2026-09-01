import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, Truck } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar compra | dieselgarcia.com" },
      {
        name: "description",
        content: "Datos de envío y método de pago para completar tu pedido de recambio diésel.",
      },
      { property: "og:title", content: "Checkout | dieselgarcia.com" },
      { property: "og:description", content: "Pago simulado en dos pasos: envío y tarjeta." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, shipping, total } = useCart();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center md:px-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 text-4xl font-bold text-foreground">¡Pedido confirmado!</h1>
        <p className="mt-3 text-muted-foreground">
          Confirmación simulada del pedido <strong>#DG-2049</strong>. Ningún dato ha sido
          procesado ni cobrado.
        </p>
        <Link to="/tienda" className="btn-base btn-cta mt-8">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">Finalizar compra</h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" /> Formulario de demostración: no introduzcas datos reales.
      </p>

      <form
        className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <div className="space-y-6">
          {/* Paso 1 */}
          <section className="surface-card p-6">
            <header className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                1
              </span>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Datos de envío
              </h2>
              <Truck className="ml-auto hidden h-5 w-5 text-muted-foreground sm:block" />
            </header>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" id="nombre" placeholder="Harry" required />
              <Field label="Apellidos" id="apellidos" placeholder="García" required />
              <Field
                label="Email"
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="sm:col-span-2"
              />
              <Field label="Teléfono" id="tel" placeholder="600 000 000" />
              <Field label="Código postal" id="cp" placeholder="28001" required />
              <Field
                label="Dirección"
                id="dir"
                placeholder="Calle, número, piso"
                required
                className="sm:col-span-2"
              />
              <Field label="Ciudad" id="ciudad" placeholder="Madrid" required />
              <div>
                <label htmlFor="pais" className="mb-1.5 block text-sm font-medium">
                  País
                </label>
                <select id="pais" className="field-input">
                  <option>España</option>
                  <option>Portugal</option>
                  <option>Francia</option>
                </select>
              </div>
            </div>
          </section>

          {/* Paso 2 */}
          <section className="surface-card p-6">
            <header className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                2
              </span>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Método de pago
              </h2>
              <CreditCard className="ml-auto hidden h-5 w-5 text-muted-foreground sm:block" />
            </header>

            <div className="mt-6 space-y-3">
              {["Tarjeta de crédito o débito", "Transferencia bancaria", "Contra reembolso"].map(
                (m, i) => (
                  <label
                    key={m}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 text-sm transition-colors hover:border-primary-glow"
                  >
                    <input
                      type="radio"
                      name="pago"
                      defaultChecked={i === 0}
                      className="h-4 w-4 accent-[var(--color-primary)]"
                    />
                    <span className="font-medium text-foreground">{m}</span>
                  </label>
                ),
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Número de tarjeta"
                id="tarjeta"
                placeholder="4242 4242 4242 4242"
                className="sm:col-span-2"
              />
              <Field label="Caducidad" id="cad" placeholder="12/29" />
              <Field label="CVC" id="cvc" placeholder="123" />
              <Field
                label="Titular de la tarjeta"
                id="titular"
                placeholder="Como aparece en la tarjeta"
                className="sm:col-span-2"
              />
            </div>
          </section>
        </div>

        {/* Resumen */}
        <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold text-foreground">Tu pedido</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={l.product.id} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-muted-foreground">
                  {l.qty} × {l.product.name}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(l.product.price * l.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío</dt>
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
          <button type="submit" className="btn-base btn-cta mt-6 w-full py-3.5 text-lg">
            Confirmar Pedido
          </button>
          <Link to="/carrito" className="btn-base btn-outline mt-3 w-full">
            Volver al carrito
          </Link>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
  className = "",
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input"
      />
    </div>
  );
}
