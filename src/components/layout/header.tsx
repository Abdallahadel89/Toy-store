import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartTriggerButton } from "../cart/CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Header() {
  const [navSheetOpen, setNavSheetOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <>
      <header className="bg-gr text-white flex flex-col md:flex-row  md:justify-between   py-2 ">
        <div className="flex flex-col md:flex-row text-sm md:text-xl gap-1 md:gap-10 md:ml-[18em]  md:mx-[5rem] justify-center ">
          <h6 className="text-center text-xs md:text-xl  ">
            Email: abdallahadel671@gmail.com
          </h6>
        </div>
        <div className="flex gap-2 text-xl md:text-2xl md:mx-[20em] justify-center  ">
          <FaFacebookSquare />
          <FaInstagram />
          <FaXTwitter />
          <FaGithub />
          <FaLinkedin />
        </div>
      </header>
      <nav>
        <div className="mx-auto hidden md:flex flex-col md:flex-row items-center md:justify-between px-4 md:px-0 text-lg md:text-2xl mt-5  pb-5 gap-4 md:gap-0  md:mx-[17em] bg-transparent ">
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-7 my-auto ">
            <li className="font-medium">
              <Link to="/Toy-store">ToyStore</Link>
            </li>
            <li className="font-medium">
              <a href="">Catalog</a>
            </li>
            <li className="font-light">
              <a href="">Delivery</a>
            </li>
            <li className="font-light">
              <a href="">About</a>
            </li>
            <li className="font-light">
              <a href="">Contacts</a>
            </li>
          </ul>
          <CartTriggerButton className="relative text-xl md:text-3xl">
            <FaShoppingCart />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gr text-xs font-bold text-white">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </CartTriggerButton>
        </div>

        <div className="fixed bottom-0 left-0 right-0 shadow-md flex flex-col items-center flex-none w-full bg-white z-50 md:hidden">
          <ul className="flex gap-5 text-2xl my-5 justify-evenly w-full">
            <li>
              <Sheet open={navSheetOpen} onOpenChange={setNavSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="sm:hidden m-0 p-0"
                  >
                    <FaList className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="min-w-[250px] p-6">
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-4">
                    <ul className="flex flex-col gap-3 text-lg font-medium">
                      <li>
                        <Link to="/" onClick={() => setNavSheetOpen(false)}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <a href=""> Catalog</a>
                      </li>
                      <li>
                        <a href=""> Shop</a>
                      </li>
                      <li>
                        <a href=""> Contact</a>
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </li>
            <li>
              <Link to="/" className="text-3xl" aria-label="Home">
                <MdHome />
              </Link>
            </li>
            <li>
              <CartTriggerButton className="relative m-0 p-0 text-2xl">
                <FaShoppingBag />
                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gr text-[10px] font-bold text-white">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </span>
                )}
              </CartTriggerButton>
            </li>
            <li>
              <a href="">
                <FaSearch />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
