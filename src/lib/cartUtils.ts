import type { CartItem } from "../types/product";

/** Parses display prices like "$30 USD" into a numeric USD amount. */
export function parsePriceUsd(price: string): number {
  const match = price.match(/[\d.]+/);
  return match ? Number.parseFloat(match[0]) : 0;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + parsePriceUsd(item.price) * item.quantity,
    0
  );
}

export function getCartLineId(item: Pick<CartItem, "catalog" | "productId">): string {
  return `${item.catalog}-${item.productId}`;
}
