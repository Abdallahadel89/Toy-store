import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import CartContents from "../components/cart/CartContents";
import { useCart } from "../context/CartContext";
import { formatUsd } from "../lib/cartUtils";

export default function CartPage() {
  const { items, subtotal, totalQuantity } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-8 md:pt-12 2xl:max-w-screen-2xl">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-gr transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Cart</span>
      </nav>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Shopping cart</h1>
          <p className="mt-2 text-muted-foreground">
            {items.length === 0
              ? "Review items before checkout."
              : `${totalQuantity} item${totalQuantity === 1 ? "" : "s"} ready for checkout.`}
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full self-start">
          <Link to="/">Continue shopping</Link>
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
          <CartContents variant="page" />
        </section>

        {items.length > 0 && (
          <aside className="rounded-2xl border bg-muted/30 p-6 shadow-sm lg:sticky lg:top-8">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatUsd(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-muted-foreground">Calculated at checkout</dd>
              </div>
              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <dt>Estimated total</dt>
                <dd>{formatUsd(subtotal)}</dd>
              </div>
            </dl>
            <Button
              type="button"
              asChild
              className="mt-6 w-full rounded-full bg-gr text-white hover:bg-green-700"
            >
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
          </aside>
        )}
      </div>
    </main>
  );
}
