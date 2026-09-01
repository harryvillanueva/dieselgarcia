import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/contacto", label: "Contacto" },
  { to: "/legal", label: "Legal" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:px-6">
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-hero font-display text-lg font-bold text-primary-foreground">
            DG
          </span>
          <span className="min-w-0 truncate font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
            diesel<span className="text-accent-foreground">garcia</span>
            <span className="text-muted-foreground">.com</span>
          </span>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden justify-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-full px-4 py-2 font-display text-base font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            aria-label="Mi cuenta (simulado)"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
          >
            <User className="h-5 w-5" />
          </button>
          <Link
            to="/carrito"
            aria-label="Ver carrito"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-secondary"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 font-display text-xs font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú hamburguesa móvil */}
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="block rounded-lg px-3 py-3 font-display text-lg font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
