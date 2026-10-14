import Stuffedanimals from "../components/proudacts/stuffedToys";
import WoodenToys from "../components/proudacts/woodenToys";
import type { CartItem, ProductCatalog, ToyProduct } from "../types/product";

export function getPrimaryImageUrl(product: ToyProduct): string {
  return product.attributes.img.data.attributes.url;
}

export function getProductGalleryImages(product: ToyProduct): string[] {
  const primary = getPrimaryImageUrl(product);
  const extra = product.attributes.images ?? [];
  const merged = [primary, ...extra.filter((url) => url !== primary)];
  return merged;
}

export function getStuffedProductBySlug(slug: string): ToyProduct | undefined {
  return (Stuffedanimals as ToyProduct[]).find((p) => p.slug === slug);
}

export function getStuffedProductById(id: number): ToyProduct | undefined {
  return (Stuffedanimals as ToyProduct[]).find((p) => p.id === id);
}

export function getRelatedStuffedProducts(
  currentProductId: number,
  limit = 4
): ToyProduct[] {
  return (Stuffedanimals as ToyProduct[])
    .filter((p) => p.id !== currentProductId)
    .slice(0, limit);
}

export function stuffedProductDetailPath(product: ToyProduct): string {
  if (!product.slug) {
    return `/products/stuffed/${product.id}`;
  }
  return `/products/stuffed/${product.slug}`;
}

export function getWoodenProductBySlug(slug: string): ToyProduct | undefined {
  return (WoodenToys as ToyProduct[]).find((p) => p.slug === slug);
}

export function getWoodenProductById(id: number): ToyProduct | undefined {
  return (WoodenToys as ToyProduct[]).find((p) => p.id === id);
}

export function getRelatedWoodenProducts(
  currentProductId: number,
  limit = 4
): ToyProduct[] {
  return (WoodenToys as ToyProduct[])
    .filter((p) => p.id !== currentProductId)
    .slice(0, limit);
}

export function woodenProductDetailPath(product: ToyProduct): string {
  if (!product.slug) {
    return `/products/wooden/${product.id}`;
  }
  return `/products/wooden/${product.slug}`;
}

export function findProductCatalog(product: ToyProduct): ProductCatalog {
  const stuffedMatch = (Stuffedanimals as ToyProduct[]).some(
    (p) =>
      p.id === product.id &&
      (!product.slug || p.slug === product.slug)
  );
  if (stuffedMatch) return "stuffed";

  return "wooden";
}

export function getCartItemDetailPath(item: Pick<CartItem, "catalog" | "productId" | "slug">): string {
  if (item.catalog === "stuffed") {
    return `/products/stuffed/${item.slug || item.productId}`;
  }
  return `/products/wooden/${item.slug || item.productId}`;
}
