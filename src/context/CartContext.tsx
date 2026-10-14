import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCartSubtotal } from "../lib/cartUtils";
import { findProductCatalog, getPrimaryImageUrl } from "../lib/products";
import type { CartItem, ProductCatalog, ToyProduct } from "../types/product";

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  addItem: (product: ToyProduct, quantity?: number, catalog?: ProductCatalog) => void;
  updateItemQuantity: (
    catalog: ProductCatalog,
    productId: number,
    quantity: number
  ) => void;
  removeItem: (catalog: ProductCatalog, productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);

  const addItem = useCallback(
    (product: ToyProduct, quantity = 1, catalog?: ProductCatalog) => {
      const resolvedCatalog = catalog ?? findProductCatalog(product);
      const slug = product.slug ?? String(product.id);
      setItems((prev) => {
        const existing = prev.find(
          (item) =>
            item.catalog === resolvedCatalog && item.productId === product.id
        );
        if (existing) {
          return prev.map((item) =>
            item.catalog === resolvedCatalog && item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            catalog: resolvedCatalog,
            productId: product.id,
            slug,
            name: product.attributes.name,
            price: product.attributes.price,
            imageUrl: getPrimaryImageUrl(product),
            quantity,
            category: product.attributes.category,
          },
        ];
      });
      setDrawerOpen(true);
    },
    []
  );

  const updateItemQuantity = useCallback(
    (catalog: ProductCatalog, productId: number, quantity: number) => {
      setItems((prev) => {
        if (quantity <= 0) {
          return prev.filter(
            (item) =>
              !(
                item.catalog === catalog && item.productId === productId
              )
          );
        }
        return prev.map((item) =>
          item.catalog === catalog && item.productId === productId
            ? { ...item, quantity }
            : item
        );
      });
    },
    []
  );

  const removeItem = useCallback(
    (catalog: ProductCatalog, productId: number) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(item.catalog === catalog && item.productId === productId)
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      subtotal,
      isDrawerOpen,
      setDrawerOpen,
      openDrawer,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      totalQuantity,
      subtotal,
      isDrawerOpen,
      openDrawer,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook paired with provider
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
