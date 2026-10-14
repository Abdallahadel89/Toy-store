import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/products/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductGalleryImages } from "../lib/products";
import type { ProductDetailsCatalog } from "../lib/productCatalog";

interface ProductDetailsPageProps {
  slugOrId: string | undefined;
  catalog: ProductDetailsCatalog;
}

export default function ProductDetailsPage({
  slugOrId,
  catalog,
}: ProductDetailsPageProps) {
  const product = catalog.resolveProduct(slugOrId);
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 2xl:max-w-screen-2xl">
        <div className="rounded-2xl border bg-card p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-3 text-muted-foreground">
            No {catalog.notFoundLabel} matches &quot;{slugOrId}&quot;.
          </p>
          <Button
            asChild
            className="mt-6 rounded-full bg-gr text-white hover:bg-green-700"
          >
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const galleryImages = getProductGalleryImages(product);
  const mainImage = galleryImages[selectedImageIndex] ?? galleryImages[0];
  const related = catalog.getRelatedProducts(product.id);
  const { name, short_desc, price, category } = product.attributes;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedMessage(`${quantity} × ${name} added to cart`);
    window.setTimeout(() => setAddedMessage(null), 3000);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pt-12 2xl:max-w-screen-2xl">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-gr transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{catalog.breadcrumbLabel}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{name}</span>
      </nav>

      <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-2xl border bg-white p-4 shadow-md">
            <img
              key={mainImage}
              src={mainImage}
              alt={name}
              className="mx-auto max-h-[420px] w-full object-contain transition-opacity duration-300"
            />
          </div>
          {galleryImages.length > 1 && (
            <div
              className="mt-4 flex flex-wrap gap-3"
              role="listbox"
              aria-label="Product images"
            >
              {galleryImages.map((url, index) => (
                <button
                  key={`${url}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === selectedImageIndex}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`rounded-xl border-2 p-2 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gr ${
                    index === selectedImageIndex
                      ? "border-gr shadow-sm"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {category && (
            <p className="text-sm font-medium uppercase tracking-wide text-gr">
              {category}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{name}</h1>
          <p className="mt-4 text-2xl font-semibold">{price}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {short_desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span
                className="min-w-[2.5rem] text-center font-semibold"
                aria-live="polite"
              >
                {quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Button
              type="button"
              className="flex-1 rounded-full bg-gr px-8 py-6 text-base text-white hover:bg-green-700 sm:flex-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>

          {addedMessage && (
            <p
              className="mt-4 rounded-lg border border-gr/30 bg-gr/10 px-4 py-2 text-sm text-foreground"
              role="status"
            >
              {addedMessage}
            </p>
          )}

          <dl className="mt-8 grid gap-3 rounded-xl border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Product ID</dt>
              <dd className="font-medium">{product.id}</dd>
            </div>
            {product.slug && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="font-medium uppercase">{product.slug}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold">About this toy</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {short_desc}
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t pt-12">
          <h2 className="mb-8 text-2xl font-bold">{catalog.relatedTitle}</h2>
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center">
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                detailPath={catalog.getDetailPath(relatedProduct)}
                onAddToCart={(p) => addItem(p, 1)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
