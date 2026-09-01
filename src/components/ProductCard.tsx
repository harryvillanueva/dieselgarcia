import { Link } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="surface-card group flex flex-col overflow-hidden">
      <Link
        to="/producto/$id"
        params={{ id: product.id }}
        className="zoom-media relative block bg-secondary"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover"
        />
        {product.oldPrice && <span className="badge-offer absolute left-3 top-3">Oferta</span>}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-tight text-foreground">
          <Link to="/producto/$id" params={{ id: product.id }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {product.rating.toFixed(1)} · {product.brand}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            className="btn-base btn-cta shrink-0 px-4 py-2 text-base"
          >
            <Plus className="h-4 w-4" /> Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
