import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";
import {
  formatUsd,
  getCartLineId,
  parsePriceUsd,
} from "../../lib/cartUtils";
import { getCartItemDetailPath } from "../../lib/products";
import type { CartItem } from "../../types/product";

interface CartContentsProps {
  variant?: "drawer" | "page";
  onNavigate?: () => void;
}

function CartLineItem({
  item,
  compact,
  onNavigate,
}: {
  item: CartItem;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const { updateItemQuantity, removeItem } = useCart();
  const lineTotal = parsePriceUsd(item.price) * item.quantity;
  const detailPath = getCartItemDetailPath(item);

  return (
    <li
      className="flex gap-3 rounded-xl border bg-card  p-3 shadow-sm"
      aria-labelledby={getCartLineId(item)}
    >
      <Link
        to={detailPath}
        onClick={onNavigate}
        className="shrink-0 overflow-hidden rounded-lg border-none bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gr"
      >
        <img
          src={item.imageUrl}
          alt=""
          className={
            compact ? "size-16  "  : "size-20  sm:size-24 "
          }
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link
          id={getCartLineId(item)}
          to={detailPath}
          onClick={onNavigate}
          className="truncate font-semibold hover:text-gr focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gr"
        >
          {item.name}
        </Link>
        {item.category && (
          <p className="text-xs text-muted-foreground">{item.category}</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">{item.price} each</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex items-center rounded-full border">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() =>
                updateItemQuantity(item.catalog, item.productId, item.quantity - 1)
              }
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="min-w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() =>
                updateItemQuantity(item.catalog, item.productId, item.quantity + 1)
              }
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{formatUsd(lineTotal)}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${item.name} from cart`}
              onClick={() => removeItem(item.catalog, item.productId)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CartContents({
  variant = "drawer",
  onNavigate,
}: CartContentsProps) {
  const { items, subtotal, totalQuantity, clearCart } = useCart();
  const compact = variant === "drawer";

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse our stuffed and wooden toys and add something you love.
        </p>
        <Button
          asChild
          className="mt-6 rounded-full bg-gr text-white hover:bg-green-700"
          onClick={onNavigate}
        >
          <Link to="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <CartLineItem
            key={getCartLineId(item)}
            item={item}
            compact={compact}
            onNavigate={onNavigate}
          />
        ))}
      </ul>

      {variant === "drawer" && (
        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Items ({totalQuantity})
            </span>
            <span className="font-medium">{formatUsd(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-2 text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatUsd(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Shipping and taxes calculated at checkout.
          </p>
        </div>
      )}

      {variant === "drawer" && (
        <Button
          asChild
          variant="outline"
          className="w-full rounded-full"
          onClick={onNavigate}
        >
          <Link to="/cart">View full cart</Link>
        </Button>
      )}

      {variant === "page" && (
        <Button
          type="button"
          variant="ghost"
          className="self-start text-muted-foreground"
          onClick={clearCart}
        >
          Clear cart
        </Button>
      )}
    </div>
  );
}
