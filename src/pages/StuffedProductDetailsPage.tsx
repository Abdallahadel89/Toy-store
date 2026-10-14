import { useParams } from "react-router-dom";
import { stuffedProductCatalog } from "../lib/productCatalog";
import ProductDetailsPage from "./ProductDetailsPage";

export default function StuffedProductDetailsPage() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  return (
    <ProductDetailsPage
      key={slugOrId}
      slugOrId={slugOrId}
      catalog={stuffedProductCatalog}
    />
  );
}
