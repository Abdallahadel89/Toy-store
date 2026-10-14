import { useParams } from "react-router-dom";
import { woodenProductCatalog } from "../lib/productCatalog";
import ProductDetailsPage from "./ProductDetailsPage";

export default function WoodenProductDetailsPage() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  return (
    <ProductDetailsPage
      key={slugOrId}
      slugOrId={slugOrId}
      catalog={woodenProductCatalog}
    />
  );
}
