import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { getPrimaryImageUrl } from "../../lib/products";
import type { ToyProduct } from "../../types/product";

interface ProductCardProps {
  product: ToyProduct;
  /** When set, image and title link to the product details page. */
  detailPath?: string;
  onAddToCart?: (product: ToyProduct) => void;
}

export default function ProductCard({
  product,
  detailPath,
  onAddToCart,
}: ProductCardProps) {
  const imageUrl = getPrimaryImageUrl(product);
  const { name, price } = product.attributes;

  const heading = (
    <>
      <img
        src={imageUrl}
        alt={name}
        className="mx-auto max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <h2 className="text-center text-xl font-semibold group-hover:text-gr transition-colors">
        {name}
      </h2>
      <p className="text-center text-lg font-semibold text-muted-foreground">
        {price}
      </p>
    </>
  );

  return (
    <Card className="w-[18rem] flex flex-col items-center shadow-2xl rounded-2">
      <CardContent className="flex w-full flex-col items-center">
        {detailPath ? (
          <Link
            to={detailPath}
            className="group flex w-full flex-col items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gr focus-visible:ring-offset-2"
            aria-label={`View details for ${name}`}
          >
            {heading}
          </Link>
        ) : (
          <div className="flex w-full flex-col items-center">{heading}</div>
        )}

        <Button
          type="button"
          variant="outline"
          className="bg-gr text-white rounded-full mx-15 my-5 cursor-pointer hover:bg-green-700 hover:text-white"
          onClick={() => onAddToCart?.(product)}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
