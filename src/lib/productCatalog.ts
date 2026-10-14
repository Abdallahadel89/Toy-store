import type { ToyProduct } from "../types/product";
import {
  getStuffedProductById,
  getStuffedProductBySlug,
  getRelatedStuffedProducts,
  stuffedProductDetailPath,
  getWoodenProductById,
  getWoodenProductBySlug,
  getRelatedWoodenProducts,
  woodenProductDetailPath,
} from "./products";

export interface ProductDetailsCatalog {
  breadcrumbLabel: string;
  notFoundLabel: string;
  relatedTitle: string;
  resolveProduct: (param: string | undefined) => ToyProduct | undefined;
  getRelatedProducts: (currentProductId: number) => ToyProduct[];
  getDetailPath: (product: ToyProduct) => string;
}

function resolveFromCatalog(
  param: string | undefined,
  bySlug: (slug: string) => ToyProduct | undefined,
  byId: (id: number) => ToyProduct | undefined
): ToyProduct | undefined {
  if (!param) return undefined;
  const slugMatch = bySlug(param);
  if (slugMatch) return slugMatch;
  const id = Number(param);
  if (!Number.isNaN(id)) return byId(id);
  return undefined;
}

export const stuffedProductCatalog: ProductDetailsCatalog = {
  breadcrumbLabel: "Stuffed Animals",
  notFoundLabel: "stuffed animal",
  relatedTitle: "Related stuffed animals",
  resolveProduct: (param) =>
    resolveFromCatalog(
      param,
      getStuffedProductBySlug,
      getStuffedProductById
    ),
  getRelatedProducts: getRelatedStuffedProducts,
  getDetailPath: stuffedProductDetailPath,
};

export const woodenProductCatalog: ProductDetailsCatalog = {
  breadcrumbLabel: "Wooden Animals",
  notFoundLabel: "wooden toy",
  relatedTitle: "Related wooden toys",
  resolveProduct: (param) =>
    resolveFromCatalog(param, getWoodenProductBySlug, getWoodenProductById),
  getRelatedProducts: getRelatedWoodenProducts,
  getDetailPath: woodenProductDetailPath,
};
