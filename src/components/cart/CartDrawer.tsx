import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useCart } from "../../context/CartContext";
import { formatUsd } from "../../lib/cartUtils";
import CartContents from "./CartContents";

export function CartTriggerButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openDrawer, totalQuantity } = useCart();

  return (
    <Button
      type="button"
      variant="ghost"
      className={className}
      onClick={openDrawer}
      aria-label={`Shopping cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ""}`}
    >
      {children}
    </Button>
  );
}

export default function CartDrawer() {
  const { isDrawerOpen, setDrawerOpen, items, subtotal } = useCart();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      direction="right"
    >
      <DrawerContent className="fixed inset-y-0 right-0 left-auto mt-0 flex h-full max-h-none w-full max-w-md flex-col rounded-none border-l">
        <DrawerHeader className="border-b text-left">
          <DrawerTitle className="text-xl">Your cart</DrawerTitle>
          <DrawerDescription>
            {items.length === 0
              ? "No items yet"
              : `${items.length} product${items.length === 1 ? "" : "s"} in your cart`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <CartContents variant="drawer" onNavigate={closeDrawer} />
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t">
            <div className="flex w-full items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatUsd(subtotal)}</span>
            </div>
            <Button
              asChild
              className="w-full rounded-full bg-gr text-white hover:bg-green-700"
              onClick={closeDrawer}
            >
              <Link to="/cart">Review cart</Link>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full rounded-full">
                Continue shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
