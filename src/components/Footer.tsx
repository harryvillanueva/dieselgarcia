import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Youtube, Linkedin, Mail } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Footer() {
  const { notify } = useCart();
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-20 bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-display text-2xl font-bold">
            diesel<span className="text-accent">garcia</span>.com
          </p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            Recambio diésel de alto rendimiento: inyección, turbos y refrigeración con garantía
            de taller.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Tienda">
          <h3 className="text-lg font-semibold">Tienda</h3>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li>
              <Link to="/tienda" className="transition-colors hover:text-accent">
                Todos los productos
              </Link>
            </li>
            <li>
              <Link to="/carrito" className="transition-colors hover:text-accent">
                Mi carrito
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="transition-colors hover:text-accent">
                Pago seguro
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Ayuda">
          <h3 className="text-lg font-semibold">Ayuda</h3>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            <li>
              <Link to="/contacto" className="transition-colors hover:text-accent">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/legal" className="transition-colors hover:text-accent">
                Términos y privacidad
              </Link>
            </li>
            <li>
              <Link
                to="/legal"
                hash="devoluciones"
                className="transition-colors hover:text-accent"
              >
                Devoluciones
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="mt-3 text-sm text-primary-foreground/75">
            Ofertas y novedades técnicas una vez al mes.
          </p>
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              notify("Suscripción simulada. ¡Gracias!");
              setEmail("");
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Correo electrónico
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-md border border-primary-foreground/25 bg-primary-foreground/10 py-2.5 pl-9 pr-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-base btn-cta px-5 py-2.5 text-base">
              Suscribirme
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/60 md:px-6">
        © {new Date().getFullYear()} dieselgarcia.com — Demo visual. Ninguna compra es real.
      </div>
    </footer>
  );
}
