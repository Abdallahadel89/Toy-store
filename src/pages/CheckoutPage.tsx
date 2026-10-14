import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { formatUsd, parsePriceUsd } from "@/lib/cartUtils";

const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, "At least 2 characters"),
  lastName: z.string().trim().min(2, "At least 2 characters"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-() ]{7,}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter a full street address"),
  city: z.string().trim().min(2, "Enter a city"),
  state: z.string().trim().min(2, "Enter a state/region"),
  postalCode: z.string().trim().min(3, "Enter a postal code").max(12),
  country: z.string().min(1, "Select a country"),
  paymentMethod: z.string().min(1, "Select a payment method"),
  notes: z
    .string()
    .trim()
    .max(500, "Notes Cant be more than 500 characters")
    .optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Egypt",
  "Saudi Arabia",
  "United Arab Emirates",
  "Morocco",
  "Other",
];

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / Debit card" },
  { value: "cash", label: "Cash on delivery" },
  { value: "wallet", label: "Digital wallet" },
];

export default function CheckoutPage() {
  const { items, subtotal, totalQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      paymentMethod: "",
      notes: "",
    },
  });

  const onSubmit = (values: CheckoutValues) => {
    // Demo checkout: no real payment processing.
    void values;
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 md:px-8 md:pt-12 2xl:max-w-7xl">
        <Card className="text-center">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <CheckCircle2 className="size-16 text-gr" />
            <CardTitle className="text-2xl">Order placed!</CardTitle>
            <p className="text-muted-foreground">
              Thanks for your order. We will start preparing your toys right
              away. A confirmation would be sent to your email 
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button
                className="rounded-full bg-gr text-white hover:bg-green-700"
                onClick={() => navigate("/")}
              >
                Continue shopping
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/cart">View cart</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 md:px-8 md:pt-12 2xl:max-w-7xl">
        <Card className="text-center">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <ShoppingBag className="size-16 text-muted-foreground" />
            <CardTitle className="text-2xl">Your cart is empty</CardTitle>
            <p className="text-muted-foreground">
              Add some toys before heading to checkout.
            </p>
            <Button className="rounded-full bg-gr text-white hover:bg-green-700" asChild>
              <Link to="/">Browse toys</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-8 md:pt-12 2xl:max-w-screen-2xl">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/cart" className="hover:text-gr transition-colors">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      <div className="mb-8 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/cart" aria-label="Back to cart">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Checkout</h1>
          <p className="mt-1 text-muted-foreground">
            Complete your details to place the order.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & contact</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <section className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 555 000 0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <section className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Toy Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Springfield" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State / Region</FormLabel>
                          <FormControl>
                            <Input placeholder="California" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal code</FormLabel>
                          <FormControl>
                            <Input placeholder="90210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose payment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PAYMENT_METHODS.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Demo only; no real charge is processed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Gift wrapping, delivery notes..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full rounded-full bg-gr text-white hover:bg-green-700"
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : `Place order · ${formatUsd(subtotal)}`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={`${item.catalog}-${item.productId}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="size-12 rounded-md border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      {formatUsd(parsePriceUsd(item.price) * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="font-medium">{totalQuantity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatUsd(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-muted-foreground">Included (demo)</dd>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{formatUsd(subtotal)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">
            Demo checkout — no real payment is collected.
          </p>
        </aside>
      </div>
    </main>
  );
}

