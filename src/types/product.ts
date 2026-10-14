export interface ProductImage {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface ProductAttributes {
  name: string;
  short_desc: string;
  price: string;
  img: ProductImage;
  category?: string;
  /** Optional extra gallery URLs; primary image remains `img`. */
  images?: string[];
}

export interface ToyProduct {
  id: number;
  slug?: string;
  attributes: ProductAttributes;
}

export type ProductCatalog = "stuffed" | "wooden";

export interface CartItem {
  catalog: ProductCatalog;
  productId: number;
  slug: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  category?: string;
}
