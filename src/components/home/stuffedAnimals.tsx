import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import ProductCard from "../products/ProductCard";
import Stuffedanimals from "../proudacts/stuffedToys";
import { stuffedProductDetailPath } from "../../lib/products";
import { useCart } from "../../context/CartContext";
import type { ToyProduct } from "../../types/product";

export default function StuffedAnimals() {
  const products = Stuffedanimals.slice(0, 4) as ToyProduct[];
  const { addItem } = useCart();

  return (
    <>
      <section className="my-10 mb-10 md:mb-5 mx-auto max-w-7xl px-4 md:px-8  ">
        <div className=" flex flex-col md:flex-row mb-5 md:mb-0 md:justify-between text-2xl ">
          <h1 className="text-center lg:text-start">Stuffed Animals</h1>
          <Button className="text-2xl hidden md:flex md:gap-5" variant={"ghost"}>
            See All Toys
            <FaArrowRight />
          </Button>
        </div>
        <hr />
        <div className="flex flex-col items-center lg:flex-row gap-6 lg:gap-8 my-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              detailPath={stuffedProductDetailPath(product)}
              onAddToCart={(p) => addItem(p, 1)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
