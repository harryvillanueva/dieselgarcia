import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatPrice, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/tienda")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tienda de recambio diésel | dieselgarcia.com" },
      {
        name: "description",
        content:
          "Catálogo completo de inyectores, turbos, filtros, bujías y lubricantes diésel con filtros por categoría y precio.",
      },
      { property: "og:title", content: "Tienda | dieselgarcia.com" },
      {
        property: "og:description",
        content: "Filtra por categoría, precio y marca para encontrar tu recambio diésel.",
      },
    ],
  }),
  component: Tienda;
});

const BRANDS = ["GarciaTech", "Garcia Performance", "GarciaFilter", "GarciaLub", "Garcia Ignition"];

function Tienda() {
  const { cat } = Route.useSearch();
  const [cats, setCats] = useState<Category[]>(
    CATEGORIES.includes(cat as Category) ? [cat as Category] : [],
  );
  const [maxPrice, setMaxPrice] = useState(700);
  const [brands, setBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        p.price <= maxPrice &&
        (brands.length === 0 || brands.includes(p.brand)),
    );
    if (sort === "precio-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "valoracion") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cats, maxPrice, brands, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">Tienda</h1>
        <p className="mt-2 text-muted-foreground">
          {results.length} productos disponibles · precios con IVA incluido
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Sidebar de filtros */}
        <div>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="btn-base btn-outline mb-4 w-full lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </button>

          <aside
            className={`${showFilters ? "block" : "hidden"} space-y-6 lg:sticky lg:top-24 lg:block`}
            aria-label="Filtros de producto"
          >
            <section className="surface-card p-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Categoría</h2>
              <ul className="mt-3 space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <input
                        type="checkbox"
                        checked={cats.includes(c)}
                        onChange={() => toggle(cats, c, setCats)}
                        className="h-4 w-4 accent-[var(--color-primary)]"
                      />
                      {c}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-card p-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Precio máximo</h2>
              <input
                type="range"
                min={20}
                max={700}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--color-accent)]"
                aria-label="Precio máximo"
              />
              <p className="mt-2 font-display text-lg font-semibold text-primary">
                Hasta {formatPrice(maxPrice)}
              </p>
            </section>

            <section className="surface-card p-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Marca</h2>
              <ul className="mt-3 space-y-2">
                {BRANDS.map((b) => (
                  <li key={b}>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <input
                        type="checkbox"
                        checked={brands.includes(b)}
                        onChange={() => toggle(brands, b, setBrands)}
                        className="h-4 w-4 accent-[var(--color-primary)]"
                      />
                      {b}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="button"
              onClick={() => {
                setCats([]);
                setBrands([]);
                setMaxPrice(700);
              }}
              className="btn-base btn-primary w-full"
            >
              Limpiar filtros
            </button>
          </aside>
        </div>

        {/* Grid de productos */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Mostrando {results.length} de {PRODUCTS.length}
            </p>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Ordenar por
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="field-input w-auto py-2"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="valoracion">Mejor valorados</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <p className="surface-card p-10 text-center text-muted-foreground">
              Ningún producto coincide con los filtros seleccionados.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
