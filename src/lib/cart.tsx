import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./products";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  notice: string | null;
  notify: (message: string) => void;
}

const CartContext = createContext<CartApi | null>(null);

/** Carrito simulado en memoria: no persiste ni envía datos reales. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([
    { product: PRODUCTS[2]!, qty: 2 },
    { product: PRODUCTS[0]!, qty: 1 },
  ]);
  const [notice, setNotice] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  }, []);

  const add = useCallback(
    (product: Product, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { product, qty }];
      });
      notify(`"${product.name}" añadido al carrito (simulado)`);
    },
    [notify],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.product.id === id ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal > 250 ? 0 : 9.95;
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      setQty,
      remove,
      clear,
      notice,
      notify,
    };
  }, [lines, add, setQty, remove, clear, notice, notify]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartToast message={notice} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

function CartToast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-100 w-[min(92vw,26rem)] -translate-x-1/2 rounded-xl bg-primary-deep px-4 py-3 text-center text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] animate-in fade-in slide-in-from-bottom-4"
    >
      {message}
    </div>
  );
}
